"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";

import { CamperImage } from "@/types/camper";
import css from "./CamperGallery.module.css";

type CamperGalleryProps = {
  gallery: CamperImage[];
};

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const sortedGallery = [...gallery].sort((a, b) => a.order - b.order);

  if (sortedGallery.length === 0) {
    return null;
  }

  return (
    <div className={css.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className={css.mainSwiper}
      >
        {sortedGallery.map((image) => (
          <SwiperSlide key={image.id} className={css.mainSlide}>
            <Image
              src={image.original}
              alt="Camper photo"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className={css.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        slidesPerView={4}
        spaceBetween={12}
        className={css.thumbsSwiper}
      >
        {sortedGallery.map((image) => (
          <SwiperSlide key={image.id} className={css.thumbSlide}>
            <Image
              src={image.thumb}
              alt="Camper thumbnail"
              fill
              sizes="150px"
              className={css.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
