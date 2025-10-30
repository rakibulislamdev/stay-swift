import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/filter/Filter";
import Search from "@/components/search/Search";

const refinedCategory = (category) => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") {
    return "";
  }
  return decodedCategory;
};

const refinedPriceRange = (priceRange) => {
  const decodedPriceRange = decodeURI(priceRange);
  if (decodedPriceRange === "undefined") return "";
  return decodedPriceRange;
};

export default async function HotelListPage({ searchParams }) {
  const params = await searchParams;
  const { destination, checkin, checkout, category, priceRange, sort } = params;

  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={refinedCategory(category)}
            priceRange={refinedPriceRange(priceRange)}
            sort={sort}
          />
        </div>
      </section>
    </>
  );
}
