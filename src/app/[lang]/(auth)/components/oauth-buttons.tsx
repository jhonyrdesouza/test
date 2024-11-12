'use client'

import { Google } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { toast } from 'sonner'

type OAuthButtonProps = {
  isFormDisabled: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export function OAuthButtons(props: Readonly<OAuthButtonProps>) {
  const { isFormDisabled, setIsSubmitting } = props

  const [oauthLoading, setOauthLoading] = React.useState<'google' | 'github'>()

  const t = useTranslations('pages.login')

  function signInToaster(promise: Promise<unknown>) {
    toast.promise(promise, {
      loading: t('toasts.signInLoading'),
      success: t('toasts.signInSuccess'),
      error: t('toasts.signInError'),
      finally: () => {
        setIsSubmitting(false)
        setOauthLoading(undefined)
      },
    })
  }
  async function googleSignInHandler() {
    setOauthLoading('google')
    setIsSubmitting(true)

    try {
      signInToaster(signIn('google'))
    } catch (error) {
      const err = error as Error
      console.error(err.message)
    }
  }

  return (
    <>
      <div className="relative py-2 mt-4">
        <span className="absolute inset-x-0 inset-y-1/2 border-t" />

        <span className="relative mx-auto flex w-fit bg-background px-2 text-xs uppercase text-muted-foreground transition-colors duration-0">
          {t('oauthButtons.orContinueWith')}
        </span>
      </div>

      <div className="mt-6 flex w-full flex-col space-y-2 text-white">
        <Button
          size="sm"
          onClick={googleSignInHandler}
          disabled={isFormDisabled}
          className="w-full font-semibold shadow-md"
          style={{ backgroundColor: '#01071f1' }}
        >
          {oauthLoading === 'google' ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Google className="mr-2 size-4" />
          )}
          Google
        </Button>
      </div>
    </>
  )
}
