import { partition } from 'lodash'
import React, { FC } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6'
import {
  ContactInfo,
  type SocialLinks as SanitySocialLinks,
  SocialNetworks,
} from 'sanity-studio/types'

import { cn } from '@/utils/style'

import { LinkWithIcon } from '@/typings/utility'

type SocialLinkWithIcon = LinkWithIcon<
  keyof typeof SocialNetworks | 'email' | 'phone'
>

export const socialIcons: {
  [key in keyof typeof SocialNetworks | 'email' | 'phone']: JSX.Element
} = {
  facebook: <FaFacebook aria-hidden />,
  instagram: <FaInstagram aria-hidden />,
  pinterest: <FaPinterest aria-hidden />,
  twitter: <FaXTwitter aria-hidden />,
  tiktok: <FaTiktok aria-hidden />,
  email: <FaEnvelope aria-hidden />,
  phone: <FaPhone aria-hidden />,
}

type SocialLinkProps = {
  link?: SocialLinkWithIcon
  className?: string
  showText?: boolean
}

export const SocialLink: FC<SocialLinkProps> = ({
  link,
  className,
  showText = false,
}) => {
  return (
    <a
      key={link?.id}
      className={cn([
        'transition-all text-xl md:text-lg text-brand-gray-dark hover:text-brand-gray-medium group flex items-center gap-4',
        className,
      ])}
      href={link?.url}
      aria-label={link?.ariaLabel || link?.id}
    >
      {link?.icon}
      {showText ? (
        <span className='group-hover:underline text-lg text-brand-blue-dark group-hover:text-brand-blue transition-all'>
          {link?.text}
        </span>
      ) : null}
    </a>
  )
}

type SocialLinksProps = {
  socialLinks?: SanitySocialLinks
  contactInfo?: ContactInfo
  className?: string
  linkClassName?: string
} & Pick<SocialLinkProps, 'showText'>

export const SocialLinks: FC<SocialLinksProps> = ({
  socialLinks = {},
  contactInfo,
  className = '',
  linkClassName = '',
  showText,
}) => {
  // if (!socialLinks) return null

  const links: SocialLinkWithIcon[] = Object.keys(socialLinks)
    ?.filter((link) => link !== '_type')
    ?.map(
      (key) =>
        ({
          id: key,
          text: socialLinks[key],
          ariaLabel: SocialNetworks[key],
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
        link?.url ? (
          <SocialLink
            key={link?.id}
            link={{ ...link }}
            className={cn([linkClassName])}
            showText={showText}
          />
        ) : null,
      )}
      {contactInfo?.email ? (
        <SocialLink
          link={{
            id: 'email',
            text: contactInfo?.email,
            ariaLabel: 'Email',
            url: `mailto:${contactInfo?.email}`,
            icon: socialIcons?.email,
          }}
          className={cn([linkClassName])}
          showText={showText}
        />
      ) : null}
      {contactInfo?.phone ? (
        <SocialLink
          link={{
            id: 'phone',
            text: contactInfo?.phone,
            ariaLabel: 'Phone',
            url: `tel:${contactInfo?.phone}`,
            icon: socialIcons?.phone,
          }}
          className={cn([linkClassName])}
          showText={showText}
        />
      ) : null}
    </div>
  )
}
