import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'

export const db = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
