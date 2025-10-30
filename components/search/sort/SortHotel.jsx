"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SortHotel() {
  const [sort, setSort] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setSort(value);
  };

  useEffect(() => {
    const sort = params.get("sort");
    if (sort) {
      setSort(sort);
    }
  }, []);

  useEffect(() => {
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [sort]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="highToLow">
          <input
            onChange={handleChange}
            checked={sort === "highToLow"}
            value="highToLow"
            type="radio"
            name="sortOption"
            id="highToLow"
          />
          Price High to Low
        </label>

        <label htmlFor="lowToHigh">
          <input
            onChange={handleChange}
            checked={sort === "lowToHigh"}
            value="lowToHigh"
            type="radio"
            name="sortOption"
            id="lowToHigh"
          />
          Price Low to high
        </label>
      </form>
    </div>
  );
}
