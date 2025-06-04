import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_LOCALES = ['en', 'ru']
const DEFAULT_LOCALE = 'ru'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathLocale = pathname.split('/')[1]

  if (PUBLIC_LOCALES.includes(pathLocale)) {
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', pathLocale, { path: '/' })
    return response
  }

  const previousLocale = request.cookies.get('NEXT_LOCALE')?.value
  const locale = PUBLIC_LOCALES.includes(previousLocale || '') ? previousLocale! : DEFAULT_LOCALE

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set('NEXT_LOCALE', locale, { path: '/' })

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|.*\\..*).*)'],
}
