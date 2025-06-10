
import { supabase } from '@/integrations/supabase/client';
import { InsuranceType, QuoteRequest, QuoteResponse, InsurerQuote } from '@/types';

export class RatingService {
  static async calculateRates(request: QuoteRequest): Promise<QuoteResponse> {
    try {
      console.log('Calculating rates for request:', request);
      
      // Call the edge function to calculate quotes
      const { data, error } = await supabase.functions.invoke('calculate-quotes', {
        body: request
      });

      if (error) {
        console.error('Error calculating rates:', error);
        throw new Error(error.message || 'Failed to calculate rates');
      }

      console.log('Calculated rates response:', data);
      return data;
    } catch (error) {
      console.error('Rating service error:', error);
      throw error;
    }
  }

  static async getInsurers() {
    try {
      const { data, error } = await supabase
        .from('insurers')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching insurers:', error);
      throw error;
    }
  }

  static async getInsuranceProducts(insuranceType: InsuranceType) {
    try {
      const { data, error } = await supabase
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
        .eq('insurance_type', insuranceType)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching insurance products:', error);
      throw error;
    }
  }

  static async getRatingFactors(insuranceType: InsuranceType) {
    try {
      const { data, error } = await supabase
        .from('rating_factors')
        .select('*')
        .eq('insurance_type', insuranceType)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching rating factors:', error);
      throw error;
    }
  }

  static async saveQuote(quote: InsurerQuote, requestId: string, contactId: string) {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          request_id: requestId,
          contact_id: contactId,
          insurance_type: quote.insuranceType,
          insurer_id: quote.insurerId,
          product_id: quote.productId,
          monthly_premium: parseFloat(quote.monthlyPremium.replace(/[^\d.]/g, '')),
          annual_premium: parseFloat(quote.annualPremium.replace(/[^\d.]/g, '')),
          coverage_amount: parseFloat(quote.coverageAmount.replace(/[^\d.]/g, '')),
          deductible: parseFloat(quote.deductible.replace(/[^\d.]/g, '')),
          business_details: quote.businessDetails,
          underwriting_answers: quote.underwritingAnswers,
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving quote:', error);
      throw error;
    }
  }
}
