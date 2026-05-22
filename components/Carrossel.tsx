"use client"

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './CarrosselArrowButton'
import { DotButton, useDotButton } from './CarrosselDotButoon'

type SlideType = {
  src: string
  alt: string
}

type PropType = {
  slides?: SlideType[]
  options?: EmblaOptionsType
}

const defaultSlides: SlideType[] = [
  { src: '/produtos/i1.webp', alt: 'Produto Charme Chicc 1' },
  { src: '/produtos/i2.webp', alt: 'Produto Charme Chicc 2' },
  { src: '/produtos/i3.webp', alt: 'Produto Charme Chicc 3' },
  { src: '/produtos/i4.webp', alt: 'Produto Charme Chicc 4' }
]

const Carrossel = (props: PropType) => {
  const { slides = defaultSlides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const { onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={slide.src}>
              <div className="embla__slide__number">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="embla__slide__image"
                  draggable="false"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            onPointerDown={onPrevButtonClick}
            onPointerDownCapture={onPrevButtonClick}
          />
          <NextButton
            onClick={onNextButtonClick}
            onPointerDown={onNextButtonClick}
            onPointerDownCapture={onNextButtonClick}
          />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carrossel
