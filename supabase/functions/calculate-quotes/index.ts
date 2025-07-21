import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteRequest {
  insuranceType: string;
  contactDetails: any;
  businessDetails: any;
  underwritingAnswers: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const request: QuoteRequest = await req.json();
    console.log('Processing quote request:', request);

    // Generate a unique request ID
    const requestId = crypto.randomUUID();

    // Save contact details first
    const { data: contactData, error: contactError } = await supabaseClient
      .from('contacts')
      .insert(request.contactDetails)
      .select()
      .single();

    if (contactError) {
      console.error('Error saving contact:', contactError);
      throw contactError;
    }

    // Get insurance products for this insurance type
    const { data: products, error: productsError } = await supabaseClient
      .from('insurance_products')
      .select(`
        *,
        insurers (
          id,
          name,
          rating,
          logo_url
        )
      `)
      .eq('insurance_type', request.insuranceType)
      .eq('is_active', true);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      throw productsError;
    }

    // Get rating factors for this insurance type
    const { data: ratingFactors, error: factorsError } = await supabaseClient
      .from('rating_factors')
      .select('*')
      .eq('insurance_type', request.insuranceType)
      .eq('is_active', true);

    if (factorsError) {
      console.error('Error fetching rating factors:', factorsError);
      throw factorsError;
    }

    // Calculate quotes for each product
    const quotes = products.map(product => {
      let adjustedPremium = product.base_premium;

      // Special handling for Contractors All Risk insurance
      if (request.insuranceType === 'contractors-all-risk') {
        adjustedPremium = calculateContractorsAllRiskPremium(
          product, 
          request.underwritingAnswers, 
          ratingFactors
        );
      } else {
        // Standard rating logic for other insurance types
        ratingFactors.forEach(factor => {
          const conditionValue = request.underwritingAnswers[factor.condition_field];
          
          if (shouldApplyFactor(factor, conditionValue)) {
            console.log(`Applying factor: ${factor.factor_name}, value: ${factor.factor_value}`);
            
            switch (factor.factor_type) {
              case 'multiplier':
                adjustedPremium *= factor.factor_value;
                break;
              case 'addition':
                adjustedPremium += factor.factor_value;
                break;
              case 'percentage':
                adjustedPremium *= (1 + factor.factor_value / 100);
                break;
            }
          }
        });
      }

      const monthlyPremium = Math.round(adjustedPremium);
      const annualPremium = Math.round(monthlyPremium * 12); // No discount for annual

      const quote = {
        insurerId: product.insurer_id,
        insurerName: product.insurers.name,
        insurerLogo: product.insurers.logo_url,
        monthlyPremium: `R ${monthlyPremium.toLocaleString()}`,
        annualPremium: `R ${annualPremium.toLocaleString()}`,
        coverageAmount: `R ${product.default_coverage.toLocaleString()}`,
        deductible: `R ${product.default_deductible.toLocaleString()}`,
        savingsWithAnnual: `R 300`,
        rating: product.insurers.rating,
        features: product.features,
        isRecommended: product.is_recommended,
        productId: product.id,
        insuranceType: request.insuranceType,
        businessDetails: request.businessDetails,
        underwritingAnswers: request.underwritingAnswers
      };

      // Save the quote to database
      supabaseClient
        .from('quotes')
        .insert({
          request_id: requestId,
          contact_id: contactData.id,
          insurance_type: request.insuranceType,
          insurer_id: product.insurer_id,
          product_id: product.id,
          monthly_premium: monthlyPremium,
          annual_premium: annualPremium,
          coverage_amount: product.default_coverage,
          deductible: product.default_deductible,
          business_details: request.businessDetails,
          underwriting_answers: request.underwritingAnswers,
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .then(({ error }) => {
          if (error) console.error('Error saving quote:', error);
        });

      return quote;
    });

    const response = {
      insuranceType: request.insuranceType,
      quotes: quotes.sort((a, b) => b.rating - a.rating), // Sort by rating descending
      requestId,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('Generated quotes response:', response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in calculate-quotes function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function calculateContractorsAllRiskPremium(
  product: any, 
  underwritingAnswers: Record<string, any>, 
  ratingFactors: any[]
): number {
  // Get the contract value from equipment-value field (this maps to project value)
  const contractValueStr = underwritingAnswers['equipment-value'] || '0';
  const contractValue = parseFloat(contractValueStr.replace(/[^\d.]/g, '')) || 0;
  
  console.log(`Calculating Contractors All Risk premium for contract value: R${contractValue}`);
  
  // Find the appropriate contract value rate
  let contractRate = 0;
  const contractValueFactors = ratingFactors.filter(f => 
    f.factor_name.includes('Contract Value') && f.factor_type === 'percentage'
  );
  
  for (const factor of contractValueFactors) {
    if (factor.condition_operator === 'range' && Array.isArray(factor.condition_value)) {
      const [min, max] = factor.condition_value;
      if (contractValue >= min && contractValue <= max) {
        contractRate = factor.factor_value;
        console.log(`Applied contract rate: ${contractRate}% for range R${min}-R${max}`);
        break;
      }
    }
  }
  
  // Calculate base premium as percentage of contract value
  let basePremium = contractValue * (contractRate / 100);
  
  // Add public liability if selected - now percentage-based
  const publicLiabilityFactor = ratingFactors.find(f => f.factor_name === 'Public Liability Add-on');
  if (underwritingAnswers['public-liability-addon'] === true && publicLiabilityFactor) {
    const publicLiabilityAmount = parseFloat(underwritingAnswers['public-liability-amount'] || '0');
    if (publicLiabilityAmount > 0) {
      const publicLiabilityPremium = publicLiabilityAmount * (publicLiabilityFactor.factor_value / 100);
      basePremium += publicLiabilityPremium;
      console.log(`Added public liability: R${publicLiabilityPremium} (${publicLiabilityFactor.factor_value}% of R${publicLiabilityAmount})`);
    }
  }
  
  // Add SASRIA if selected
  const sasriaFactor = ratingFactors.find(f => f.factor_name === 'SASRIA Coverage');
  if (underwritingAnswers['sasria-cover'] === true && sasriaFactor) {
    // SASRIA is calculated on contract value up to R20M
    const sasriaContractValue = Math.min(contractValue, 20000000);
    const sasriaPremium = sasriaContractValue * (sasriaFactor.factor_value / 100);
    basePremium += sasriaPremium;
    console.log(`Added SASRIA: R${sasriaPremium} (${sasriaFactor.factor_value}% of R${sasriaContractValue})`);
  }
  
  console.log(`Final Contractors All Risk premium: R${basePremium}`);
  return basePremium;
}

function shouldApplyFactor(factor: any, conditionValue: any): boolean {
  const { condition_operator, condition_value } = factor;
  
  switch (condition_operator) {
    case 'equals':
      return conditionValue === condition_value;
    
    case 'greater_than':
      const threshold = typeof condition_value === 'string' ? 
        parseFloat(condition_value) : condition_value;
      const value = typeof conditionValue === 'string' ? 
        parseFloat(conditionValue) : conditionValue;
      return value > threshold;
    
    case 'less_than':
      const thresholdLess = typeof condition_value === 'string' ? 
        parseFloat(condition_value) : condition_value;
      const valueLess = typeof conditionValue === 'string' ? 
        parseFloat(conditionValue) : conditionValue;
      return valueLess < thresholdLess;
    
    case 'contains':
      if (Array.isArray(condition_value)) {
        return condition_value.includes(conditionValue);
      }
      return false;
    
    case 'range':
      // Expecting condition_value to be [min, max]
      if (Array.isArray(condition_value) && condition_value.length === 2) {
        const numValue = typeof conditionValue === 'string' ? 
          parseFloat(conditionValue) : conditionValue;
        return numValue >= condition_value[0] && numValue <= condition_value[1];
      }
      return false;
    
    default:
      return false;
  }
}
