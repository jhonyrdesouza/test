/**
 * Font configuration for the application
 * This includes subsets, display strategy, CSS variable name, and available font weights
 */
export const font = {
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
}

/**
 * Supported locales for the application
 * This array defines the available languages
 */
export const locales = ['en', 'br'] as const

/**
 * Prefix for locale routes
 * This defines how the locales are prefixed in the URL
 */
export const localePrefix: 'as-needed' | 'always' | 'never' = 'always'
/**
 * The default locale for the application
 * This sets the default language as English
 */
export const defaultLocale = 'en'

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const PUBLIC_ROUTES = [
  '/',
  '/terms',
  '/privacy',
  '/pricing',
  '/login',
  '/signup',
  '/reset-password',
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to `DEFAULT_LOGIN_REDIRECT`
 */
export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/reset-password',
  '/auth/error',
]

/**
 * The default redirect path after a user logs in
 */
export const DEFAULT_LOGIN_REDIRECT = '/workspace'

/**
 * The default flags to languages setters
 */
export const flags = { en: 'fi fi-us', br: 'fi fi-br' }
