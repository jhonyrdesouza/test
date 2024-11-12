'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import type * as React from 'react'

type Props = {
  theme?: ThemeProviderProps
  children: React.ReactNode
}

export function Providers({ children, theme }: Readonly<Props>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...theme}
    >
      <SessionProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
