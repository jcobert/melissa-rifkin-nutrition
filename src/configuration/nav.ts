export type NavLink = { id: string; name: string; url: string }

export type NavItem = NavLink & { menu?: NavLink[] }

export const navItems: NavItem[] = [
  // {
  //   id: 'home',
  //   name: 'Home',
  //   url: '/',
  // },
  {
    id: 'about',
    name: 'About',
    url: '/about',
  },
  {
    id: 'mealPlans',
    name: 'Meal Plans',
    url: '/meal-plans',
  },
  {
    id: 'recipes',
    name: 'Recipes',
    url: '/recipes',
  },
  {
    id: 'blog',
    name: 'Blog',
    url: '/blog',
  },
  {
    id: 'contact',
    name: 'Contact',
    url: '/contact',
  },
]

export const isActive = (link: NavLink, pathname: string) =>
  link?.url === pathname
