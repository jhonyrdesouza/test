import { SelectContent, SelectItem } from '@/components/ui/select'
import { flags } from '@/config/constants'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './locale-switcher-select'
export default function LocaleSwitcher() {
  const t = useTranslations('switcher')
  const locale = useLocale()

  return (
    <div>
      <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
        <SelectContent>
          {Object.entries(flags).map(([code, flags]) => (
            <SelectItem key={code} value={code}>
              <span className={flags}></span> {t('locale', { locale: code })}
            </SelectItem>
          ))}
        </SelectContent>
      </LocaleSwitcherSelect>
    </div>
  )
}
