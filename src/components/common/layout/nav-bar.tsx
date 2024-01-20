import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { FC } from 'react'

import NavLink from '@/components/common/layout/nav-link'

import { navItems } from '@/configuration/nav'

const NavBar: FC = () => {
  return (
    <NavigationMenu.Root className='relative_ z-[1] flex justify-center'>
      <NavigationMenu.List className='center m-0 flex gap-1 list-none rounded-[6px] bg-white__ p-1 shadow-md_'>
        {navItems?.map((item) => {
          const hasMenu = !!item?.menu?.length
          return (
            <NavigationMenu.Item key={item?.id}>
              {!hasMenu ? (
                <NavLink
                  className='text-brand-gray-dark transition hover:bg-brand/10 focus:shadow-brand-gray-dark__ block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none_ focus:shadow-[0_0_0_2px]__'
                  href={item?.url}
                >
                  {item?.name}
                </NavLink>
              ) : (
                <>
                  <NavigationMenu.Trigger className='text-brand-gray-dark hover:border-y-brand/10 focus:shadow-brand-gray-dark__ group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none__ focus:shadow-[0_0_0_2px]__'>
                    {item?.name}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Sub>
                      <NavigationMenu.List>
                        {item?.menu?.map((subItem) => (
                          <NavigationMenu.Item
                            key={`${item?.id}.${subItem?.id}`}
                          >
                            <NavLink href={subItem?.url}>
                              {subItem?.name}
                            </NavLink>
                          </NavigationMenu.Item>
                        ))}
                      </NavigationMenu.List>
                    </NavigationMenu.Sub>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          )
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default NavBar
