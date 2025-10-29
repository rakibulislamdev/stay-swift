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
    const priceRange = params.get("priceRange");

    if (priceRange) {
      const decodedPriceRange = decodeURI(priceRange);
      const queryInPriceRange = decodedPriceRange.split("|");
      setQuery(queryInPriceRange);
    }
  }, []);

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
        <label htmlFor="100-499">
          <input
            onChange={handleChange}
            checked={query.includes("100-499")}
            type="checkbox"
            name="100-499"
            id="100-499"
          />
          $ 100 - $ 499
        </label>

        <label htmlFor="500-999">
          <input
            onChange={handleChange}
            checked={query.includes("500-999")}
            type="checkbox"
            name="500-999"
            id="500-999"
          />
          $ 500 - $ 999
        </label>

        <label htmlFor="1000-1499">
          <input
            onChange={handleChange}
            checked={query.includes("1000-1499")}
            type="checkbox"
            name="1000-1499"
            id="1000-1499"
          />
          $ 1000 - $ 1499
        </label>

        <label htmlFor="1500-1999">
          <input
            onChange={handleChange}
            checked={query.includes("1500-1999")}
            type="checkbox"
            name="1500-1999"
            id="1500-1999"
          />
          $ 1500 - $ 1999
        </label>

        <label htmlFor="2000-2499">
          <input
            onChange={handleChange}
            checked={query.includes("2000-2499")}
            type="checkbox"
            name="2000-2499"
            id="2000-2499"
          />
          $ 2000 - $ 2499
        </label>

        <label htmlFor="2500+">
          <input
            onChange={handleChange}
            checked={query.includes("2500+")}
            type="checkbox"
            name="2500+"
            id="2500+"
          />
          $ 2500+
        </label>
      </form>
    </div>
  );
}
