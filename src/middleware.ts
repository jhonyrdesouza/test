import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { authConfig } from './config/auth'

import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  defaultLocale,
  localePrefix,
  locales,
  PUBLIC_ROUTES,
} from './config/constants'
const { auth } = NextAuth(authConfig)

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
})

const authMiddleware = auth(async (req: any) => {
  const { nextUrl } = req
  const session = req.auth

  const isLoggedIn = !!req.auth
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (session) {
    return intlMiddleware(req)
  }

  //  if (session && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
  //    return NextResponse.redirect(new URL('/', req.url));
  //  }

  // if (isLoggedIn && isAuthRoute) {
  //   // Redirect logged-in users from auth routes to the default page
  //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let from = nextUrl.pathname
    if (nextUrl.search) {
      from += nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, nextUrl),
    )
  }

  return NextResponse.next()
})

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES.flatMap((p) =>
      p === '/' ? ['', '/'] : p,
    ).join('|')})/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
