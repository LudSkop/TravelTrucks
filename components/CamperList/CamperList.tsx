"use client";

import css from "./CamperList.module.css";
import Image from "next/image";
import Link from "next/link";
import { Camper } from "@/types/camper";

type CamperListProps = {
  campers: Camper[];
};

const DESCRIPTION_LIMIT = 50;

function truncate(text: string, limit: number) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
}

function formatLabel(value: string) {
  return value
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getCamperTags(camper: Camper) {
  return [
    {
      label: formatLabel(camper.engine),
      icon: "/images/colonc.svg",
    },
    {
      label: formatLabel(camper.transmission),
      icon: "/images/engine.svg",
    },
    {
      label: formatLabel(camper.form),
      icon: "/images/transm.svg",
    },
  ];
}
export default function CamperList({ campers }: CamperListProps) {
  return (
    <section className={css.grid}>
      {campers.map((camper) => (
        <div key={camper.id} className={css.card}>
          <div className={css.imageWrap}>
            <Image
              src={camper.coverImage}
              alt={camper.name}
              width={292}
              height={320}
            />
          </div>

          <div className={css.content}>
            <div className={css.headerRow}>
              <h2 className={css.name}>{camper.name}</h2>
              <span className={css.price}>€{camper.price}</span>
            </div>

            <div className={css.metaRow}>
              <span className={css.rating}>
                <Image
                  src="/images/star.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>

              <span className={css.location}>
                <Image
                  src="/images/map.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                {camper.location}
              </span>
            </div>

            <p className={css.description}>
              {truncate(camper.description, DESCRIPTION_LIMIT)}
            </p>

            <div className={css.tags}>
              {getCamperTags(camper).map((tag) => (
                <span key={tag.label} className={css.tag}>
                  <Image
                    src={tag.icon}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                  {tag.label}
                </span>
              ))}
            </div>
            <Link href="/catalog" className={css.showMore}>
              Show more
            </Link>
          </div>
        </div>
      ))}
      <button className={css.loadMore}>Load More</button>
    </section>
  );
}
