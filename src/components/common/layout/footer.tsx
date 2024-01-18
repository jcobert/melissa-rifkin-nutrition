import React, { FC } from 'react'

const Footer: FC = () => {
  // const currentYear = new Date().getFullYear();
  // const links = [{}];

  return (
    <div className='w-full bg-gray-300'>
      <div className='flex flex-col items-center py-6 mx-auto text-white max-w-layoutMax md:w-11/12 md:py-2 md:flex-row gap-y-6 md:justify-between'>
        {/* Links */}
        {/* <div className='flex text-xl md:text-xl gap-x-16 md:gap-x-10'>
          <a
            className='transition-all hover:text-theme-secondary'
            // href={link}
          ></a>
        </div> */}
        <div className='flex-grow'></div>
        {/* Credit */}
        <div className='flex flex-col items-center md:flex-row gap-y-8 gap-x-8'>
          <div className='text-xs'>
            <p id='copyright' className='transition hover:text-theme-secondary'>
              {/* <a href=''>
                {' ' + currentYear}
              </a> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
