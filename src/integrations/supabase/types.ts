export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          industry_id: string | null
          last_name: string
          occupation_id: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          industry_id?: string | null
          last_name: string
          occupation_id?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          industry_id?: string | null
          last_name?: string
          occupation_id?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_occupation_id_fkey"
            columns: ["occupation_id"]
            isOneToOne: false
            referencedRelation: "occupations"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          created_at: string
          id: string
          insurance_type: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          insurance_type: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          insurance_type?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_products: {
        Row: {
          base_premium: number
          created_at: string
          default_coverage: number
          default_deductible: number
          features: Json | null
          id: string
          insurance_type: string
          insurer_id: string
          is_active: boolean
          is_recommended: boolean | null
          max_coverage: number
          max_deductible: number
          min_coverage: number
          min_deductible: number
          product_name: string
          updated_at: string
        }
        Insert: {
          base_premium: number
          created_at?: string
          default_coverage: number
          default_deductible: number
          features?: Json | null
          id?: string
          insurance_type: string
          insurer_id: string
          is_active?: boolean
          is_recommended?: boolean | null
          max_coverage: number
          max_deductible: number
          min_coverage: number
          min_deductible: number
          product_name: string
          updated_at?: string
        }
        Update: {
          base_premium?: number
          created_at?: string
          default_coverage?: number
          default_deductible?: number
          features?: Json | null
          id?: string
          insurance_type?: string
          insurer_id?: string
          is_active?: boolean
          is_recommended?: boolean | null
          max_coverage?: number
          max_deductible?: number
          min_coverage?: number
          min_deductible?: number
          product_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_products_insurer_id_fkey"
            columns: ["insurer_id"]
            isOneToOne: false
            referencedRelation: "insurers"
            referencedColumns: ["id"]
          },
        ]
      }
      insurers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          rating: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          rating?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          rating?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      occupations: {
        Row: {
          created_at: string
          id: string
          industry_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          industry_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "occupations_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          annual_premium: number
          business_details: Json
          contact_id: string
          coverage_amount: number
          created_at: string
          deductible: number
          id: string
          insurance_type: string
          insurer_id: string
          is_selected: boolean | null
          monthly_premium: number
          product_id: string
          request_id: string
          underwriting_answers: Json
          updated_at: string
          valid_until: string
        }
        Insert: {
          annual_premium: number
          business_details: Json
          contact_id: string
          coverage_amount: number
          created_at?: string
          deductible: number
          id?: string
          insurance_type: string
          insurer_id: string
          is_selected?: boolean | null
          monthly_premium: number
          product_id: string
          request_id: string
          underwriting_answers: Json
          updated_at?: string
          valid_until: string
        }
        Update: {
          annual_premium?: number
          business_details?: Json
          contact_id?: string
          coverage_amount?: number
          created_at?: string
          deductible?: number
          id?: string
          insurance_type?: string
          insurer_id?: string
          is_selected?: boolean | null
          monthly_premium?: number
          product_id?: string
          request_id?: string
          underwriting_answers?: Json
          updated_at?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_insurer_id_fkey"
            columns: ["insurer_id"]
            isOneToOne: false
            referencedRelation: "insurers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "insurance_products"
            referencedColumns: ["id"]
          },
        ]
      }
      rating_factors: {
        Row: {
          condition_field: string
          condition_operator: string
          condition_value: Json
          created_at: string
          description: string | null
          factor_name: string
          factor_type: string
          factor_value: number
          id: string
          insurance_type: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          condition_field: string
          condition_operator: string
          condition_value: Json
          created_at?: string
          description?: string | null
          factor_name: string
          factor_type: string
          factor_value: number
          id?: string
          insurance_type: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          condition_field?: string
          condition_operator?: string
          condition_value?: Json
          created_at?: string
          description?: string | null
          factor_name?: string
          factor_type?: string
          factor_value?: number
          id?: string
          insurance_type?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
