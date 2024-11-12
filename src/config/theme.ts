'use client'

import { useTheme } from 'next-themes'

const { theme } = useTheme()

export const logo =
  theme === 'light' ? '/static/svg/logo-dark.svg' : '/static/svg/logo-light.svg'
