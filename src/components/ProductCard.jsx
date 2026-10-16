
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { CartContext } from "../context/CartContext";

function ProductCard({ products = [] }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const originalPrice =
      product.source === "fakestore"
        ? (Number(product.price) || 0) / 85
        : Number(product.price) || 0;

    addToCart({
      ...product,
      price: originalPrice,
      originalPrice,
    });
  };

  const formatPrice = (price, source) => {
    return (Number(price) || 0).toLocaleString(
      source === "fakestore" ? "en-IN" : "en-US",
      { maximumFractionDigits: 2 }
    );
  };

  if (!products.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
        <FiShoppingCart className="mb-3 text-4xl text-gray-300" />
        <h3 className="text-lg font-bold text-[#171717]">
          No products found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const name =
          product.name || product.title || "Untitled Product";

        const image =
          product.image ||
          product.thumbnail ||
          product.images?.[0] ||
          "";

        const category = product.category || "General";

        const price = Number(product.price) || 0;

        const rating =
          Number(product.rating?.rate ?? product.rating) || 0;

        const reviews = product.rating?.count;

        const productLink = `/single-product/${encodeURIComponent(
          product.id
        )}`;

        return (
          <article
            key={product.id}
            className="storefront-product-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B]/30 hover:shadow-lg"
          >
            {/* Product Image */}
            <Link
              to={productLink}
              aria-label={`View ${name}`}
              className="block"
            >
              <div className="relative flex h-[300px] items-center justify-center overflow-hidden bg-[#F7F9F8] p-6 sm:h-[340px]">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";

                      const fallback =
                        event.currentTarget.parentElement?.querySelector(
                          ".image-fallback"
                        );

                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                ) : null}

                <div
                  className="image-fallback absolute inset-0 items-center justify-center bg-[#F7F9F8] text-sm text-gray-400"
                  style={{ display: image ? "none" : "flex" }}
                >
                  Image unavailable
                </div>

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-sm font-medium capitalize text-gray-700 shadow-sm">
                  {category}
                </span>
              </div>
            </Link>

            {/* Product Details */}
            <div className="flex flex-1 flex-col p-5">
              <Link to={productLink}>
                <h3
                  title={name}
                  className="line-clamp-1 text-lg font-bold text-[#171717] transition-colors group-hover:text-[#087F5B]"
                >
                  {name}
                </h3>
              </Link>

              {/* Rating */}
              {rating > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-[#087F5B]">
                  <FiStar className="fill-[#087F5B]" size={15} />
                  <span>{rating.toFixed(1)}</span>

                  {reviews != null && (
                    <span>({reviews} reviews)</span>
                  )}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>
              )}

              {/* Price and Add to Cart */}
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="shrink-0 whitespace-nowrap text-lg font-extrabold text-[#087F5B]">
                  {product.source === "fakestore" ? "₹" : "$"}
                  {formatPrice(price, product.source)}
                </span>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${name} to cart`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#087F5B] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#066548] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 active:scale-95"
                >
                  <FiShoppingCart size={17} />
                  Add
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductCard;
