'use client'

import bazaar from 'public/images/organizations/bazaar-200.png'
import cosmo from 'public/images/organizations/cosmo-200.png'
import glamour from 'public/images/organizations/glamour-200.png'
import health from 'public/images/organizations/health-200.png'
import nbc from 'public/images/organizations/nbc-200.png'
import haloTop from 'public/images/organizations/partners/halo-top-2-300x300.png'
import kellogs from 'public/images/organizations/partners/kellogs-2-1024x432.png'
import pfizer from 'public/images/organizations/partners/pfizer-2-1024x451.png'
import wholeFoods from 'public/images/organizations/partners/whole-foods-1-1024x1024.png'
import reuters from 'public/images/organizations/reuters-200.png'
import usnwr from 'public/images/organizations/usnwr-200.png'
import wsj from 'public/images/organizations/wsj-200.png'
import React, { FC } from 'react'

import { cn } from '@/utils/style'

const brands = [
  { img: bazaar, name: 'Bazaar' },
  { img: cosmo, name: 'Cosmopolitan' },
  { img: glamour, name: 'Glamour' },
  { img: health, name: 'Health' },
  { img: nbc, name: 'NBC News' },
  { img: reuters, name: 'Reuters' },
  { img: usnwr, name: 'U.S. News & World Report' },
  { img: wsj, name: 'Wall Street Journal' },
]

const partnerBrands = [
  { img: haloTop, name: 'Halo Top' },
  { img: pfizer, name: 'Pfizer' },
  { img: kellogs, name: "Kellogs's" },
  { img: wholeFoods, name: 'Whole Foods' },
]

type Props = {
  partners?: boolean
  className?: string
  imageClassName?: string
}

const BrandBanner: FC<Props> = ({
  partners = false,
  className = '',
  imageClassName = '',
}) => {
  const orgs = partners ? partnerBrands : brands

  return (
    <div
      className={cn(
        'gap-4 items-center grid grid-flow-col sm:grid-rows-1 max-sm:grid-rows-2 px-4 rounded',
        [className],
      )}
    >
      {orgs?.map((brand) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={brand?.img?.src}
          src={brand?.img?.src}
          alt={brand?.name}
          className={cn('rounded-full', [imageClassName])}
        />
      ))}
    </div>
  )
}
export default BrandBanner
