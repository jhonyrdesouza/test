import { locales } from '@/config/constants'
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

type GetRequestConfig = ReturnType<typeof getRequestConfig>

const i18n: GetRequestConfig = getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../plugins/i18n/locales/${locale}.json`)).default,
  }
})

export default i18n
