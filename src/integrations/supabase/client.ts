
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://euoazklieswnhrgimhyw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1b2F6a2xpZXN3bmhyZ2ltaHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODIxNjAsImV4cCI6MjA2MTE1ODE2MH0.O2oJakjaoNv6cT8DEkyq_pdCS2RcU3Ho31Ik_kVkpXs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})
