'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { LoginFormData } from '@/lib/types'
import { loginSchema } from '@/lib/validations'
import { AtSign, Eye, EyeOff, Fingerprint, Loader2, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { OAuthButtons } from './oauth-buttons'

const defaultValues: LoginFormData = {
  type: 'email',
  email: '',
  password: '',
}

export function LoginForm() {
  const [isEmailMode, setIsEmailMode] = React.useState(true)
  const [isPassVisible, setIsPassVisible] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const t = useTranslations('pages.login')

  const searchParams = useSearchParams()

  const authError = searchParams.get('error')

  if (authError === 'OAuthAccountNotLinked') {
    toast.error(t('oauthError.notLinked'), {
      description: t('oauthError.description'),
    })
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  async function onSubmit(formData: LoginFormData) {
    setIsSubmitting(true)

    try {
      toast.promise(signIn('credentials', { ...formData }), {
        loading: t('toasts.signInLoading'),
        success: t('toasts.signInSuccess'),
        error: t('toasts.signInError'),
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
          name={isEmailMode ? 'email' : 'username'}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">
                {isEmailMode ? 'Email' : 'Username'}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isEmailMode ? 'email' : 'text'}
                    disabled={isSubmitting}
                    placeholder={
                      isEmailMode
                        ? t('emailPlaceholder')
                        : t('usernamePlaceholder')
                    }
                    className="pr-8 shadow-sm"
                    {...field}
                  />
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger
                      aria-label={
                        isEmailMode
                          ? t('emailPlaceholder')
                          : t('usernamePlaceholder')
                      }
                      tabIndex={-1}
                      type="button"
                      onClick={() => setIsEmailMode(!isEmailMode)}
                      className="absolute inset-y-0 right-2 my-auto text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isEmailMode ? (
                        <AtSign className="size-5" />
                      ) : (
                        <Mail className="size-5" />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-xs">
                        {isEmailMode
                          ? t('loginWithEmail')
                          : t('loginWithUsername')}
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
            <>
              {isEmailMode ? (
                <Mail className="mr-2 size-4" />
              ) : (
                <Fingerprint className="mr-2 size-4" />
              )}
              {isEmailMode ? t('loginWithEmail') : t('loginWithUsername')}
            </>
          )}
        </Button>
      </form>
      <div className="mt-4 flex items-center justify-between space-x-3">
        <div className="flex items-center">
          <Checkbox id="password" />
          <Label
            htmlFor="password"
            className="ml-2 text-xs text-muted-foreground"
          >
            {t('rememberMe')}
          </Label>
        </div>

        <p className=" text-xs text-muted-foreground ">
          <Link
            href="/reset-password"
            className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {t('forgotPassword')}
          </Link>
        </p>
      </div>

      <OAuthButtons
        isFormDisabled={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

      <p className="mt-8 text-sm text-muted-foreground font-bold">
        <Link
          href={'/signup'}
          className="underline underline-offset-2 outline-none hover:underline"
        >
          {t('signupPrompt')}
        </Link>
      </p>
    </Form>
  )
}
