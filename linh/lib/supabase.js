import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API key related functions
export async function createApiKey({ name, limit }) {
  const { data, error } = await supabase
    .from('api_keys')
    .insert([
      {
        name,
        request_limit: limit,
        usage: 0,
        key: `tvly-${Array(32).fill(0).map(() => Math.random().toString(36).charAt(2)).join('')}`,
        created_at: new Date().toISOString(),
      }
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function getApiKeys() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateApiKey(id, { name, limit }) {
  const { data, error } = await supabase
    .from('api_keys')
    .update({ name, request_limit: limit })
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteApiKey(id) {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

export async function incrementApiKeyUsage(id) {
  const { data, error } = await supabase.rpc('increment_api_key_usage', { key_id: id })

  if (error) throw error
  return data
} 