'use client'

import React, { FC, useState } from 'react'
import { CgMenu, CgMenuGridO } from 'react-icons/cg'
import { Post } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import NoResults from '@/components/common/no-results'
import BlogPostCard from '@/components/features/blog/blog-post-card'
import BlogPostOverview from '@/components/features/blog/blog-post-overview'

type Props = {
  posts: Post[]
}

const BlogPosts: FC<Props> = ({ posts }) => {
  const [view, setView] = useState<'grid' | 'list'>('list')

  return (
    <div className='w-full sm:w-11/12 flex flex-col'>
      {/* View toggles */}
      <div className='flex items-center gap-4 rounded p-2 text-xl w-fit self-end max-md:hidden'>
        <button
          type='button'
          className={cn([
            'border p-2 rounded',
            view === 'list' && 'text-brand-blue',
          ])}
          aria-label='view posts as list.'
          onClick={() => setView('list')}
        >
          <CgMenu />
        </button>
        <button
          type='button'
          className={cn([
            'border p-2 rounded',
            view === 'grid' && 'text-brand-blue',
          ])}
          aria-label='view posts as grid.'
          onClick={() => setView('grid')}
        >
          <CgMenuGridO />
        </button>
      </div>

      {/* Posts */}
      {posts?.length ? (
        <div className='my-8 md:my-12 w-full'>
          {view === 'grid' && (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center'>
              {posts?.map((post) => (
                <BlogPostCard key={post?._id} post={post} />
              ))}
            </div>
          )}

          {view === 'list' && (
            <div className='flex flex-col gap-10 sm:gap-8'>
              {posts?.map((post) => (
                <>
                  <BlogPostOverview key={post?._id} post={post} />
                  <span
                    aria-hidden
                    className='h-px w-full max-sm:w-2/3 border-b mx-auto sm:hidden'
                  />
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='my-16'>
          <NoResults
            title=''
            subtitle='There are no blog posts.'
            description='Please check again soon.'
          />
        </div>
      )}
    </div>
  )
}

export default BlogPosts
