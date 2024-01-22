import { HTMLProps } from 'react'

export type NavLink = {
  id: string
  name: string
  url: string
  description?: string
}

export type NavMenu = { links: NavLink[]; img?: HTMLProps<HTMLImageElement> }

export type NavItem = NavLink & { menu?: NavMenu }

export const navItems: NavItem[] = [
  {
    id: 'resources',
    name: 'Resources',
    url: '/resources',
    menu: {
      img: {
        src: '/images/food-tray-portions.jpeg',
        alt: 'portions of various foods in tray.',
      },
      links: [
        {
          id: 'mealPlans',
          name: 'Meal Plans',
          url: '/resources/meal-plans',
          description: "Get started with a curated menu that's right for you.",
        },
        {
          id: 'printables',
          name: 'Printables',
          url: '/resources/printables',
          description:
            'A selection of handouts with helpful tips and information.',
        },
        {
          id: 'books',
          name: 'Books',
          url: '/resources/books',
          description: 'Dig in to one of our fun and informative books.',
        },
      ],
    },
  },
  {
    id: 'recipes',
    name: 'Recipes',
    url: '/recipes',
    menu: {
      img: {
        src: '/images/cutting-board.jpeg',
        alt: 'cutting board with vegetables',
      },
      links: [
        { id: 'breakfast', name: 'Breakfast', url: '/recipes/breakfast' },
        { id: 'lunch', name: 'Lunch', url: '/recipes/lunch' },
        { id: 'dinner', name: 'Dinner', url: '/recipes/dinner' },
        { id: 'desserts', name: 'Desserts', url: '/recipes/desserts' },
        { id: 'sideDishes', name: 'Side Dishes', url: '/recipes/sideDishes' },
        { id: 'snacks', name: 'Snacks', url: '/recipes/snacks' },
      ],
    },
  },
  {
    id: 'blog',
    name: 'Blog',
    url: '/blog',
  },
  {
    id: 'about',
    name: 'About',
    url: '/about',
  },
  {
    id: 'contact',
    name: 'Contact',
    url: '/contact',
  },
]

export const isActive = (link: NavLink, pathname: string) =>
  link?.url === pathname

export const getRowSpan = (menu: NavMenu) => {
  return `row-span-${menu?.links?.length ?? 3}`
}
