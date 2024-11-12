import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { SignUpForm } from '../components/signup-form'

export const metadata: Metadata = {
  title: 'Vibz • Criar conta',
  description: 'Cadastre-se para acessar sua conta',
}

export default function SignupPage() {
  const t = useTranslations('pages.signup')

  return (
    <div className="flex flex-col space-y-2 text-center mx-2">
      <h1 className=" text-4xl font-bold drop-shadow-xl ">{t('title')}</h1>
      <p className="text-sm font-light">{t('description')}</p>
      <div className="px-8 sm:mx-auto sm:w-[450px] sm:px-0">
        <SignUpForm />
      </div>
    </div>
  )
}
