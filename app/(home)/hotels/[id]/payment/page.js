import { auth } from "@/auth";
import PaymentForm from "@/components/payment/PaymentForm";
import { getUserByEmail } from "@/database/queries";
import { redirect } from "next/navigation";

export default async function PaymentPage({ params, searchParams }) {
  const { id } = await params;
  const { checkin, checkout } = await searchParams;

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>Effotel By Sayaji Jaipur</b> and base price is{" "}
          <b>$10</b>
        </p>
        <PaymentForm checkin={checkin} checkout={checkout} />
      </div>
    </section>
  );
}
