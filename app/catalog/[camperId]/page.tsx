import { notFound } from "next/navigation";
import Image from "next/image";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import { getCamperById, getCamperReviews } from "@/lib/campers";
import RatingStars from "@/components/RatingStars/RatingStars";
import BookingForm from "@/components/BookingForm/BookingForm";
import css from "./CamperDetailsPage.module.css";

type PageProps = {
  params: Promise<{ camperId: string }>;
};

export default async function CamperDetailsPage({ params }: PageProps) {
  const { camperId } = await params;

  let camper;
  let reviews;
  try {
    [camper, reviews] = await Promise.all([
      getCamperById(camperId),
      getCamperReviews(camperId),
    ]);
  } catch {
    notFound();
  }

  return (
    <div className={css.wrapper}>
      <div className={css.topRow}>
        <div className={css.galleryCol}>
          <CamperGallery gallery={camper!.gallery} />
        </div>

        <div className={css.infoCol}>
          <div className={css.infoCard}>
            <h1 className={css.name}>{camper!.name}</h1>
            <div className={css.meta}>
              <span className={css.metaItem}>
                <span className={css.star}>★</span>
                {camper!.rating}({camper!.totalReviews} Reviews)
              </span>
              <span className={css.metaItem}>
                <Image src="/images/map.svg" alt="" width={16} height={16} />
                {camper!.location}
              </span>
            </div>
            <p className={css.price}>€{camper!.price.toLocaleString()}</p>
            <p className={css.description}>{camper!.description}</p>
          </div>

          <div className={css.detailsCard}>
            <h2 className={css.detailsTitle}>Vehicle details</h2>
            <ul className={css.tags}>
              {[camper!.transmission, ...camper!.amenities, camper!.engine]
                .slice(0, 6)
                .map((tag, index) => (
                  <li key={`${tag}-${index}`} className={css.tag}>
                    {tag}
                  </li>
                ))}
            </ul>
            <dl className={css.specs}>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Form</dt>
                <dd className={css.specValue}>{camper!.form}</dd>
              </div>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Length</dt>
                <dd className={css.specValue}>{camper!.length}</dd>
              </div>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Width</dt>
                <dd className={css.specValue}>{camper!.width}</dd>
              </div>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Height</dt>
                <dd className={css.specValue}>{camper!.height}</dd>
              </div>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Tank</dt>
                <dd className={css.specValue}>{camper!.tank}</dd>
              </div>
              <div className={css.specRow}>
                <dt className={css.specLabel}>Consumption</dt>
                <dd className={css.specValue}>{camper!.consumption}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className={css.reviewsSection}>
        <h2 className={css.sectionTitle}>Reviews</h2>

        <div className={css.bottomRow}>
          <div className={css.reviewsCol}>
            {reviews!.map((review) => (
              <div key={review.id} className={css.reviewCard}>
                <div className={css.reviewHeader}>
                  <div className={css.avatar}>
                    {review.reviewer_name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className={css.reviewerName}>{review.reviewer_name}</p>
                    <RatingStars rating={review.reviewer_rating} />
                  </div>
                </div>
                <p className={css.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>

          <div className={css.bookingCol}>
            <BookingForm camperId={camperId} />
          </div>
        </div>
      </section>
    </div>
  );
}
