import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { FC } from 'react'

import { cn } from '@/utils/style'

import NavLink from '@/components/common/layout/nav-link'

import { getRowSpan, navItems } from '@/configuration/nav'

const NavBar: FC = () => {
  return (
    <NavigationMenu.Root className='relative_ z-[1] flex justify-center'>
      <NavigationMenu.List className='center m-0 flex gap-1 list-none rounded-[6px] p-1'>
        {navItems?.map((item) => {
          const hasMenu = !!item?.menu?.links?.length
          return (
            <NavigationMenu.Item key={item?.id}>
              {!hasMenu ? (
                <NavLink
                  className='text-brand-gray-dark transition hover:bg-brand/10 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline'
                  href={item?.url}
                >
                  {item?.name}
                </NavLink>
              ) : (
                <>
                  <NavigationMenu.Trigger className='text-brand-gray-dark hover:border-y-brand/10 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none'>
                    {item?.name}
                  </NavigationMenu.Trigger>
                  <div className='perspective-[2000px] absolute top-full flex justify-center w-[var(--radix-navigation-menu-viewport-width)]'>
                    <NavigationMenu.Content className='relative mt-4 data-[state=open]:animate-scaleIn shadow-xl data-[state=closed]:animate-scaleOut h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-auto rounded-[6px] bg-white transition-[width,_height] duration-300 w-[var(--radix-navigation-menu-viewport-width)] max-h-[70dvh]'>
                      {/* Menu title */}
                      <p className='text-xl -mb-1 px-[22px] mt-[10px] text-brand-gray-medium'>
                        {item?.name}
                      </p>
                      {/* Links */}
                      <ul className='m-0 grid list-none gap-x-[10px] gap-y-2 pt-4 p-[22px] pl-1_ grid-cols-[0.75fr_1fr]'>
                        {!!item?.menu?.img?.src && (
                          <NavLink
                            href={item?.url}
                            className={cn([
                              'object-cover object-center h-full rounded min-[840px]:min-w-48',
                              getRowSpan(item?.menu),
                            ])}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                            <img
                              className={cn([
                                'object-cover object-center h-full rounded',
                                getRowSpan(item?.menu),
                              ])}
                              {...item?.menu?.img}
                            />
                          </NavLink>
                        )}
                        {item?.menu?.links?.map((subItem) => (
                          <NavigationMenu.Item
                            key={`${item?.id}.${subItem?.id}`}
                          >
                            <NavLink
                              href={subItem?.url}
                              className='text-brand-gray-dark h-full transition hover:bg-brand/10 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline'
                            >
                              <div className='flex flex-col gap-2'>
                                <span
                                  className={cn([
                                    'text-nowrap font-semibold',
                                    !subItem?.description &&
                                      'min-[840px]:min-w-48',
                                  ])}
                                >
                                  {subItem?.name}
                                </span>
                                {!!subItem?.description && (
                                  <p className='font-normal text-brand-gray-medium text-pretty min-[840px]:min-w-72'>
                                    {subItem?.description}
                                  </p>
                                )}
                              </div>
                            </NavLink>
                          </NavigationMenu.Item>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  </div>
                </>
              )}
            </NavigationMenu.Item>
          )
        })}

        <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative h-[2px] w-10 rounded bg-brand/20' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default NavBar
