
import React, { useState, useContext, useMemo, useEffect } from "react";
import { FiSearch, FiSliders, FiShoppingBag } from "react-icons/fi";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { DataContext } from "../context/DataContext";

function Products() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Products must be inside DataProvider.");
  }

  const { data = [], loading, error, fetchAllProducts } = context;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(85000);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const allProducts = useMemo(() => {
    const categoryMap = {
      "men's clothing": "Men",
      "women's clothing": "Women",
      electronics: "Electronics",
      jewelery: "Jewelry",
    };

    return data.map((item) => ({
      ...item,
      id: String(item.id).startsWith("fs-") ? item.id : `fs-${item.id}`,
      source: "fakestore",
      name: item.name || item.title || "Untitled Product",
      category:
        categoryMap[String(item.category || "").toLowerCase()] ||
        item.category ||
        "Other",
      price: (Number(item.price) || 0) * 85,
      image: item.image || item.images?.[0] || "",
      rating: item.rating || 0,
    }));
  }, [data]);

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return allProducts.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const description = String(product.description || "").toLowerCase();
      const productCategory = String(product.category || "").toLowerCase();

      const matchSearch =
        name.includes(searchText) ||
        description.includes(searchText) ||
        productCategory.includes(searchText);

      const matchCategory =
        category === "All" || product.category === category;

      const matchPrice = product.price <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });
  }, [allProducts, search, category, maxPrice]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(85000);
    setCurrentPage(1);
  };

  return (
    <main className="storefront-page storefront-page--catalog min-h-screen overflow-hidden bg-white text-[#171717]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#E8F3ED]">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#087F5B]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#087F5B] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#087F5B]" />
            Discover Your Style
          </p>

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                Our <span className="text-[#087F5B]">Collection</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                Explore everyday essentials and find something you love.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#087F5B]/15 bg-white px-5 py-4 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F3ED] text-[#087F5B]">
                <FiShoppingBag size={20} />
              </span>

              <div>
                <p className="text-2xl font-extrabold">
                  {filteredProducts.length}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  Products available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Filters Sidebar */}
          <aside className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3ED] text-[#087F5B]">
                    <FiSliders size={18} />
                  </span>

                  <h2 className="text-lg font-bold">Filters</h2>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#087F5B] transition hover:text-[#066548] hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="p-5">
                <label
                  htmlFor="product-search"
                  className="mb-3 block text-sm font-semibold text-gray-800"
                >
                  Search Products
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3.5 transition focus-within:border-[#087F5B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#087F5B]/10">
                  <FiSearch className="shrink-0 text-gray-400" size={18} />

                  <input
                    id="product-search"
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="What are you looking for?"
                    className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
                  />
                </div>

                <div className="my-6 border-t border-gray-100" />

                <FilterSection
                  category={category}
                  setCategory={(value) => {
                    setCategory(value);
                    setCurrentPage(1);
                  }}
                  maxPrice={maxPrice}
                  setMaxPrice={(value) => {
                    setMaxPrice(Number(value));
                    setCurrentPage(1);
                  }}
                  embedded
                />
              </div>
            </div>
          </aside>

          {/* Product Results */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087F5B]">
                  Find Your Next Favourite
                </p>

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {category === "All" ? "All Products" : category}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Find the perfect pick for you.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F3ED] px-4 py-2 text-sm font-bold text-[#066548]">
                <span className="h-2 w-2 rounded-full bg-[#087F5B]" />
                {filteredProducts.length} results
              </span>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center">
                <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#E8F3ED] border-t-[#087F5B]" />

                <h3 className="text-lg font-bold">Loading Products...</h3>

                <p className="mt-2 text-sm text-gray-500">
                  Please wait while we load the collection.
                </p>
              </div>
            ) : error ? (
              /* API Error */
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-6 text-center">
                <h3 className="text-lg font-bold">
                  Unable to Load Products
                </h3>

                <p className="mt-2 text-sm text-red-600">
                  {String(error)}
                </p>

                <button
                  type="button"
                  onClick={fetchAllProducts}
                  className="mt-5 rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-4 focus:ring-[#087F5B]/20"
                >
                  Try Again
                </button>
              </div>
            ) : displayedProducts.length > 0 ? (
              <ProductCard products={displayedProducts} />
            ) : (
              /* Empty State */
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3ED] text-[#087F5B]">
                  <FiSearch size={27} />
                </div>

                <h3 className="text-xl font-bold">No Products Found</h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                  We couldn&apos;t find any products matching your filters.
                  Try another search or clear the filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-4 focus:ring-[#087F5B]/20"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-3 py-4 sm:px-5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Products;
