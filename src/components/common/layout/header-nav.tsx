'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'

import Button from '@/components/common/buttons/Button'
import Accordion from '@/components/common/layout/accordion'
import DesktopNavbar from '@/components/common/layout/nav-bar'

import { isActive, navItems } from '@/configuration/nav'

const HeaderNav: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/**
       * *************************
       * ******** DESKTOP ********
       * *************************
       */}
      <div className='hidden z-50 sm:block w-full border-b-2 py-2 sticky top-0 background-saturate-150 backdrop-blur-lg bg-background/80'>
        <div className='sm:flex items-center gap-6 w-11/12 max-w-[68.75rem] px-2 sm:px-0 mx-auto'>
          {/* Logo */}
          <Link href='/' className='w-fit'>
            <Image
              src='/images/logo-expanded.png'
              alt='Melissa Rifkin Nutrition logo'
              width={150}
              height={37}
              priority
              className=''
            />
          </Link>
          {/* Links */}
          <DesktopNavbar />
        </div>
      </div>

      {/**
       * *************************
       * ******** MOBILE *********
       * *************************
       */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        className='sm:hidden bg-background/80'
        classNames={{ wrapper: 'w-11/12 max-w-[68.75rem] px-2 sm:px-0' }}
      >
        <NavbarContent className='sm:hidden w-full grid grid-rows-1 grid-cols-12 items-center'>
          {/* Logo */}
          <Link
            href='/'
            className='col-span-8'
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src='/images/logo-expanded.png'
              alt=''
              width={172}
              height={64}
              priority
            />
          </Link>
          {/* Hamburger */}
          <NavbarMenuToggle className='col-start-12' />
        </NavbarContent>

        {/* Menu */}
        <NavbarMenu className='px-8 overflow-y-auto pb-16'>
          <Separator.Root
            className='bg-[rgba(18,18,18,0.15)] h-px -mt-2 animate-fadeIn'
            decorative
            orientation='horizontal'
          />
          {/* Links */}
          <div className='flex flex-col gap-8 mt-10 pb-safe mb-24'>
            {navItems?.map((item) => {
              const hasMenu = !!item?.menu?.links?.length
              return (
                <NavbarMenuItem
                  key={item?.id}
                  className='text-right text-xl'
                  isActive={isActive(item, pathname)}
                >
                  {!hasMenu ? (
                    <Link
                      className='w-full font-semibold text-brand-gray-dark'
                      href={item?.url}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    <Accordion
                      collapsible
                      className='border-none pr-0'
                      triggerClassName='!justify-end font-semibold text-brand-gray-dark data-[state=open]:text-brand'
                      itemClassName='p-0'
                      items={[
                        {
                          header: item?.name,
                          content: (
                            <div className='flex flex-col gap-8 bg-almost-white/40__ p-4 pr-6 rounded border__ border-brand-gray-light/30'>
                              <Link
                                key={`${item?.id}-menu`}
                                className='w-full font-medium text-brand-gray-dark'
                                href={item?.url}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {`All ${item?.name}`}
                              </Link>
                              {item?.menu?.links?.map((link) => (
                                <Link
                                  key={link?.id}
                                  className='w-full font-medium text-brand-gray-dark'
                                  href={link?.url}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {link?.name}
                                </Link>
                              ))}
                            </div>
                          ),
                        },
                      ]}
                    />
                  )}
                </NavbarMenuItem>
              )
            })}
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default HeaderNav
