'use client'

import { sortBy, uniq, uniqBy } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { TbListSearch } from 'react-icons/tb'
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters'
import { Post } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import SelectInput, {
  SelectOption,
} from '@/components/common/inputs/select-input'
import LayoutToggle from '@/components/common/layout-toggle'
import Accordion from '@/components/common/layout/accordion'
import NoResults from '@/components/common/no-results'
import BlogPostCard from '@/components/features/blog/blog-post-card'
import BlogPostOverview from '@/components/features/blog/blog-post-overview'

import { BlogPageProps } from '@/app/(main)/blog/page'

type Props = {
  posts: Post[]
  params?: BlogPageProps['searchParams']
}

const BlogPosts: FC<Props> = ({ posts, params }) => {
  const { category: tagParam } = params || {}

  const allTags = sortBy(
    uniqBy(
      posts?.flatMap((post) => (post?.tags || [])?.map((t) => t)),
      (t) => t?.toLowerCase(),
    ) || [],
    (tag) => tag?.toLowerCase(),
  )

  const tagFilterOptions: SelectOption[] = useMemo(
    () =>
      allTags?.map((tag) => ({
        value: tag,
        label: tag,
      })),
    [JSON.stringify(posts)],
  )

  const postSearchOptions: SelectOption<Post>[] = useMemo(
    () =>
      posts?.map((post) => ({
        value: post,
        label: (
          <div
            key={`opt-${post?._id}`}
            className='flex flex-col whitespace-pre-wrap gap-1 text-sm border-b -mb-2 pb-2'
          >
            <span>{post?.title}</span>
          </div>
        ),
      })),
    [JSON.stringify(posts)],
  )

  const [layout, setLayout] = useState<'grid' | 'list'>('list')

  const [tagFilter, setTagFilter] = useState<string | undefined>(tagParam)

  const [searchFilter, setSearchFilter] = useState<string>()
  const [selectedPost, setSelectedPost] = useState<Post>()

  const filteredPosts = useMemo(() => {
    let newPosts = posts
    // if (!tagFilter && !searchFilter) return posts
    if (tagFilter && !searchFilter) {
      newPosts = posts?.filter((p) =>
        p?.tags
          ?.map((t) => t?.toLowerCase())
          ?.includes(tagFilter?.toLowerCase()),
      )
    } else if (searchFilter) {
      newPosts = posts?.filter((p) => {
        const criteria = [p?.title, p?.tags?.join(), p?.author?.name]
          ?.join()
          ?.toLowerCase()
          ?.trim()
        return criteria?.includes(searchFilter?.toLowerCase()?.trim())
      })
    }
    return sortBy(newPosts, (post) => post?.publishedAt)?.reverse()
  }, [tagFilter, searchFilter, JSON.stringify(posts)])

  const isFiltered = !!tagFilter || !!searchFilter
  const foundCount = filteredPosts?.length || 0
  const totalCount = posts?.length || 0

  const resetAllFilters = () => {
    setSearchFilter(undefined)
    setTagFilter(undefined)
    setSelectedPost(undefined)
  }

  // Update filter values on url param change.
  useEffect(() => {
    setTagFilter(tagParam)
  }, [tagParam])

  const FilterSection = (
    <div className='flex max-sm:flex-col sm:justify-end sm:items-end w-full gap-4 p-2'>
      <SelectInput
        placeholder={
          <span className='flex items-center gap-2'>
            <HiOutlineSearch />
            <span>Search...</span>
          </span>
        }
        inputValue={searchFilter}
        onInputChange={(val, { action }) => {
          if (action !== 'input-change') {
            setSearchFilter(searchFilter)
            return
          }
          setSearchFilter(val)
          setTagFilter(undefined)
          setSelectedPost(undefined)
        }}
        onBlur={() => {
          if (searchFilter) setSelectedPost(posts?.[0])
        }}
        defaultMenuIsOpen={false}
        openMenuOnClick={false}
        blurInputOnSelect
        isClearable
        controlShouldRenderValue={false}
        onChange={(opt: SelectOption<Post>) => {
          setSelectedPost(opt?.value)
          if (!opt) setSearchFilter('')
        }}
        value={postSearchOptions?.find(
          (opt) => opt?.value?._id === selectedPost?._id,
        )}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={postSearchOptions}
        className='w-full sm:max-w-64 lg:max-w-64__'
        labelClassName={cn([!!searchFilter && '!text-brand-blue'])}
        classNames={{
          container: () => 'md:max-w-48__ min-w-24',
          input: () => '[&>*]:!opacity-100',
          option: (props) =>
            cn([
              props.isSelected && '!bg-almost-white !text-almost-black',
              props.isFocused && '!bg-almost-white',
            ]),
          control: () => cn([!!searchFilter && '!border-brand-blue !border']),
        }}
        filterOption={(option, input) => {
          const post = (option as FilterOptionOption<SelectOption<Post>>)?.data
            ?.value
          const criteria = [post?.title, post?.tags?.join(), post?.author?.name]
            ?.join()
            ?.toLowerCase()
            ?.trim()
          return criteria?.includes(input?.toLowerCase()?.trim())
        }}
      />

      <SelectInput
        options={tagFilterOptions}
        isClearable
        // isSearchable={false}
        menuShouldScrollIntoView
        className='w-full sm:max-w-48'
        labelClassName={cn([!!tagFilter && '!text-brand-blue'])}
        classNames={{
          container: () => 'md:max-w-48__ min-w-24',
          control: () => cn([!!tagFilter && '!border-brand-blue !border']),
        }}
        formatOptionLabel={(opt, _meta) => (
          <span className='capitalize'>{(opt as SelectOption)?.label}</span>
        )}
        value={
          tagFilterOptions?.find(
            (opt) => opt?.value?.toLowerCase() === tagFilter?.toLowerCase(),
          ) || ''
        }
        onChange={(opt) => {
          setTagFilter(opt?.value)
          setSearchFilter('')
        }}
        label='Category'
      />

      {/* Layout Toggle */}
      <div className='flex flex-col items-end justify-end gap-2 max-md:hidden'>
        <LayoutToggle layout={layout} setLayout={setLayout} />
      </div>
    </div>
  )

  return (
    <div className='w-full sm:w-11/12 flex flex-col gap-8 pb-safe'>
      {/* Filters */}
      <Accordion
        collapsible
        className={cn(['md:hidden', isFiltered && 'border-brand-blue'])}
        itemClassName='bg-almost-white'
        items={[
          {
            header: (
              <div className='flex items-center gap-2'>
                <TbListSearch className='text-2xl text-brand-blue-dark' />
                <span>Search and Filter</span>
              </div>
            ),
            content: FilterSection,
          },
        ]}
      />
      <div className='max-md:hidden'>{FilterSection}</div>

      {/* Results Count */}
      <p
        className={cn([
          'text-brand-gray-dark text-sm px-2 max-sm:-mb-2 sm:-my-4 max-sm:-mt-6 self-end',
          (!isFiltered || !foundCount) && 'sm:invisible max-sm:hidden',
        ])}
      >{`Found ${foundCount} of ${totalCount} post${totalCount === 1 ? '' : 's'}`}</p>

      {/* Posts */}
      {filteredPosts?.length ? (
        <div className='my-8__ md:my-12__ w-full'>
          {layout === 'grid' && (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center'>
              {(filteredPosts || [])?.map((post) => (
                <BlogPostCard key={post?._id} post={post} />
              ))}
            </div>
          )}

          {layout === 'list' && (
            <div className='flex flex-col gap-10 sm:gap-8'>
              {(filteredPosts || [])?.map((post) => (
                <>
                  <BlogPostOverview key={post?._id} post={post} />
                  <span
                    aria-hidden
                    className='h-px w-full max-sm:w-2/3 border-b mx-auto sm:hidden last:hidden'
                  />
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='my-8 flex flex-col items-center gap-6'>
          <NoResults
            title={`We couldn't find any${tagFilter ? ` ${tagFilter}` : ''} posts.`}
            subtitle='📝'
            description="But check back soon, as we're always adding new content!"
          />
          {posts?.length || isFiltered ? (
            <button
              type='button'
              className='text-brand-blue bg-almost-white py-4 sm:py-2 w-full sm:w-fit px-4 hover:text-brand-blue-dark transition border rounded'
              onClick={() => resetAllFilters()}
            >
              Show all posts
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default BlogPosts
