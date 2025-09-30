import { getRatingForHotel } from "@/database/queries";

export default async function HotelRatings({ id }) {
  const ratings = await getRatingForHotel(id);

  const getRatingDescriptions = (avgRating) => {
    if (avgRating === 0) {
      return "No Ratings Available";
    } else if (avgRating > 0 && avgRating <= 2) {
      return "Poor";
    } else if (avgRating > 2 && avgRating <= 3) {
      return "Average";
    } else if (avgRating > 3 && avgRating <= 4) {
      return "Good";
    } else if (avgRating > 4 && avgRating <= 5) {
      return "Very Good";
    }
  };

  let avgRating = 0;

  if (ratings.length === 1) {
    avgRating = ratings[0].rating;
  }

  if (ratings.length > 1) {
    const totalRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    avgRating = totalRatings / ratings.length;
  }

  return (
    <>
      <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
        {avgRating}
      </div>
      <span className="font-medium">{getRatingDescriptions(avgRating)}</span>
    </>
  );
}
