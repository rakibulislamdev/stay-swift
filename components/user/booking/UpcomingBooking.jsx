import BookingCard from "./BookingCard";

export default function UpcomingBooking({ bookings, type }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcomming Bookings</h2>

      {bookings &&
        bookings.length > 0 &&
        bookings.map((booking) => (
          <div
            key={booking.id}
            className={`${
              type === "upcoming" && "bg-[#c8fa9977] p-4 rounded-md"
            }`}
          >
            <BookingCard
              hotelId={booking.hotelId}
              checkin={booking.checkin}
              checkout={booking.checkout}
            />
          </div>
        ))}
    </div>
  );
}
