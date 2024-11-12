import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { ResetPasswordForm } from '../components/reset-password-form'

export const metadata: Metadata = {
  title: 'Vibz • Redefinir senha',
  description: 'Redefinir sua senha',
}

export default function ResetPasswordPage() {
  const t = useTranslations('pages.resetPassword')

  return (
    <div className="flex flex-col space-y-2 text-center mx-2">
      <h1 className=" text-4xl font-bold drop-shadow-xl ">{t('title')}</h1>
      <p className="text-sm font-light">{t('description')}</p>
      <div className="px-8 sm:mx-auto sm:w-[450px] sm:px-0">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
