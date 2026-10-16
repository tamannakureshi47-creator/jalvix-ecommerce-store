
import React from "react";
import {
  FaTruck,
  FaLock,
  FaUndo,
  FaClock,
} from "react-icons/fa";

const features = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    subtitle: "On orders over $100",
  },
  {
    icon: FaLock,
    title: "Secure Payment",
    subtitle: "100% secure payment",
  },
  {
    icon: FaUndo,
    title: "Easy Return",
    subtitle: "30-day return policy",
  },
  {
    icon: FaClock,
    title: "24/7 Support",
    subtitle: "Customer support",
  },
];

const Features = () => {
  return (
    <section className="feature-section w-full bg-white px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="storefront-feature group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B]/20 hover:bg-[#E8F3ED]/40 hover:shadow-lg sm:p-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8F3ED] text-2xl text-[#087F5B] transition-colors duration-300 group-hover:bg-[#087F5B] group-hover:text-white">
                <Icon />
              </div>

              <div>
                <h3 className="mb-1 text-base font-bold text-[#171717] sm:text-lg">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-500">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
