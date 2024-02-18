import { partition } from 'lodash'
import React, { FC } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa6'
import {
  type SocialLinks as SanitySocialLinks,
  SocialNetworks,
} from 'sanity-studio/types'

import { cn } from '@/utils/style'

import { LinkWithIcon } from '@/typings/utility'

type SocialLinkWithIcon = LinkWithIcon<
  keyof typeof SocialNetworks | 'email' | 'phone',
  SocialNetworks | 'Email' | 'Phone'
>

export const socialIcons: {
  [key in keyof typeof SocialNetworks | 'email' | 'phone']: JSX.Element
} = {
  facebook: <FaFacebook aria-hidden />,
  instagram: <FaInstagram aria-hidden />,
  pinterest: <FaPinterest aria-hidden />,
  twitter: <FaTwitter aria-hidden />,
  email: <FaEnvelope aria-hidden />,
  phone: <FaPhone aria-hidden />,
}

type SocialLinkProps = {
  link?: SocialLinkWithIcon
  className?: string
}

export const SocialLink: FC<SocialLinkProps> = ({ link, className = '' }) => {
  return (
    <a
      key={link?.id}
      className={cn([
        'transition-all text-xl md:text-lg text-brand-gray-dark hover:text-brand-gray-medium',
        className,
      ])}
      href={link?.url}
      aria-label={`${link?.name}`}
    >
      {link?.icon}
    </a>
  )
}

type SocialLinksProps = {
  socialLinks?: SanitySocialLinks
  className?: string
  linkClassName?: string
}

export const SocialLinks: FC<SocialLinksProps> = ({
  socialLinks,
  className = '',
  linkClassName = '',
}) => {
  if (!socialLinks) return null

  const links: SocialLinkWithIcon[] = Object.keys(socialLinks)
    ?.filter((link) => link !== '_type')
    ?.map(
      (key) =>
        ({
          id: key,
          name: SocialNetworks[key],
          url: socialLinks[key],
          icon: socialIcons[key],
        }) as SocialLinkWithIcon,
    )

  // Display Instagram first
  const partitionedLinks = partition(links, (link) => link?.id === 'instagram')
  const sortedLinks = partitionedLinks[0]?.concat(partitionedLinks[1])

  return (
    <div
      className={cn([
        'flex items-center gap-y-4 gap-x-8 md:gap-x-4',
        className,
      ])}
    >
      {sortedLinks?.map((link) =>
        link?.name ? (
          <SocialLink
            key={link?.name}
            link={{ ...link }}
            className={cn([linkClassName])}
          />
        ) : null,
      )}
    </div>
  )
}
