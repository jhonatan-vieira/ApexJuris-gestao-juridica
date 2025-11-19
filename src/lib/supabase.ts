import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Se as variáveis não estiverem configuradas, retorna um cliente mock
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas.')
    
    // Retorna um cliente mock para evitar erros de inicialização
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
