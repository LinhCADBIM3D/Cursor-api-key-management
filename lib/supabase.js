import { createClient } from '@supabase/supabase-js'
import { customAlphabet } from 'nanoid'

// Create a secure random string generator
const generateKey = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 32)

// Error handling utility
class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.status = status
  }
}

// Singleton Supabase client
let supabaseClient = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new ApiError('Supabase credentials are missing', 500)
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// API key related functions
export async function createApiKey({ name, limit }) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          name,
          request_limit: limit,
          usage: 0,
          key: `cursor-${generateKey()}`,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) throw new ApiError(error.message, 400)
    return data[0]
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Failed to create API key', 500)
  }
}

export async function getApiKeys() {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new ApiError(error.message, 400)
    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Failed to fetch API keys', 500)
  }
}

export async function updateApiKey(id, { name, limit }) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name, request_limit: limit })
      .eq('id', id)
      .select()

    if (error) throw new ApiError(error.message, 400)
    return data[0]
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Failed to update API key', 500)
  }
}

export async function deleteApiKey(id) {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) throw new ApiError(error.message, 400)
    return true
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Failed to delete API key', 500)
  }
}

export async function incrementApiKeyUsage(id) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.rpc('increment_api_key_usage', { key_id: id })

    if (error) throw new ApiError(error.message, 400)
    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Failed to increment API key usage', 500)
  }
} 