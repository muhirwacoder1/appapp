import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/ssr'

export const runtime = 'edge'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()
  return new Response(JSON.stringify({ session, error }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  let result
  if (body.refresh_token && body.access_token) {
    result = await supabase.auth.setSession({
      refresh_token: body.refresh_token,
      access_token: body.access_token,
    })
  } else if (body.email && body.password) {
    result = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    })
  } else {
    result = { error: 'Missing credentials' }
  }
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
}
