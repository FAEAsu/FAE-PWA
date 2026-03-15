import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lbuceegfaxgtsipdbclo.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidWVjZWdmYXhndHNpcGRiY2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODQxNDQsImV4cCI6MjA4OTA2MDE0NH0.TX36DoUM4dgFVbMrOU-4iKrwbTKg-u0inGaSg08zTWc"

console.log("SUPABASE URL HARDCODED =", supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
