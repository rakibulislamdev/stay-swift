import { getReviewsForHotel } from "@/database/queries";
import Link from "next/link";

export default async function HotelReviewNumber({ id }) {
  const reviews = await getReviewsForHotel(id);

  return (
    <>
      {reviews?.length === 0 ? (
        <Link href="#" className="!underline">
          Be the first one to review
        </Link>
      ) : (
        <Link href={`/hotel/${id}/reviews`} className="!underline">
          {reviews?.length} Reviews
        </Link>
      )}
    </>
  );
}
