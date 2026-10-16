
import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

const ProductListView = ({ product }) => {
  const dummyProduct = product || {
    id: 1,
    title: "Sample Product 1",
    price: 49.9,
    image:
      "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&q=80",
  };

  const productId = dummyProduct.id;
  const productTitle =
    dummyProduct.title || dummyProduct.name || "Untitled Product";

  const productImage =
    dummyProduct.image ||
    dummyProduct.thumbnail ||
    dummyProduct.images?.[0] ||
    "";

  const productPrice = Number(dummyProduct.price) || 0;

  return (
    <article className="storefront-product-row mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#087F5B]/20 hover:shadow-md">
      <div className="flex items-center gap-4 p-3 sm:gap-5 sm:p-4">
        {/* Product Image */}
        <Link
          to={`/single-product/${encodeURIComponent(productId)}`}
          aria-label={`View ${productTitle}`}
          className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-28 sm:w-28"
        >
          {productImage ? (
            <img
              src={productImage}
              alt={productTitle}
              loading="lazy"
              className="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback =
                  event.currentTarget.parentElement?.querySelector(
                    ".product-list-fallback"
                  );

                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}

          <span
            className="product-list-fallback hidden h-full w-full items-center justify-center px-2 text-center text-xs text-gray-400"
            style={{ display: productImage ? "none" : "flex" }}
          >
            Image unavailable
          </span>
        </Link>

        {/* Product Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <Link
            to={`/single-product/${encodeURIComponent(productId)}`}
            className="group inline-flex min-w-0 items-start gap-2"
          >
            <h2 className="line-clamp-2 text-sm font-bold leading-6 text-[#171717] transition-colors group-hover:text-[#087F5B] sm:text-base">
              {productTitle}
            </h2>
          </Link>

          {dummyProduct.category && (
            <p className="mt-1 line-clamp-1 text-xs capitalize text-gray-500 sm:text-sm">
              {dummyProduct.category}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-lg font-extrabold text-[#087F5B] sm:text-xl">
              ₹
              {productPrice.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </p>

            <Link
              to={`/single-product/${encodeURIComponent(productId)}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E8F3ED] px-3 py-2 text-xs font-bold text-[#087F5B] transition-all duration-200 hover:bg-[#087F5B] hover:text-white sm:text-sm"
            >
              View Details
              <FiArrowRight size={15} />
            </Link>
          </div>
        </div>

        <FiShoppingBag
          aria-hidden="true"
          className="hidden shrink-0 text-xl text-[#087F5B] sm:block"
        />
      </div>
    </article>
  );
};

export default ProductListView;
