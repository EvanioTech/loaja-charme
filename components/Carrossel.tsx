

"use client";

import { useRef } from "react";

export function Carrossel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative mt-10">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 z-10"
      >
        ←
      </button>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth ml-5 md:justify-center"
      >
        <article className="min-w-[250px] bg-white rounded-2xl p-4 h-60">
          Produto 1
        </article>

        <article className="min-w-[250px] bg-white rounded-2xl p-4 h-60">
          Produto 2
        </article>

        <article className="min-w-[250px] bg-white rounded-2xl p-4 h-60">
          Produto 3
        </article>
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 z-10"
      >
        →
      </button>
    </div>
  );
}