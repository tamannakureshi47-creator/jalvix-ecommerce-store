
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiSearch,
  FiSliders,
  FiRefreshCw,
} from "react-icons/fi";
import { NewDataContext } from "../context/NewDataContext";
import { CartContext } from "../context/CartContext";

function Product2() {
  const context = useContext(NewDataContext);
  const cartContext = useContext(CartContext);

  if (!context) {
    throw new Error("Product2 must be inside NewDataProvider.");
  }

  if (!cartContext) {
    throw new Error("Product2 must be inside CartProvider.");
  }

  const {
    data = [],
    loading,
    error,
    fetchAllProducts,
    categoryList = ["All"],
  } = context;

  const {
    cartItem = [],
    addToCart: addProductToCart,
  } = cartContext;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");

  const perPage = 6;

  const priceLimit = useMemo(() => {
    if (!data.length) return 1000;

    const highest = Math.max(
      ...data.map((product) => Number(product.price) || 0)
    );

    return Math.max(100, Math.ceil(highest / 100) * 100);
  }, [data]);

  useEffect(() => {
    if (data.length) {
      setMaxPrice(priceLimit);
    }
  }, [data, priceLimit]);

  useEffect(() => {
    if (category !== "All" && !categoryList.includes(category)) {
      setCategory("All");
      setPage(1);
    }
  }, [category, categoryList]);

  const cartCount = useMemo(
    () =>
      cartItem.reduce(
        (total, item) => total + (Number(item.quantity) || 1),
        0
      ),
    [cartItem]
  );

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    let result = data.filter((product) => {
      const productName = String(
        product.name || product.title || ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      const productCategory = String(
        product.category || ""
      ).toLowerCase();

      const matchesSearch =
        productName.includes(searchText) ||
        description.includes(searchText) ||
        productCategory.includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice =
        Number(product.price) <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === "low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sort === "high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || a.title || "").localeCompare(
          String(b.name || b.title || "")
        )
      );
    }

    return result;
  }, [data, search, category, maxPrice, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / perPage
  );

  const visibleProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(priceLimit);
    setSort("default");
    setPage(1);
    setMessage("");
  };

  const getProductId = (product) => {
    const id = String(product.id);
    return id.startsWith("dummy-") ? id : `dummy-${id}`;
  };

  const getProductImage = (product) =>
    product.image ||
    product.thumbnail ||
    product.images?.[0] ||
    "";

  const handleAddToCart = (product) => {
    const productName =
      product.name || product.title || "Product";

    const cartProduct = {
      ...product,
      id: getProductId(product),
      source: "dummyjson",
      name: productName,
      image: getProductImage(product),
      price: Number(product.price) || 0,
    };

    addProductToCart(cartProduct);
    setMessage(`${productName} added to cart!`);
  };

  const formatPrice = (price) =>
    `$${Number(price || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <main className="storefront-page storefront-page--collection min-h-screen bg-[#F7FAF8] text-[#171717]">
      {/* Page Header */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#087F5B]">
            Handpicked for You
          </p>

          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Explore Collection
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Discover quality products for your everyday style.
              </p>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#087F5B]" />
            </div>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 rounded-lg bg-[#E8F3ED] px-4 py-3 text-sm font-bold text-[#066548] transition hover:bg-[#D6EADF]"
            >
              <FiShoppingCart className="text-base" />
              {cartCount} in Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-8">
          {/* Filters Sidebar */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-extrabold">
                <FiSliders className="text-[#087F5B]" />
                Filters
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-[#087F5B] transition hover:text-[#066548]"
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <label
              htmlFor="product2-search"
              className="mb-2 block text-sm font-bold text-gray-800"
            >
              Search Products
            </label>

            <div className="mb-6 flex items-center gap-2 rounded-lg border border-gray-200 px-3 transition focus-within:border-[#087F5B] focus-within:ring-2 focus-within:ring-[#087F5B]/10">
              <FiSearch className="shrink-0 text-gray-400" />

              <input
                id="product2-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search products..."
                className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="mb-5 border-t border-gray-100" />

            {/* Categories */}
            <h3 className="mb-4 text-sm font-bold">
              Categories
            </h3>

            <div className="space-y-3">
              {categoryList.map((item) => (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center gap-2.5 text-sm transition ${
                    category === item
                      ? "font-semibold text-[#087F5B]"
                      : "text-gray-600 hover:text-[#087F5B]"
                  }`}
                >
                  <input
                    type="radio"
                    name="product2-category"
                    checked={category === item}
                    onChange={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                    className="h-4 w-4 accent-[#087F5B]"
                  />

                  <span className="capitalize">
                    {item === "All"
                      ? "All Products"
                      : item.replace(/-/g, " ")}
                  </span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="my-6 border-t border-gray-100" />

            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold">Price Range</h3>

              <span className="text-sm font-extrabold text-[#087F5B]">
                {formatPrice(maxPrice)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={priceLimit}
              step={Math.max(1, Math.ceil(priceLimit / 100))}
              value={Math.min(maxPrice, priceLimit)}
              onChange={(event) => {
                setMaxPrice(Number(event.target.value));
                setPage(1);
              }}
              aria-label="Maximum product price"
              className="w-full cursor-pointer accent-[#087F5B]"
            />

            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>$0</span>
              <span>{formatPrice(priceLimit)}</span>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 w-full rounded-lg bg-[#087F5B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Results */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-extrabold">
                  {category === "All" ? "All Products" : category}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} products found
                </p>
              </div>

              <select
                aria-label="Sort products"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              >
                <option value="default">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Cart Message */}
            {message && (
              <div
                role="status"
                className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-[#B8E3CF] bg-[#E8F3ED] px-4 py-3 text-sm text-[#066548]"
              >
                <span>{message}</span>

                <button
                  type="button"
                  onClick={() => setMessage("")}
                  className="text-xl font-bold"
                  aria-label="Dismiss message"
                >
                  ×
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E8F3ED] border-t-[#087F5B]" />

                <p className="text-sm text-gray-500">
                  Loading products...
                </p>
              </div>
            ) : error ? (
              /* Error State */
              <div className="rounded-2xl border border-red-200 bg-white px-5 py-12 text-center">
                <p className="text-sm text-red-600">
                  {String(error)}
                </p>

                <button
                  type="button"
                  onClick={fetchAllProducts}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066548]"
                >
                  <FiRefreshCw />
                  Try Again
                </button>
              </div>
            ) : visibleProducts.length > 0 ? (
              /* Product Grid */
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {visibleProducts.map((product) => {
                  const productName =
                    product.name || product.title || "Untitled Product";

                  const productImage = getProductImage(product);
                  const productId = getProductId(product);

                  const rating =
                    typeof product.rating === "object"
                      ? product.rating?.rate
                      : product.rating;

                  return (
                    <article
                      key={productId}
                      className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#B8E3CF] hover:shadow-lg hover:shadow-[#087F5B]/5"
                    >
                      <Link
                        to={`/single-product/${encodeURIComponent(productId)}`}
                        className="block"
                      >
                        <div className="relative aspect-square overflow-hidden bg-[#F7FAF8] p-3 sm:p-5">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productName}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                              className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-center text-xs text-gray-400 sm:text-sm">
                              Image unavailable
                            </div>
                          )}

                          <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-md border border-gray-100 bg-white/95 px-2 py-1 text-[10px] font-semibold capitalize text-gray-600 shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                            {(product.category || "Other").replace(
                              /-/g,
                              " "
                            )}
                          </span>
                        </div>

                        <div className="px-3 pt-3 sm:px-4">
                          <h3
                            title={productName}
                            className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#171717] transition group-hover:text-[#087F5B] sm:text-base"
                          >
                            {productName}
                          </h3>

                          {rating != null && (
                            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#087F5B]">
                              <span aria-hidden="true">★</span>
                              {Number(rating).toFixed(1)}
                              {product.reviews?.length
                                ? ` (${product.reviews.length} reviews)`
                                : ""}
                            </p>
                          )}

                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                            {product.description}
                          </p>
                        </div>
                      </Link>

                      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                        <span className="text-sm font-extrabold text-[#087F5B] sm:text-base">
                          {formatPrice(product.price)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="w-full rounded-lg bg-[#087F5B] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2 sm:w-auto sm:px-3 sm:text-sm"
                        >
                          <FiShoppingCart className="mr-1 inline" />
                          Add
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty Results */
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3ED] text-[#087F5B]">
                  <FiSearch className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  No products found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-[#087F5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066548]"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <nav
                aria-label="Product pagination"
                className="mt-8 flex flex-wrap justify-center gap-2"
              >
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((current) => current - 1)
                  }
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-[#087F5B] hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-current={page === number ? "page" : undefined}
                    onClick={() => setPage(number)}
                    className={`h-10 w-10 rounded-lg text-sm font-bold transition ${
                      page === number
                        ? "bg-[#087F5B] text-white"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-[#087F5B] hover:text-[#087F5B]"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((current) => current + 1)
                  }
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-[#087F5B] hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product2;
