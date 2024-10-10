'use client'

import { sortBy } from 'lodash'
import { FC, useState } from 'react'
import {
  FaRegCircleCheck,
  FaRegCircleXmark,
  FaRegCommentDots,
} from 'react-icons/fa6'
import { Recipe } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Button from '@/components/common/buttons/Button'
import Collapsible from '@/components/common/layout/collapsible'
import NoResults from '@/components/common/no-results'
import CommentForm from '@/components/features/user-generated/comment-form'
import UserPostComment from '@/components/features/user-generated/user-post-comment'

import { useTruncateArray } from '@/hooks/use-truncate-array'

type Props = {
  recipe: Recipe
}

const RecipeComments: FC<Props> = ({ recipe }) => {
  const [formActive, setFormActive] = useState(false)

  const comments = sortBy(
    recipe?.comments,
    (comment) => comment?._createdAt,
  )?.reverse()

  const {
    visibleArray: visibleComments,
    expanded,
    isLong,
    toggleExpand,
  } = useTruncateArray(comments)

  if (!recipe) return null

  return (
    <div className='flex flex-col gap-8'>
      {/* New Comment Form */}
      <Collapsible
        isOpen={formActive}
        setIsOpen={setFormActive}
        trigger={
          <Button
            onClick={() => {
              setFormActive((prev) => !prev)
            }}
            unstyled
          >
            <FaRegCommentDots />
            <span>Leave a comment</span>
          </Button>
        }
        triggerClassName={cn('sm:w-fit sm:self-end', [
          !formActive && 'btn',
          formActive && ' btn-text',
        ])}
      >
        <div className='border rounded p-4 pb-6 lg:py-8 w-full'>
          <CommentForm
            postType='recipe'
            postId={recipe?._id}
            onCancel={() => {
              setFormActive(false)
            }}
            displayOnSubmit={(_data, res) => {
              const Icon = res?.ok ? FaRegCircleCheck : FaRegCircleXmark
              const title = res?.ok
                ? 'Thanks!'
                : 'There was a problem posting your comment'
              const description = res?.ok
                ? 'Your comment is pending review and will appear shortly.'
                : 'Please try again.'

              if (res?.ok) {
                setTimeout(() => {
                  setFormActive(false)
                }, 4000)
              }

              return (
                <div
                  className={cn(
                    'flex gap-4 not-prose border rounded bg-white p-4',
                    [
                      res?.ok && 'border-emerald-600 bg-emerald-50',
                      !res?.ok && 'border-rose-600 bg-rose-50',
                    ],
                  )}
                >
                  <Icon
                    aria-hidden
                    className={cn('flex-none text-2xl font-medium', [
                      res?.ok && 'text-emerald-600',
                      !res?.ok && 'text-rose-600',
                    ])}
                  />
                  <div role='alert' className='flex flex-col gap-1'>
                    <p className='leading-5 font-medium text-pretty'>{title}</p>
                    <p className='text-pretty'>{description}</p>
                  </div>
                </div>
              )
            }}
          />
        </div>
      </Collapsible>

      {/* Comments List */}
      {comments?.length ? (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col divide-y-1 rounded border px-2 not-prose bg-almost-white'>
            {visibleComments?.map((comment) => (
              <UserPostComment key={comment?._id} comment={comment} />
            ))}
          </div>
          {isLong ? (
            <Button
              aria-label='View more comments.'
              unstyled
              className='whitespace-nowrap btn-outline flex items-center w-fit self-center py-2 sm:p-1'
              onClick={() => {
                toggleExpand()
              }}
            >
              <span>{expanded ? 'View less' : 'View more'}</span>
            </Button>
          ) : null}
        </div>
      ) : (
        <div className={cn('mx-auto', [formActive && 'hidden'])}>
          <NoResults
            title='No Comments'
            subtitle=''
            description={
              <Button
                className='btn-text'
                unstyled
                onClick={() => {
                  setFormActive((prev) => !prev)
                }}
              >
                Be the first to comment!
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}

export default RecipeComments
