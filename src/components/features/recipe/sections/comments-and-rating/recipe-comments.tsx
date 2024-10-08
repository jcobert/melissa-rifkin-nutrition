'use client'

import { sortBy } from 'lodash'
import { FC, useState } from 'react'
import { FaRegCommentDots } from 'react-icons/fa6'
import { Recipe } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import Button from '@/components/common/buttons/Button'
import Collapsible from '@/components/common/layout/collapsible'
import NoResults from '@/components/common/no-results'
import CommentForm from '@/components/features/user-generated/comment-form'
import UserPostComment from '@/components/features/user-generated/user-post-comment'

type Props = {
  recipe?: Recipe
}

const RecipeComments: FC<Props> = ({ recipe }) => {
  const [formActive, setFormActive] = useState(false)

  const comments = sortBy(
    recipe?.comments,
    (comment) => comment?._createdAt,
  )?.reverse()

  if (!recipe) return null

  return (
    <div className='flex flex-col gap-8 sm:gap-12__'>
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
          // formActive && 'btn-text',
          !formActive && 'btn-outline__ btn',
          formActive && 'hidden__ btn-text',
        ])}
        // className='gap-4'
      >
        <div className='border rounded rounded-b-none__ p-4 pb-6 lg:py-8 bg-almost-white__ w-full'>
          <CommentForm
            onSubmit={(data) => {
              console.log(data)
            }}
            onCancel={() => {
              setFormActive(false)
            }}
          />
        </div>
      </Collapsible>

      {/* Comments List */}
      {comments?.length ? (
        <div className='flex flex-col divide-y-1 rounded rounded-t-none__ border px-2 not-prose bg-almost-white'>
          {recipe?.comments?.map((comment) => (
            <UserPostComment key={comment?._id} comment={comment} />
          ))}
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
            // description='Be the first to comment!'
          />
        </div>
      )}
    </div>
  )
}

export default RecipeComments
