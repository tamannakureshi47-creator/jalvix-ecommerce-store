
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiShoppingCart,
  FiArrowLeft,
  FiCheck,
  FiPackage,
  FiShield,
} from "react-icons/fi";

import { DataContext } from "../context/DataContext";
import { NewDataContext } from "../context/NewDataContext";
import { CartContext } from "../context/CartContext";

function SingleProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const fakeStoreContext = useContext(DataContext);
  const dummyJsonContext = useContext(NewDataContext);
  const cartContext = useContext(CartContext);

  const fakeStoreData = fakeStoreContext?.data ?? [];
  const dummyJsonData = dummyJsonContext?.data ?? [];

  const fakeStoreLoading = fakeStoreContext?.loading ?? false;
  const dummyJsonLoading = dummyJsonContext?.loading ?? false;

  const fakeStoreError = fakeStoreContext?.error ?? "";
  const dummyJsonError = dummyJsonContext?.error ?? "";

  const { cartItem = [], addToCart } = cartContext ?? {};

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Identify the product API.
  const productSource = useMemo(() => {
    if (String(id).startsWith("fs-")) return "fakestore";
    if (String(id).startsWith("dummy-")) return "dummyjson";
    return "";
  }, [id]);

  const rawProductId = useMemo(
    () => String(id).replace(/^(fs-|dummy-)/, ""),
    [id]
  );

  // Find the product in its original API.
  const product = useMemo(() => {
    if (!productSource) return undefined;

    if (productSource === "fakestore") {
      return fakeStoreData.find(
        (item) =>
          String(item.id).replace(/^fs-/, "") === rawProductId
      );
    }

    return dummyJsonData.find(
      (item) =>
        String(item.id).replace(/^dummy-/, "") === rawProductId
    );
  }, [
    productSource,
    rawProductId,
    fakeStoreData,
    dummyJsonData,
  ]);

  const loading =
    productSource === "fakestore"
      ? fakeStoreLoading
      : productSource === "dummyjson"
        ? dummyJsonLoading
        : false;

  const error =
    productSource === "fakestore"
      ? fakeStoreError
      : productSource === "dummyjson"
        ? dummyJsonError
        : "";

  // Product images.
  const productImages = useMemo(() => {
    if (!product) return [];

    return [
      ...new Set(
        [
          product.image,
          product.thumbnail,
          ...(Array.isArray(product.images) ? product.images : []),
        ].filter(Boolean)
      ),
    ];
  }, [product]);

  const mainImage = productImages.includes(selectedImage)
    ? selectedImage
    : productImages[0] || "";

  // Product details.
  const productName = product?.name || product?.title || "Product";
  const price = Number(product?.price) || 0;

  const ratingValue =
    typeof product?.rating === "object"
      ? product.rating?.rate
      : product?.rating;

  const rating = Number(ratingValue);
  const hasRating = Number.isFinite(rating) && rating > 0;

  const hasStockInfo = product?.stock != null;
  const stock = hasStockInfo ? Number(product.stock) : null;

  const maxQuantity = hasStockInfo
    ? Math.max(0, Math.min(99, stock || 0))
    : 99;

  const discount = Math.min(
    100,
    Math.max(0, Number(product?.discountPercentage) || 0)
  );

  const originalPrice =
    discount > 0 && discount < 100
      ? price / (1 - discount / 100)
      : price;

  // FakeStore prices are shown in INR; DummyJSON in USD.
  const displayPrice = (amount) =>
    productSource === "fakestore" ? amount * 85 : amount;

  const formatDisplayPrice = (amount) => {
    const value = displayPrice(amount);

    if (productSource === "fakestore") {
      return `₹${Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;
    }

    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const cartCount = cartItem.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  useEffect(() => {
    setQuantity(1);
    setSelectedImage("");
    setMessage("");
  }, [id]);

  // Add to shared cart.
  const handleAddToCart = () => {
    if (!product) return;

    if (typeof addToCart !== "function") {
      setMessageType("error");
      setMessage("Cart is unavailable. Please refresh the page.");
      return;
    }

    if (hasStockInfo && maxQuantity === 0) {
      setMessageType("error");
      setMessage("This product is out of stock.");
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > maxQuantity
    ) {
      setMessageType("error");
      setMessage("Please select a valid quantity.");
      return;
    }

    const productId =
      productSource === "fakestore"
        ? `fs-${rawProductId}`
        : `dummy-${rawProductId}`;

    const existingItem = cartItem.find(
      (item) =>
        String(item.id) === productId &&
        item.source === productSource
    );

    const currentQuantity = Number(existingItem?.quantity) || 0;

    if (
      hasStockInfo &&
      currentQuantity + quantity > maxQuantity
    ) {
      setMessageType("error");
      setMessage(
        `Only ${Math.max(
          0,
          maxQuantity - currentQuantity
        )} more item(s) can be added.`
      );
      return;
    }

    addToCart({
      ...product,
      id: productId,
      source: productSource,
      name: productName,
      image: mainImage,
      price,
      quantity,
    });

    setMessageType("success");
    setMessage("Product added to your cart successfully!");
  };

  // Loading state.
  if (loading && !product) {
    return (
      <main className="storefront-page storefront-page--product flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 h-11 w-11 animate-spin rounded-full border-4 border-[#E8F3ED] border-t-[#087F5B]" />
          <h2 className="text-lg font-bold text-[#171717]">
            Loading Product
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load the product details.
          </p>
        </div>
      </main>
    );
  }

  // API error state.
  if (error && !product && !loading) {
    return (
      <main className="storefront-page storefront-page--product flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FiPackage size={28} />
        </div>

        <h1 className="text-2xl font-extrabold text-[#171717]">
          Unable to Load Products
        </h1>

        <p className="max-w-md text-sm leading-6 text-gray-500">
          {String(error)}
        </p>

        <button
          type="button"
          onClick={() => {
            if (productSource === "fakestore") {
              fakeStoreContext?.fetchAllProducts?.();
            } else {
              dummyJsonContext?.fetchAllProducts?.();
            }
          }}
          className="rounded-xl bg-[#087F5B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#066548]"
        >
          Try Again
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              productSource === "fakestore" ? "/product" : "/product2"
            )
          }
          className="text-sm font-semibold text-[#087F5B] hover:underline"
        >
          Back to Products
        </button>
      </main>
    );
  }

  // Product not found.
  if (!product) {
    return (
      <main className="storefront-page storefront-page--product flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3ED] text-[#087F5B]">
          <FiShoppingCart size={27} />
        </div>

        <h1 className="text-2xl font-extrabold text-[#171717]">
          Product Not Found
        </h1>

        <p className="max-w-md text-sm leading-6 text-gray-500">
          This product was not found in the selected collection.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(
              productSource === "fakestore"
                ? "/product"
                : productSource === "dummyjson"
                  ? "/product2"
                  : "/"
            )
          }
          className="rounded-xl bg-[#087F5B] px-6 py-3 font-bold text-white transition hover:bg-[#066548]"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="storefront-page storefront-page--product min-h-screen bg-white px-4 py-8 text-[#171717] sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1300px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition hover:text-[#087F5B]"
          >
            Home
          </button>

          <span>/</span>

          <button
            type="button"
            onClick={() =>
              navigate(
                productSource === "fakestore" ? "/product" : "/product2"
              )
            }
            className="transition hover:text-[#087F5B]"
          >
            Products
          </button>

          <span>/</span>

          <span className="max-w-48 truncate font-medium text-[#171717]">
            {productName}
          </span>
        </nav>

        {/* Back and Cart */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#087F5B]"
          >
            <FiArrowLeft size={17} />
            Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-bold transition hover:border-[#087F5B] hover:text-[#087F5B]"
          >
            <FiShoppingCart size={17} />
            Cart ({cartCount})
          </button>
        </div>

        <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Product Gallery */}
          <div className="min-w-0">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-[#F5F8F6] p-6 sm:min-h-[480px] sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#087F5B]/5 blur-3xl" />

              {mainImage ? (
                <img
                  key={mainImage}
                  src={mainImage}
                  alt={productName}
                  className="relative h-72 w-full object-contain transition duration-500 hover:scale-105 sm:h-[420px]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <p className="text-sm text-gray-400">
                  No image available
                </p>
              )}

              {discount > 0 && (
                <span className="absolute left-5 top-5 rounded-full bg-[#087F5B] px-4 py-2 text-xs font-bold text-white">
                  {Math.round(discount)}% OFF
                </span>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={mainImage === image}
                    className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition ${
                      mainImage === image
                        ? "border-[#087F5B] ring-2 ring-[#087F5B]/15"
                        : "border-gray-200 hover:border-[#087F5B]/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex min-w-0 flex-col gap-5">
            <span className="w-fit rounded-full bg-[#E8F3ED] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#066548]">
              {String(product.category || "Featured Product").replace(
                /-/g,
                " "
              )}
            </span>

            <div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {productName}
              </h1>

              {product.brand && (
                <p className="mt-3 text-sm text-gray-500">
                  Brand:{" "}
                  <span className="font-semibold text-gray-700">
                    {product.brand}
                  </span>
                </p>
              )}
            </div>

            {hasRating && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg text-amber-500">★</span>
                <span className="text-sm font-bold">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">/ 5 rating</span>
              </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-[#087F5B]">
                {formatDisplayPrice(price)}
              </span>

              {discount > 0 && discount < 100 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatDisplayPrice(originalPrice)}
                  </span>

                  <span className="rounded-lg bg-[#E8F3ED] px-3 py-1.5 text-xs font-bold text-[#066548]">
                    Save {Math.round(discount)}%
                  </span>
                </>
              )}
            </div>

            <div className="border-t border-gray-100" />

            {/* Description */}
            <div>
              <h2 className="mb-3 text-base font-bold">
                Product Description
              </h2>

              <p className="text-sm leading-7 text-gray-500">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Stock */}
            {hasStockInfo && (
              <p
                className={`flex items-center gap-2 text-sm font-semibold ${
                  stock > 0 ? "text-[#087F5B]" : "text-red-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    stock > 0 ? "bg-[#087F5B]" : "bg-red-500"
                  }`}
                />
                {stock > 0 ? `${stock} items in stock` : "Out of stock"}
              </p>
            )}

            {/* Quantity */}
            <div>
              <label
                htmlFor="product-quantity"
                className="mb-3 block text-sm font-bold"
              >
                Quantity
              </label>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="px-4 py-2.5 text-lg transition hover:bg-[#E8F3ED] disabled:opacity-40"
                >
                  −
                </button>

                <input
                  id="product-quantity"
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={quantity}
                  onChange={(event) => {
                    const value = Number(event.target.value);

                    if (
                      Number.isInteger(value) &&
                      value >= 1 &&
                      value <= maxQuantity
                    ) {
                      setQuantity(value);
                    }
                  }}
                  className="w-16 border-x border-gray-200 py-2.5 text-center text-sm font-bold outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(maxQuantity, current + 1)
                    )
                  }
                  disabled={quantity >= maxQuantity}
                  aria-label="Increase quantity"
                  className="px-4 py-2.5 text-lg transition hover:bg-[#E8F3ED] disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between rounded-2xl border border-[#087F5B]/10 bg-[#E8F3ED]/60 px-5 py-4">
              <span className="text-sm font-medium text-gray-600">
                Total Price
              </span>

              <span className="text-2xl font-extrabold text-[#087F5B]">
                {formatDisplayPrice(price * quantity)}
              </span>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={maxQuantity === 0}
              className="w-full rounded-xl bg-[#087F5B] px-6 py-4 font-bold text-white shadow-sm transition hover:bg-[#066548] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#087F5B]/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiShoppingCart className="mr-2 inline" size={18} />
              {maxQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* Feedback */}
            {message && (
              <div
                role="status"
                className={`flex flex-wrap items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "bg-[#E8F3ED] text-[#066548]"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {messageType === "success" && <FiCheck size={17} />}
                <span>{message}</span>

                {messageType === "success" && (
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="font-bold underline underline-offset-2"
                  >
                    View Cart
                  </button>
                )}
              </div>
            )}

            {/* Service Information */}
            <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F3ED] text-[#087F5B]">
                  <FiPackage size={19} />
                </span>

                <div>
                  <p className="text-sm font-bold">Quality Products</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Carefully selected products
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F3ED] text-[#087F5B]">
                  <FiShield size={19} />
                </span>

                <div>
                  <p className="text-sm font-bold">Customer Support</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    We are here to help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SingleProduct;
