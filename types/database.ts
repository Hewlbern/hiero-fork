export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      apps: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string
          id: string
          name: string
          slug: string | null
          status: string
          updated_at: string | null
          url: string
          user_id: string
          webhook_secret: string | null
          webhook_url: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description: string
          id?: string
          name: string
          slug?: string | null
          status?: string
          updated_at?: string | null
          url: string
          user_id: string
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string
          id?: string
          name?: string
          slug?: string | null
          status?: string
          updated_at?: string | null
          url?: string
          user_id?: string
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_trail: {
        Row: {
          app_id: string
          created_at: string | null
          deducted_amount: number
          id: number
          label: string | null
          model: string
          multiplier: number
          original_amount: number
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          deducted_amount: number
          id?: number
          label?: string | null
          model: string
          multiplier: number
          original_amount: number
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          deducted_amount?: number
          id?: number
          label?: string | null
          model?: string
          multiplier?: number
          original_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_trail_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_trail_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      developer_api_keys: {
        Row: {
          app_id: string
          created_at: string | null
          id: string
          key: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          id?: string
          key?: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          id?: string
          key?: string
        }
        Relationships: [
          {
            foreignKeyName: "developer_api_keys_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connection_keys: {
        Row: {
          app_id: string
          created_at: string | null
          id: string
          key: string
          user_id: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          id?: string
          key?: string
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          id?: string
          key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_connection_keys_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_connection_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          created_at: string | null
          token_balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          token_balance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          token_balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_api_key: {
        Args: {
          apikey: string
        }
        Returns: boolean
      }
      check_developer_api_key: {
        Args: {
          api_key: string
        }
        Returns: boolean
      }
      deduct_tokens_and_audit: {
        Args: {
          p_user_connection_key: string
          p_developer_api_key: string
          p_amount: number
          p_original_amount: number
          p_multiplier: number
          p_model: string
          p_label: string
        }
        Returns: {
          success: boolean
          message: string
          new_balance: number
        }[]
      }
      get_api_key_from_header: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_id_from_connection_keys: {
        Args: {
          p_user_connection_key: string
          p_developer_api_key: string
        }
        Returns: {
          user_id: string
          app_id: string
          error: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

