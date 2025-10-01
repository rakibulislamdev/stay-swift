import { auth } from "@/auth";
import PaymentForm from "@/components/payment/PaymentForm";
import { getHotelById, getUserByEmail } from "@/database/queries";
import { getDayDifference } from "@/utils/data-util";
import { redirect } from "next/navigation";

export default async function PaymentPage({ params, searchParams }) {
  const { id } = await params;
  const { checkin, checkout } = await searchParams;

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);
  const hotelInfo = await getHotelById(id, checkin, checkout);

  const sanitizedUser = {
    id: loggedInUser?.id,
    name: loggedInUser?.name,
    email: loggedInUser?.email,
  };

  const hasCheckInCheckout = checkin && checkout;
  let cost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;

  if (hasCheckInCheckout) {
    const days = getDayDifference(checkin, checkout);
    cost = cost * days;
  }

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo.name}</b> and base price is{" "}
          <b>${cost}</b>{" "}
          {hasCheckInCheckout && `for ${getDayDifference(checkin, checkout)} `}{" "}
          day(s)
        </p>
        <PaymentForm
          checkin={checkin}
          checkout={checkout}
          user={sanitizedUser}
          hotelInfo={hotelInfo}
          cost={cost}
        />
      </div>
    </section>
  );
}
