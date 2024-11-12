'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Key, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { resetPassword } from '@/lib/actions'
import type { ResetPasswordFormData } from '@/lib/types'
import { resetPasswordSchema } from '@/lib/validations'
import { useTranslations } from 'next-intl'
import { OAuthButtons } from './oauth-buttons'

const defaultValues: ResetPasswordFormData = {
  email: '',
  password: '',
  newPassword: '',
}

export function ResetPasswordForm() {
  const [isPassVisible, setIsPassVisible] = React.useState(false)
  const [isNewPassVisible, setIsNewPassVisible] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const searchParams = useSearchParams()

  const authError = searchParams.get('error')

  const t = useTranslations('pages.login')

  if (authError === 'OAuthAccountNotLinked') {
    toast.error(t('oauthError.notLinked'), {
      description: t('oauthError.description'),
    })
  }

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  })

  async function onSubmit(formData: ResetPasswordFormData) {
    setIsSubmitting(true)

    try {
      toast.promise(resetPassword({ ...formData }), {
        loading: t('toasts.resetPasswordLoading'),
        success: t('toasts.resetPasswordSuccess'),
        error: (error) => error.message,
        finally: () => setIsSubmitting(false),
      })
    } catch (error) {
      const err = error as Error
      console.error(err.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-2">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder={t('emailPlaceholder')}
                    className="shadow-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isPassVisible ? 'text' : 'password'}
                    disabled={isSubmitting}
                    placeholder={t('passwordPlaceholder')}
                    className="pr-8 shadow-sm"
                    {...field}
                  />
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger
                      aria-label={
                        isPassVisible ? t('hidePassword') : t('showPassword')
                      }
                      tabIndex={-1}
                      type="button"
                      disabled={!field.value}
                      onClick={() => setIsPassVisible(!isPassVisible)}
                      className="absolute inset-y-0 right-2 my-auto text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isPassVisible ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-xs">
                        {isPassVisible ? t('hidePassword') : t('showPassword')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isNewPassVisible ? 'text' : 'password'}
                    disabled={isSubmitting}
                    placeholder={t('newPasswordPlaceholder')}
                    className="pr-8 shadow-sm"
                    {...field}
                  />
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger
                      aria-label={
                        isNewPassVisible ? t('hidePassword') : t('showPassword')
                      }
                      tabIndex={-1}
                      type="button"
                      disabled={!field.value}
                      onClick={() => setIsNewPassVisible(!isNewPassVisible)}
                      className="absolute inset-y-0 right-2 my-auto text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isNewPassVisible ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-xs">
                        {isNewPassVisible
                          ? t('hidePassword')
                          : t('showPassword')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting}
          className="w-full font-semibold shadow-md"
          style={{ backgroundColor: '#219ebc' }}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Key className="mr-2 size-4" />
          )}
          {t('resetPasswordButton')}
        </Button>
      </form>

      <OAuthButtons
        isFormDisabled={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

      <p className="mt-8 text-sm text-muted-foreground font-bold">
        <Link
          href={'/login'}
          className="underline underline-offset-2 outline-none hover:text-foreground hover:underline"
        >
          {t('alreadyHaveAccount')}
        </Link>
      </p>
    </Form>
  )
}
