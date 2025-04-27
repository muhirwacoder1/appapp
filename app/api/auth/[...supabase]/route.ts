import { handleAuth } from '@supabase/auth-helpers-nextjs'

export const runtime = 'edge'

export const { GET, POST } = handleAuth()
