"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FilterByPriceRange() {
  const [query, setQuery] = useState([]);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const filtered = query.filter((item) => item !== name);
      setQuery(filtered);
    }

    console.log("query", query);
  };

  useEffect(() => {
    if (query.length > 0) {
      params.set("priceRange", encodeURI(query.join("|")));
    } else {
      params.delete("priceRange");
    }

    replace(`${pathName}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="13-30">
          <input
            onChange={handleChange}
            type="checkbox"
            name="13-30"
            id="13-30"
          />
          $ 13 - $ 30
        </label>

        <label htmlFor="30-60">
          <input
            onChange={handleChange}
            type="checkbox"
            name="30-60"
            id="30-60"
          />
          $ 30 - $ 60
        </label>

        <label htmlFor="60-97">
          <input
            onChange={handleChange}
            type="checkbox"
            name="60-97"
            id="60-97"
          />
          $ 60 - $ 97
        </label>

        <label htmlFor="97-152">
          <input
            onChange={handleChange}
            type="checkbox"
            name="97-152"
            id="97-152"
          />
          $ 97 - $ 152
        </label>

        <label htmlFor="152-182">
          <input
            onChange={handleChange}
            type="checkbox"
            name="152-182"
            id="152-182"
          />
          $ 152 - $ 182
        </label>

        <label htmlFor="182+">
          <input
            onChange={handleChange}
            type="checkbox"
            name="182+"
            id="182+"
          />
          $ 182+
        </label>
      </form>
    </div>
  );
}
