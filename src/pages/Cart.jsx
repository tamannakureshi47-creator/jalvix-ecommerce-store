
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItem = [],
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  const getProductName = (item) =>
    item.name || item.title || "Product";

  const getProductImage = (item) =>
    item.image || item.thumbnail || item.images?.[0] || "";

  const formatPrice = (item, amount) => {
    const price = Number(amount) || 0;

    if (item?.source === "fakestore") {
      return `₹${(price * 85).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;
    }

    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getProductRoute = (item) =>
    `/single-product/${encodeURIComponent(item.id)}`;

  const subtotal =
    totalPrice ??
    cartItem.reduce(
      (sum, item) =>
        sum +
        (Number(item.price) || 0) *
          (Number(item.quantity) || 1),
      0
    );

  const itemCount =
    totalItems ??
    cartItem.reduce(
      (sum, item) => sum + (Number(item.quantity) || 1),
      0
    );

  const currencyItem =
    cartItem.find((item) => item.source === "fakestore") ||
    cartItem[0];

  const shipping = subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const formatTotal = (amount) =>
    currencyItem
      ? formatPrice(currencyItem, amount)
      : `$${Number(amount).toFixed(2)}`;

  return (
    <main className="storefront-page storefront-page--cart min-h-screen bg-[#F7FAF8] px-4 py-10 text-[#171717] sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#087F5B]">
            Your Shopping Bag
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            My Cart
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Review your items and get ready to checkout.
          </p>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#087F5B]" />
        </div>

        {cartItem.length === 0 ? (
          /* Empty Cart */
          <section className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F3ED] text-4xl text-[#087F5B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              You haven't added any products yet. Explore our
              collection and find something you love.
            </p>

            <Link
              to="/product"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2"
            >
              Continue Shopping
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-8">
            {/* Cart Items */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-5 sm:px-6">
                <div>
                  <h2 className="text-lg font-bold">
                    Cart Items
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Your selected products
                  </p>
                </div>

                <span className="rounded-full bg-[#E8F3ED] px-3 py-1.5 text-xs font-bold text-[#087F5B]">
                  {itemCount} items
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItem.map((item) => {
                  const name = getProductName(item);
                  const image = getProductImage(item);
                  const quantity = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;

                  return (
                    <article
                      key={item.id}
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
                    >
                      {/* Product Image */}
                      <Link
                        to={getProductRoute(item)}
                        className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7FAF8] p-3 sm:h-28 sm:w-28"
                        aria-label={`View ${name}`}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-contain transition duration-300 hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">
                        <Link
                          to={getProductRoute(item)}
                          className="text-base font-bold transition hover:text-[#087F5B] sm:text-lg"
                        >
                          {name}
                        </Link>

                        <p className="mt-1 text-sm capitalize text-gray-500">
                          {item.category || "Product"}
                        </p>

                        <p className="mt-3 text-base font-extrabold text-[#087F5B]">
                          {formatPrice(item, price)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-red-600"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, "decrease")
                            }
                            disabled={quantity <= 1}
                            aria-label={`Decrease ${name} quantity`}
                            className="flex h-10 w-10 items-center justify-center text-xl transition hover:bg-[#E8F3ED] hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            −
                          </button>

                          <span className="min-w-9 text-center text-sm font-bold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, "increase")
                            }
                            disabled={
                              item.stock != null &&
                              quantity >= Number(item.stock)
                            }
                            aria-label={`Increase ${name} quantity`}
                            className="flex h-10 w-10 items-center justify-center text-xl transition hover:bg-[#E8F3ED] hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[11px] uppercase tracking-wider text-gray-400">
                            Item Total
                          </p>
                          <p className="mt-1 text-base font-extrabold">
                            {formatPrice(item, price * quantity)}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Cart Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/60 p-4 sm:p-6">
                <Link
                  to="/product"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-[#087F5B]"
                >
                  <span aria-hidden="true">←</span>
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-semibold text-gray-500 transition hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Check your order details
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-[#171717]">
                    {formatTotal(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#171717]">
                    {shipping === 0 ? "FREE" : formatTotal(shipping)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Discount</span>
                  <span className="font-semibold text-[#087F5B]">
                    — 
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-bold">
                      Total
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight text-[#087F5B]">
                      {formatTotal(total)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Taxes and final delivery details may be confirmed at checkout.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#066548] focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:ring-offset-2"
              >
                Proceed to Checkout
                <span aria-hidden="true">→</span>
              </button>

              <Link
                to="/product"
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-[#087F5B] hover:text-[#087F5B]"
              >
                Continue Shopping
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#E8F3ED] p-3 text-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4 text-[#087F5B]"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                  />
                </svg>
                <p className="text-xs font-semibold text-[#066548]">
                  Secure Checkout
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
