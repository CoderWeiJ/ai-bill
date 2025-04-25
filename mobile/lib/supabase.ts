import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xbavwomhykqrjmmdujry.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiYXZ3b21oeWtxcmptbWR1anJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyOTA2NjQsImV4cCI6MjA2MDg2NjY2NH0.iDnJh-3DJRajHcDASH-nP2Yf2mH9PieIec7dZrd1MN8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})