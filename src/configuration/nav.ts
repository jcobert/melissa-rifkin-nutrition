import { HTMLProps } from 'react'

export type NavId =
  | 'resources'
  | 'mealPlans'
  | 'printables'
  | 'books'
  | 'recipes'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'side'
  | 'snack'
  | 'blog'
  | 'about'
  | 'partnerships'
  | 'contact'

export type NavLink = {
  id: NavId
  name: string
  url: string
  description?: string
  hidden?: boolean
}

export type NavMenu = {
  links: NavLink[]
  img?: HTMLProps<HTMLImageElement>
}

export type NavItem = NavLink & { menu?: NavMenu }

export const navItems: NavItem[] = [
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
        {
          id: 'breakfast',
          name: 'Breakfast',
          url: '/recipes/?category=breakfast',
        },
        { id: 'lunch', name: 'Lunch', url: '/recipes/?category=lunch' },
        { id: 'dinner', name: 'Dinner', url: '/recipes/?category=dinner' },
        {
          id: 'dessert',
          name: 'Desserts',
          url: '/recipes/?category=dessert',
        },
        {
          id: 'side',
          name: 'Side Dishes',
          url: '/recipes/?category=side',
        },
        { id: 'snack', name: 'Snacks', url: '/recipes/?category=snack' },
      ],
    },
  },
  {
    id: 'resources',
    name: 'Resources',
    url: '',
    menu: {
      // img: {
      //   src: '/images/food-tray-portions.jpeg',
      //   alt: 'portions of various foods in tray.',
      // },
      links: [
        {
          id: 'mealPlans',
          name: 'Meal Plans',
          url: '/resources/meal-plans',
          description: "Get started with a curated menu that's right for you.",
          hidden: true,
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
    id: 'partnerships',
    name: 'Partnerships',
    url: '/about/partnerships',
    hidden: true,
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
