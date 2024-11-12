'use client'

import { Button } from '@/components/ui/button'
import { flags } from '@/config/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'

export default function SettingsDropdown() {
  const { setTheme, theme } = useTheme()
  const { replace } = useRouter()
  const pathname = usePathname()
  const translation = useTranslations('switcher')
  const locale = useLocale()

  const currentFlagClass = flags[locale as keyof typeof flags]

  function handleRedirectLanguageChange(language: string) {
    const paramsArray = pathname.split('/')
    const newParamsArray = paramsArray.map((param, index) =>
      index === 1 ? language : param,
    )
    const newPathname = newParamsArray.join('/')

    replace(newPathname)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings width={16} height={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{'Theme'}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className={theme === 'light' ? 'bg-muted' : 'cursor-pointer'}
          >
            {'🌞 Light'}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className={theme === 'dark' ? 'bg-muted' : 'cursor-pointer'}
          >
            {'🌚 Dark'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{'Language'}</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className={`${currentFlagClass} mr-2`}></span>
              {translation('locale', { locale })}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {Object.entries(flags).map(([code, flags]) => (
                <DropdownMenuItem
                  key={code}
                  className={
                    code === locale ? 'space-x-2 bg-muted' : 'space-x-2'
                  }
                  disabled={false}
                  onClick={() => handleRedirectLanguageChange(code)}
                >
                  <span className={`${flags} mr-2`}></span>{' '}
                  {translation('locale', { locale: code })}{' '}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
