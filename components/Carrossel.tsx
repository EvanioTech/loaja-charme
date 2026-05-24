"use client"

import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './CarrosselArrowButton'
import { DotButton, useDotButton } from './CarrosselDotButoon'
import { supabase } from '@/lib/supabase'

type SlideType = {
  src: string
  alt: string
}

type PropType = {
  options?: EmblaOptionsType
}

const Carrossel = ({ options }: PropType) => {
  const [slides, setSlides] = useState<SlideType[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    async function buscarBanners() {
      const { data } = await supabase
        .from('banners')
        .select('*')
        .order('ordem', { ascending: true })

      if (data) {
        setSlides(data.map(b => ({ src: b.imagem_url, alt: 'Banner Charme Chicc' })))
      }
    }
    buscarBanners()
  }, [])

  if (slides.length === 0) return null

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
          <PrevButton onClick={onPrevButtonClick} />
          <NextButton onClick={onNextButtonClick} />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carrossel