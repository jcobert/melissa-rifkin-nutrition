import { ImageResponse } from 'next/og'

import { siteConfig } from '@/configuration/site'

export const runtime = 'edge'

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request?.url)

    // Base logo image
    const logoData = (await fetch(
      new URL(
        `${process.env.SITE_BASE_URL}/images/logo-expanded.png`,
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer())) as string

    // Dynamic data
    const title = searchParams?.get('title')?.slice(0, 100) || ''
    const subtitle = searchParams?.get('subtitle')?.slice(0, 100) || ''
    const imgUrl = searchParams?.get('url') || ''
    const imgAlt = searchParams?.get('alt') || ''
    const imgWidth = searchParams?.get('width') || ''
    const imgHeight = searchParams?.get('height') || ''

    return new ImageResponse(
      (
        <div
          // tw='bg-white h-full w-full flex flex-col items-center justify-center text-center'
          style={{
            backgroundColor: '#FDFDFF',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            // height: 1200,
            // width: 630,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          {/* Dynamic image */}
          {imgUrl ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                // width: '100%',
              }}
            >
              <img
                alt={imgAlt}
                width={imgWidth}
                height={imgHeight}
                src={imgUrl}
                // tw='mx-6'
                style={{
                  // margin: '0 30px',
                  backgroundSize: 'contain',
                  // backgroundPosition: 'center'
                }}
              />
            </div>
          ) : null}

          {/* Logo */}
          <div
            // tw='flex items-center justify-center justify-items-center'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt={siteConfig?.title}
              // width={600}
              // height={184}
              src={logoData}
              // tw='mx-6'
              style={{ margin: '0 30px', width: '80%' }}
            />
          </div>

          {/* Title */}
          {title ? (
            <div
              // tw='text-6xl text-brand mt-6 px-28 whitespace-pre-wrap'
              style={{
                fontSize: 72,
                fontStyle: 'normal',
                fontFamily: '"Karla"',
                letterSpacing: '-0.025em',
                color: '#E46169',
                marginTop: 30,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {title}
            </div>
          ) : null}
          {subtitle ? <div>{subtitle}</div> : null}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
