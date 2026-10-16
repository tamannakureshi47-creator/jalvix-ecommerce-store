
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faShieldHalved,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import { DataContext } from "../context/DataContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarouselUI = () => {
  const context = useContext(DataContext);
  const data = context?.data ?? [];
  const navigate = useNavigate();

  const formatPrice = (price) =>
    (Number(price || 0) * 85).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  if (!data.length) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#087F5B]" />
          <p className="text-sm text-gray-500">
            Preparing your collection...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white px-3 py-4 sm:px-6 lg:px-8 lg:py-7">
      <Swiper
        key={data.length}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={0}
        navigation={{
          prevEl: ".carousel-prev",
          nextEl: ".carousel-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={data.length > 1}
        className="carousel-swiper mx-auto max-w-[1440px] overflow-hidden rounded-[22px] sm:rounded-[30px]"
      >
        {data.slice(0, 5).map((product, index) => (
          <SwiperSlide key={product.id}>
            <div className="relative grid min-h-[570px] overflow-hidden bg-white md:min-h-[590px] md:grid-cols-2">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full border border-[#087F5B]/10 sm:h-96 sm:w-96" />
              <div className="pointer-events-none absolute -left-12 -top-16 h-56 w-56 rounded-full border border-[#087F5B]/15 sm:h-72 sm:w-72" />

              {/* Product information */}
              <div className="relative z-10 flex flex-col justify-center px-6 pb-4 pt-12 sm:px-10 sm:py-14 lg:px-16 xl:px-20">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-9 bg-[#087F5B]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087F5B] sm:text-xs">
                    The Jalvix Edit
                  </span>
                </div>

                <p
                  key={`eyebrow-${product.id}`}
                  className="mb-4 text-sm font-medium text-gray-500 sm:text-base"
                >
                  Thoughtfully chosen. Made for everyday.
                </p>

                <h1
                  key={`title-${product.id}`}
                  className="carousel-hero-title max-w-xl break-words text-3xl font-extrabold leading-[1.13] tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl xl:text-[58px]"
                >
                  {product.title}
                </h1>

                <p
                  key={`description-${product.id}`}
                  className="mt-5 line-clamp-3 max-w-lg text-sm leading-7 text-gray-500 sm:text-base"
                >
                  {product.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Starting at
                  </span>

                  <span className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
                    ₹{formatPrice(product.price)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/single-product/${encodeURIComponent(product.id)}`
                      )
                    }
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#087F5B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#066548] hover:shadow-lg sm:px-7"
                  >
                    Shop this product
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/product")}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition duration-300 hover:-translate-y-1 hover:border-[#087F5B] hover:text-[#087F5B] sm:px-7"
                  >
                    Explore collection
                  </button>
                </div>

                {/* Benefits */}
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-200 pt-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <FontAwesomeIcon
                      icon={faTruckFast}
                      className="text-[#087F5B]"
                    />
                    Easy shopping
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-[#087F5B]"
                    />
                    Shop with confidence
                  </div>
                </div>
              </div>

              {/* Product image */}
              <div className="relative flex min-h-[300px] items-center justify-center px-6 pb-16 pt-4 sm:min-h-[380px] sm:px-10 md:min-h-0 md:px-8 md:py-12 lg:px-12">
                <div className="absolute inset-4 rounded-[24px] border border-gray-100 bg-white sm:inset-7 sm:rounded-[28px]" />

                <div className="pointer-events-none absolute h-48 w-48 rounded-full border border-[#087F5B]/15 sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

                <div className="pointer-events-none absolute h-40 w-40 rounded-full bg-[#087F5B]/5 blur-3xl sm:h-64 sm:w-64" />

                <div className="relative z-10 flex h-[280px] w-full max-w-[440px] items-center justify-center sm:h-[360px] md:h-[420px] lg:h-[470px]">
                  <img
                    key={`image-${product.id}`}
                    src={product.image || product.thumbnail}
                    alt={product.title || "Featured product"}
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    className="carousel-product-image h-full w-full object-contain drop-shadow-[0_22px_24px_rgba(23,23,23,0.12)]"
                  />
                </div>

                <div className="absolute bottom-5 right-5 z-20 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:bottom-9 sm:right-9">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Curated for you
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#171717]">
                    Discover something new
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Slider controls */}
        <div className="pointer-events-none absolute bottom-5 left-5 z-20 flex items-center gap-2 sm:bottom-8 sm:left-8 md:bottom-9 md:left-14">
          <button
            type="button"
            aria-label="Previous slide"
            className="carousel-prev pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-[#171717] shadow-sm transition hover:border-[#087F5B] hover:bg-[#087F5B] hover:text-white sm:h-11 sm:w-11"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="carousel-next pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-[#171717] shadow-sm transition hover:border-[#087F5B] hover:bg-[#087F5B] hover:text-white sm:h-11 sm:w-11"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default CarouselUI;
