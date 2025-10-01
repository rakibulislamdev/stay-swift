"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentForm({
  checkin,
  checkout,
  user,
  cost,
  hotelInfo,
}) {
  const [error, setError] = useState(null);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const hotelId = hotelInfo?.id;
      const userId = user?.id;
      const checkin = formData.get("checkin");
      const checkout = formData.get("checkout");

      const response = await fetch("/api/auth/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId,
          userId,
          checkin,
          checkout,
        }),
      });

      response.status === 201 && router.push("/bookings");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }
  return (
    <form className="my-8" onSubmit={onSubmit}>
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={user?.name}
          readOnly
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user?.email}
          readOnly
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input
            type="date"
            name="checkin"
            value={checkin}
            readOnly
            id="checkin"
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input
            type="date"
            name="checkout"
            value={checkout}
            readOnly
            id="checkout"
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Pay Now (${cost})
      </button>
    </form>
  );
}
