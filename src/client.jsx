import { createClient } from '@supabase/supabase-js'

const URL = 'https://aupgomnmplxaxtnhnnsh.supabase.co'
const API_KEY = 'sb_publishable_77vzWYirY9mwmOyhtKzarQ_Nliq0hZe'

export const supabase = createClient(URL, API_KEY)