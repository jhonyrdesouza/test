'use client'

import LocaleSwitcher from '@/components/locale-switcher'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type React from 'react'

export default function AuthLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const { theme } = useTheme()
  const t = useTranslations('banner')

  console.log('theme:', theme)
  // const logo =
  //   theme === "light"
  //     ? "/static/svg/logo-dark.svg"
  //     : "/static/svg/logo-light.svg";

  return (
    <div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative my-auto flex h-full lg:p-8">
        <div className="z-10 mx-auto flex w-full flex-col justify-center sm:w-[550px]">
          <Image
            id="logo"
            alt="logo vibz"
            src={'/static/svg/logo-dark.svg'}
            className="mx-auto mb-4"
            width={150}
            height={150}
          />

          {children}
        </div>
      </div>
      <div className="relative hidden h-full flex-col justify-between border-l p-10 lg:flex ">
        <div className="absolute inset-0 bg-[#f5fafc]" />
        {/* Posicionando o LocaleSwitcher no canto superior direito */}
        <div className="absolute top-10 right-10 z-10">
          <LocaleSwitcher />
        </div>

        <div className="z-10 m-auto text-center">
          <h1 className="text-6xl font-extrabold bg-clip-text drop-shadow-2xl mx-1 relative inline-block stroke-current">
            {t('title')}
            <span className="text-[#219ebc] mx-1 relative inline-block stroke-current">
              {t('decoration')}

              <svg
                className="absolute -bottom-0.5 w-full max-h-1.5"
                viewBox="0 0 55 5"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{
                  zIndex: -1,
                  transform: 'rotate(-1deg)',
                }}
              >
                <path
                  d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
                  stroke="#fb8500"
                  strokeWidth="6"
                ></path>
              </svg>
            </span>
          </h1>

          <h2 className="text-2xl mt-6 font-light">{t('description')}</h2>

          <div className="flex justify-center items-center mt-4">
            <Button className="hover:ring-[#fb8500] hover:ring-offset-background font-bold hover:ring-2 hover:ring-offset-2 bg-[#fb8500] hover:bg-[#f97316]">
              {t('button')}
            </Button>
          </div>
        </div>
        <div className="z-10 text-center">
          <p className="text-xs font-light text-muted-foreground">
            {t('terms')}
          </p>
        </div>
      </div>
    </div>
  )
}
