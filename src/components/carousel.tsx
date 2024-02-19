'use client'

import React, { Children, FC, ReactNode, useReducer } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useSwipeable } from 'react-swipeable'

import { cn } from '@/utils/style'

type Direction = 'PREV' | 'NEXT'

interface CarouselState {
  pos: number
  sliding: boolean
  dir: Direction
}

type CarouselAction =
  | { type: Direction; numItems: number }
  | { type: 'stopSliding' }

const getOrder = (index: number, pos: number, numItems: number) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos
}

const getInitialState = (numItems: number): CarouselState => ({
  pos: numItems - 1,
  sliding: false,
  dir: 'NEXT',
})

const Carousel: FC<{ children: ReactNode }> = (props) => {
  const numItems = Children.count(props.children)
  const [state, dispatch] = useReducer(reducer, getInitialState(numItems))

  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems })
    setTimeout(() => {
      dispatch({ type: 'stopSliding' })
    }, 50)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slide('NEXT'),
    onSwipedRight: () => slide('PREV'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const getTransformStyle = () => {
    let transformStyle = ''
    if (state?.sliding) {
      if (state?.dir === 'NEXT') transformStyle = 'translateX(calc(80%))'
      else if (state?.dir === 'PREV') transformStyle = 'translateX(calc(-80%))'
    } else transformStyle = 'translateX(0)'
    return transformStyle
  }

  const isActiveSlide = (index: number) => {
    if (state?.pos === numItems - 1) {
      if (index === 0) return true
      return false
    } else return index === state?.pos + 1
  }

  const count = Children?.count(props?.children)

  return (
    <div {...handlers} className='flex flex-col gap-4'>
      <div className='w-full overflow-hidden'>
        <div
          className={cn([
            'flex justify-end__ gap-4',
            count % 2 === 1 && 'justify-center',
          ])}
          style={{
            transform: getTransformStyle(),
            transition: state.sliding ? 'none' : 'transform 500ms ease',
          }}
        >
          {Children.map(props.children, (child, index) => (
            <div
              className={cn([
                'rounded',
                isActiveSlide(index) && !state?.sliding && 'shadow-xl',
              ])}
              style={{
                flex: '1 0 100%',
                flexBasis: '80%',
                order: getOrder(index, state.pos, numItems),
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className='flex justify-center gap-12 sm:gap-6'>
          <button
            type='button'
            className='text-almost-black max-sm:text-lg inline-block mt-5 active:relative active:top-0 p-2'
            onClick={() => slide('PREV')}
          >
            <SlArrowLeft />
          </button>
          <button
            type='button'
            className='text-almost-black max-sm:text-lg inline-block mt-5 active:relative active:top-0 p-2'
            onClick={() => slide('NEXT')}
          >
            <SlArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'PREV':
      return {
        ...state,
        dir: 'PREV',
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
      }
    case 'NEXT':
      return {
        ...state,
        dir: 'NEXT',
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
      }
    case 'stopSliding':
      return { ...state, sliding: false }
    default:
      return state
  }
}

export default Carousel
