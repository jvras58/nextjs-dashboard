import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Caminho da rota de login
  const loginPath = '/login'
  
  // Rotas públicas que não precisam de autenticação
  const publicPaths = [loginPath, '/api/auth']

  // Verifica se o caminho atual é público
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Busca o token de autenticação
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // Se for uma rota pública e o usuário estiver logado, redireciona para o dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Se não for uma rota pública e o usuário não estiver logado, redireciona para o login
  if (!isPublicPath && !token) {
    const url = new URL(loginPath, request.url)
    url.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/cadastro',
    '/campanhas',
    '/dash',
    '/dashboard/:path*',
    '/api/firebase',
    '/api/sheets',
  ]
}