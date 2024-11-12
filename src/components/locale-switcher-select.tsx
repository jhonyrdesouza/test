'use client'

import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ReactNode, useTransition } from 'react'
import { usePathname, useRouter } from '../plugins/i18n/navigation'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(value: any) {
    const nextLocale = value

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      {children}
    </Select>
  )
}
