
import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiShoppingCart,
  FiRefreshCw,
} from "react-icons/fi";
import { NewDataContext } from "../context/NewDataContext";
import { CartContext } from "../context/CartContext";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const context = useContext(NewDataContext);
  const cartContext = useContext(CartContext);

  if (!context) {
    throw new Error("CategoryProduct must be inside NewDataProvider.");
  }

  if (!cartContext) {
    throw new Error("CategoryProduct must be inside CartProvider.");
  }

  const { data = [], loading, error, fetchAllProducts } = context;
  const { cartItem = [], addToCart } = cartContext;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [message, setMessage] = useState("");

  const categorySlug = decodeURIComponent(category || "all")
    .replace(/-/g, " ")
    .trim()
    .toLowerCase();

  const categoryName = useMemo(() => {
    if (categorySlug === "all" || categorySlug === "all products") {
      return "All Products";
    }

    return categorySlug.replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
  }, [categorySlug]);

  const cartCount = cartItem.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    let result = data.filter((product) => {
      const name = String(
        product.name || product.title || ""
      ).toLowerCase();

      const description = String(
        product.description || ""
      ).toLowerCase();

      const productCategory = String(
        product.category || ""
      ).toLowerCase();

      const matchesSearch =
        name.includes(searchText) ||
        description.includes(searchText) ||
        productCategory.includes(searchText);

      const matchesCategory =
        categorySlug === "all" ||
        categorySlug === "all products" ||
        productCategory === categorySlug;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sort === "high") {
      result = [...result].sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else if (sort === "name") {
      result = [...result].sort((a, b) =>
        String(a.name || a.title || "").localeCompare(
          String(b.name || b.title || "")
        )
      );
    }

    return result;
  }, [data, categorySlug, search, sort]);

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
    const productId = getProductId(product);

    const cartProduct = {
      ...product,
      id: productId,
      source: "dummyjson",
      name: product.name || product.title || "Product",
      image: getProductImage(product),
      price: Number(product.price) || 0,
      quantity: 1,
    };

    addToCart(cartProduct);
    setMessage(`${cartProduct.name} added to cart!`);
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <main className="storefront-page storefront-page--category min-h-screen bg-[#F7FAF8] px-4 py-8 text-[#171717] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#087F5B] hover:text-[#087F5B] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Category Header */}
        <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#087F5B]">
            Find Your Favourites
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore our collection and find the right product for you.
              </p>

              <div className="mt-4 h-1 w-14 rounded-full bg-[#087F5B]" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#E8F3ED] px-4 py-2 text-sm font-bold text-[#066548]">
                {filteredProducts.length} Products
              </span>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2"
              >
                <FiShoppingCart />
                Cart ({cartCount})
              </button>
            </div>
          </div>
        </section>

        {/* Search and Sorting */}
        <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
            />
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
          >
            <option value="default">Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </section>

        {/* Success Message */}
        {message && (
          <div
            role="status"
            className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-[#B8E3CF] bg-[#E8F3ED] px-4 py-3 text-sm text-[#066548]"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#087F5B] text-xs font-bold text-white">
                ✓
              </span>
              {message}
            </span>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-xl font-semibold transition hover:text-black"
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E8F3ED] border-t-[#087F5B]" />

            <p className="text-sm font-medium text-gray-500">
              Loading products...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-2xl border border-red-200 bg-white px-5 py-16 text-center">
            <h2 className="text-lg font-bold text-gray-900">
              Unable to load products
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {String(error)}
            </p>

            <button
              type="button"
              onClick={fetchAllProducts}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066548]"
            >
              <FiRefreshCw />
              Try Again
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Product Grid */
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const productName =
                product.name || product.title || "Product";

              const productImage = getProductImage(product);
              const productId = getProductId(product);

              return (
                <article
                  key={productId}
                  className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#B8E3CF] hover:shadow-lg hover:shadow-[#087F5B]/5"
                >
                  <Link
                    to={`/single-product/${productId}`}
                    className="block"
                    aria-label={`View ${productName}`}
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
                          No image available
                        </div>
                      )}

                      <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-md border border-gray-100 bg-white/95 px-2 py-1 text-[10px] font-semibold capitalize text-gray-600 shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                        {product.category || "Other"}
                      </span>
                    </div>
                  </Link>

                  <div className="p-3 sm:p-4">
                    <Link
                      to={`/single-product/${productId}`}
                      className="transition hover:text-[#087F5B]"
                    >
                      <h2
                        title={productName}
                        className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#171717] sm:text-base"
                      >
                        {productName}
                      </h2>
                    </Link>

                    {product.rating != null && (
                      <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#087F5B]">
                        <span aria-hidden="true">★</span>
                        {typeof product.rating === "object"
                          ? Number(product.rating.rate || 0).toFixed(1)
                          : Number(product.rating || 0).toFixed(1)}
                      </p>
                    )}

                    <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-extrabold text-[#087F5B] sm:text-base">
                        ${formatPrice(product.price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#087F5B] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2 sm:w-auto sm:text-sm"
                      >
                        <FiShoppingCart />
                        Add Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* No Products Found */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3ED] text-[#087F5B]">
              <FiSearch className="h-6 w-6" />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              No products match this category or search. Try a different
              search term or browse all products.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSort("default");
                navigate("/category/all");
              }}
              className="mt-5 rounded-lg bg-[#087F5B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066548]"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryProduct;
