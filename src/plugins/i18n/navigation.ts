import { localePrefix, locales } from '../../config/constants'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

const navigation = createSharedPathnamesNavigation({ locales, localePrefix })

export const { Link, redirect, usePathname, useRouter } = navigation
