
import React, { useContext, useMemo } from "react";
import { DataContext } from "../context/DataContext";

function FilterSection({
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  embedded = false,
}) {
  const context = useContext(DataContext);
  const data = context?.data ?? [];

  // Dynamic categories from API
  const categories = useMemo(() => {
    const categoryMap = {
      "men's clothing": "Men",
      "women's clothing": "Women",
      electronics: "Electronics",
      jewelery: "Jewelry",
    };

    const uniqueCategories = [
      ...new Set(
        data
          .map((product) => {
            const originalCategory = product.category?.toLowerCase();
            return categoryMap[originalCategory] || product.category;
          })
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [data]);

  // Dynamic maximum price in INR
  const priceLimit = useMemo(() => {
    if (!data.length) return 1000;

    const highestPrice = Math.max(
      ...data.map((product) => Number(product.price) * 85 || 0)
    );

    return Math.max(50, Math.ceil(highestPrice / 50) * 50);
  }, [data]);

  const handlePriceChange = (value) => {
    setMaxPrice(Math.min(value, priceLimit));
  };

  return (
    <aside
      className={`storefront-filter w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 ${
        embedded ? "" : "lg:max-w-[300px]"
      }`}
    >
      {/* Category Filter */}
      <h3 className="mb-5 text-lg font-bold text-[#171717]">
        Category
      </h3>

      <div className="flex flex-col gap-1.5">
        {categories.map((item) => (
          <label
            key={item}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
              category === item
                ? "bg-[#E8F3ED] font-semibold text-[#087F5B]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#087F5B]"
            }`}
          >
            <input
              type="radio"
              name="product-category"
              checked={category === item}
              onChange={() => setCategory(item)}
              className="h-4 w-4 shrink-0 accent-[#087F5B]"
            />

            <span>{item}</span>

            {category === item && (
              <span className="ml-auto h-2 w-2 rounded-full bg-[#087F5B]" />
            )}
          </label>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />

      {/* Price Range */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-[#171717]">
          Price Range
        </h3>

        <span className="rounded-lg bg-[#E8F3ED] px-3 py-1.5 text-sm font-bold text-[#087F5B]">
          ₹{Number(maxPrice).toLocaleString("en-IN")}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={priceLimit}
        step={50}
        value={Math.min(Number(maxPrice), priceLimit)}
        onChange={(e) => handlePriceChange(Number(e.target.value))}
        aria-label="Maximum product price"
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#087F5B]"
        style={{
          accentColor: "#087F5B",
        }}
      />

      <div className="mt-3 flex items-center justify-between text-xs font-medium text-gray-500">
        <span>₹0</span>
        <span>₹{priceLimit.toLocaleString("en-IN")}</span>
      </div>
    </aside>
  );
}

export default FilterSection;
