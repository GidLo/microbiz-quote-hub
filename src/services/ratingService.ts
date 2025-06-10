
import { supabase } from '@/integrations/supabase/client';
import { QuoteRequest, QuoteResponse, InsurerQuote, InsuranceType } from '@/types';

export class RatingService {
  /**
   * Get quotes from multiple insurers for a given quote request
   */
  static async getQuotes(quoteRequest: QuoteRequest): Promise<QuoteResponse> {
    try {
      // Call the backend rating function
      const { data, error } = await supabase.functions.invoke('calculate-rates', {
        body: quoteRequest
      });

      if (error) {
        console.error('Error fetching quotes:', error);
        throw new Error('Failed to fetch quotes from insurers');
      }

      return data as QuoteResponse;
    } catch (error) {
      console.error('Rating service error:', error);
      // Return fallback mock data for development
      return this.getMockQuotes(quoteRequest.insuranceType);
    }
  }

  /**
   * Get rates for a specific insurance type and insurer
   */
  static async getRateForInsurer(
    insuranceType: InsuranceType,
    insurerId: string,
    quoteRequest: QuoteRequest
  ): Promise<InsurerQuote> {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-single-rate', {
        body: {
          insurerId,
          quoteRequest
        }
      });

      if (error) throw error;
      return data as InsurerQuote;
    } catch (error) {
      console.error('Error fetching single rate:', error);
      throw error;
    }
  }

  /**
   * Mock quotes for development/fallback
   */
  private static getMockQuotes(insuranceType: InsuranceType): QuoteResponse {
    const baseQuotes: InsurerQuote[] = [
      {
        insurerId: 'safeguard-001',
        insurerName: 'SafeGuard Insurance',
        monthlyPremium: 'R 420',
        annualPremium: 'R 4,536',
        coverageAmount: 'R 1,000,000',
        deductible: 'R 5,000',
        savingsWithAnnual: 'R 504',
        rating: 4.8,
        features: [
          'No long-term contracts',
          'Immediate coverage',
          'Dedicated claims support',
          '24/7 helpline'
        ],
        isRecommended: true
      },
      {
        insurerId: 'premier-002',
        insurerName: 'Premier Coverage',
        monthlyPremium: 'R 450',
        annualPremium: 'R 4,860',
        coverageAmount: 'R 1,000,000',
        deductible: 'R 4,000',
        savingsWithAnnual: 'R 540',
        rating: 4.5,
        features: [
          'Flexible payment options',
          'Digital policy management',
          'Quick claim processing',
          'Legal assistance included'
        ]
      },
      {
        insurerId: 'reliable-003',
        insurerName: 'Reliable Protect',
        monthlyPremium: 'R 385',
        annualPremium: 'R 4,158',
        coverageAmount: 'R 750,000',
        deductible: 'R 7,500',
        savingsWithAnnual: 'R 462',
        rating: 4.2,
        features: [
          'Budget-friendly option',
          'Essential coverage',
          'Online support',
          'Basic claims service'
        ]
      }
    ];

    return {
      insuranceType,
      quotes: baseQuotes,
      requestId: `req_${Date.now()}`,
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
  }
}
