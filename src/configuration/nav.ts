export type NavLink = { id: string; name: string; url: string }

export const navLinks: NavLink[] = []

export const isActive = (link: NavLink, pathname: string) =>
  link?.url === pathname
