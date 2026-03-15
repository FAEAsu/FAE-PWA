import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lbuceegfaxgtsipdbclo.supabase.co"
const supabaseAnonKey = "TA_CLE_PUBLISHABLE_OU_ANON_ICI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
