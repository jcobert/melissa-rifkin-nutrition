'use client'

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

import { cn } from '@/utils/style'

import { isActive, navLinks } from '@/configuration/nav'

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      classNames={{ wrapper: 'w-11/12 max-w-[68.75rem] px-2 sm:px-0' }}
    >
      {/**
       * *************************
       * ******** DESKTOP ********
       * *************************
       */}
      <NavbarContent className='hidden sm:flex gap-6' justify='center'>
        {/* Logo */}
        <Link href='/' className='w-fit'>
          {/* <Image
            src='/'
            alt=''
            width={150}
            height={37}
            priority
            className='-ml-2'
          /> */}
        </Link>

        {/* Links */}
        {navLinks?.map((link) => (
          <NavbarItem
            key={link?.id}
            isActive={isActive(link, pathname)}
            className={cn(
              'flex',
              'relative',
              'h-full',
              'items-center',
              'justify-center',
              // 'min-w-20',
              // 'gap-x-4',
              "data-[active=true]:after:content-['']",
              'data-[active=true]:after:absolute',
              'data-[active=true]:after:bottom-3',
              'data-[active=true]:after:left-0',
              'data-[active=true]:after:right-0',
              'data-[active=true]:after:h-[2px]',
              'data-[active=true]:after:rounded-[2px]',
              'data-[active=true]:after:bg-primary',
            )}
          >
            <Link href={link?.url}>{link?.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/**
       * *************************
       * ******** MOBILE *********
       * *************************
       */}
      <NavbarContent className='sm:hidden w-full flex items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='flex-auto'
          onClick={() => setIsMenuOpen(false)}
        >
          {/* <Image
            src='/'
            alt=''
            width={100}
            height={20}
            priority
            className='-ml-2'
          /> */}
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
          {navLinks.map((link) => (
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
  )
}

export default Header
