import { QueryResponseInitial } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import { FC } from 'react'
import { AboutPage as AboutPageData, General } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import PageLayout from '@/components/common/layout/page-layout'
import FullBio from '@/components/features/bio/full-bio'

type Props = {
  aboutPageData: QueryResponseInitial<SanityDocument<AboutPageData>>
  generalInfo: QueryResponseInitial<SanityDocument<General>>
}

const AboutPage: FC<Props> = ({ aboutPageData, generalInfo }) => {
  const aboutData = aboutPageData?.data

  return (
    <PageLayout
      heading='About Us'
      className='flex flex-col gap-16 items-center text-almost-black'
    >
      <div className='flex flex-col gap-12 mt-4 md:mt-8'>
        {aboutData?.bios?.length
          ? aboutData?.bios?.map((bio, i) => (
              <div key={bio?._id} className='flex flex-col gap-4'>
                <FullBio bio={bio} general={generalInfo?.data} />
                <span
                  aria-hidden
                  className={cn(
                    'h-px max-md:w-2/3 w-full border-b mx-auto mt-8',
                    [i === (aboutData?.bios || [])?.length - 1 && 'hidden'],
                  )}
                />
              </div>
            ))
          : null}
      </div>
    </PageLayout>
  )
}

export default AboutPage
