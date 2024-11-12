import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'
import { Toaster } from 'sonner'
import '../../styles/globals.css'

import { Providers } from '@/components/providers'
import font from '../../lib/fonts'

export const metadata: Metadata = {
  title: 'Tallker • Lead Qualification as a Service',
  description:
    'We transform visitors into customers, increase your online sales with more qualified leads',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages()

  return (
    <React.StrictMode>
      <html lang={locale} suppressHydrationWarning>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <body
          className={cn(
            'min-h-screen scroll-smooth font-outfit antialiased selection:bg-foreground selection:text-background',
            font.className,
          )}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            now={new Date()}
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
          >
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </React.StrictMode>
  )
}
