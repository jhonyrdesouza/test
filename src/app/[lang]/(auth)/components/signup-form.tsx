'use client'

import { PhoneInput } from '@/components/phone-input'
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
import { createNewAccount } from '@/lib/actions'
import type { SignUpFormData } from '@/lib/types'
import { signUpSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { OAuthButtons } from './oauth-buttons'

const defaultValues: SignUpFormData = {
  email: '',
  password: '',
  confirmPassword: '',
}

export function SignUpForm() {
  const [isPassVisible, setIsPassVisible] = React.useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const searchParams = useSearchParams()

  const t = useTranslations('pages.login')

  const authError = searchParams.get('error')

  if (authError === 'OAuthAccountNotLinked') {
    toast.error(t('oauthError.notLinked'), {
      description: t('oauthError.description'),
    })
  }

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  })

  async function onSubmit(formData: SignUpFormData) {
    setIsSubmitting(true)

    try {
      toast.promise(createNewAccount({ ...formData }), {
        loading: t('toasts.signupLoading'),
        success: t('toasts.signupSuccess'),
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
          name="name"
          // control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    disabled={isSubmitting}
                    placeholder={t('namePlaceholder')}
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
          name="phone"
          // control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Phone</FormLabel>
              <FormControl>
                <div className="relative">
                  <PhoneInput
                    type="phone"
                    disabled={isSubmitting}
                    placeholder={t('phonePlaceholder')}
                    className="shadow-sm"
                    defaultCountry="BR"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="sr-only">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isConfirmPassVisible ? 'text' : 'password'}
                    disabled={isSubmitting}
                    placeholder={t('confirmPassword')}
                    className="pr-8 shadow-sm"
                    {...field}
                  />
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger
                      aria-label={
                        isConfirmPassVisible
                          ? t('hidePassword')
                          : t('showPassword')
                      }
                      tabIndex={-1}
                      type="button"
                      disabled={!field.value}
                      onClick={() =>
                        setIsConfirmPassVisible(!isConfirmPassVisible)
                      }
                      className="absolute inset-y-0 right-2 my-auto text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isConfirmPassVisible ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </TooltipTrigger>

                    <TooltipContent>
                      <p className="text-xs">
                        {isConfirmPassVisible
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
            <Mail className="mr-2 size-4" />
          )}
          {t('signupButton')}
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
