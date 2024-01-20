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
                  <NavigationMenu.Trigger
                    // asChild
                    className='text-brand-gray-dark hover:border-y-brand/10 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none'
                  >
                    {/* <NavLink href={item?.url}>{item?.name}</NavLink> */}
                    {item?.name}
                  </NavigationMenu.Trigger>
                  {/* <NavigationMenu.Content className='absolute top-0 left-0 w-auto'> */}
                  <NavigationMenu.Content className='absolute top-14 left-0 data-[state=open]:animate-scaleIn shadow-xl data-[state=closed]:animate-scaleOut mt-0 h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-auto rounded-[6px] bg-white transition-[width,_height] duration-300 w-[var(--radix-navigation-menu-viewport-width)] max-h-[70dvh] min-[900px]:min-w-[600px]_'>
                    {/* Menu title */}
                    <p
                      className='text-xl px-[22px] mt-3 text-brand-gray-medium'
                      // role='none'
                    >
                      {item?.name}
                    </p>

                    {/* Links */}
                    <ul className='m-0 grid list-none gap-x-[10px] gap-y-2 pt-4 p-[22px] pl-1_ grid-cols-[0.75fr_1fr]'>
                      {!!item?.menu?.img?.src && (
                        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                        <img
                          className={cn([
                            'object-cover object-center h-full rounded min-[900px]:min-w-48',
                            getRowSpan(item?.menu),
                          ])}
                          {...item?.menu?.img}
                        />
                      )}
                      {item?.menu?.links?.map((subItem) => (
                        <NavigationMenu.Item key={`${item?.id}.${subItem?.id}`}>
                          <NavLink
                            href={subItem?.url}
                            className='text-brand-gray-dark h-full transition hover:bg-brand/10 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline'
                          >
                            <div className='flex flex-col gap-2'>
                              <span>{subItem?.name}</span>
                              {!!subItem?.description && (
                                <p className='font-normal text-brand-gray-medium text-pretty min-[900px]:min-w-72'>
                                  {subItem?.description}
                                </p>
                              )}
                            </div>
                          </NavLink>
                        </NavigationMenu.Item>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          )
        })}

        <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative top-[50%]_ h-[2px] w-10 rounded bg-brand/20' />
          {/* <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-brand-gray-medium' /> */}
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      {/* <div className='perspective-[2000px] absolute top-full left-0_ right-[20%] flex w-full justify-center'>
        <NavigationMenu.Viewport className='data-[state=open]:animate-scaleIn shadow-xl data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 w-[var(--radix-navigation-menu-viewport-width)]' />
      </div> */}
    </NavigationMenu.Root>
  )
}

export default NavBar
