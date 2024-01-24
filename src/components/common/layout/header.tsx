'use client'

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import * as Separator from '@radix-ui/react-separator'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useState } from 'react'

import DesktopNavbar from '@/components/common/layout/nav-bar'

import { isActive, navItems } from '@/configuration/nav'

const Header: FC = () => {
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
        <NavbarContent className='sm:hidden w-full flex items-center'>
          {/* Logo */}
          <Link
            href='/'
            className='flex-auto'
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src='/images/logo.png'
              alt=''
              width={42}
              height={42}
              priority
              className=''
            />
          </Link>
          {/* Hamburger */}
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Menu */}
        <NavbarMenu className='px-8'>
          <Separator.Root
            className='bg-[rgba(18,18,18,0.15)] h-px -mt-2 animate-fadeIn'
            decorative
            orientation='horizontal'
          />
          {/* Links */}
          <div className='flex flex-col gap-8 mt-10'>
            {navItems?.map((link) => (
              <NavbarMenuItem
                key={link?.id}
                className='text-right text-xl'
                isActive={isActive(link, pathname)}
              >
                <Link
                  className='w-full'
                  href={link?.url}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link?.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default Header
