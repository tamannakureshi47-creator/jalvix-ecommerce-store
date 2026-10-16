
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your favorite products delivered to your doorstep.",
    },
    {
      icon: "🔒",
      title: "Secure Shopping",
      description: "Shop confidently with a safe and secure experience.",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Discover quality products at affordable prices.",
    },
    {
      icon: "💬",
      title: "Customer Support",
      description: "We are always here to help you with your shopping.",
    },
  ];

  const products = [
    {
      name: "Electronics",
      description:
        "Discover the latest gadgets and smart devices for everyday life.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop",
      link: "/product",
    },
    {
      name: "Jewelry",
      description:
        "Explore elegant jewelry pieces that make every moment special.",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop",
      link: "/product",
    },
    {
      name: "Fashion",
      description:
        "Find stylish clothing that matches your personality and lifestyle.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop",
      link: "/product",
    },
    {
      name: "Accessories",
      description:
        "Complete your look with accessories made for every occasion.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
      link: "/product2",
    },
  ];

  return (
    <main className="storefront-page storefront-page--about min-h-screen overflow-hidden bg-white text-[#171717]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#043F30] via-[#066548] to-[#087F5B] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-emerald-200 sm:text-sm">
              <span className="h-0.5 w-8 bg-emerald-300" />
              Welcome to Jalvix
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Shopping Made
              <span className="mt-2 block text-emerald-300">
                Simple &amp; Stylish
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              Discover a world of electronics, fashion, jewelry, and
              everyday essentials. At Jalvix, we bring quality,
              style, and convenience together in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/product"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 py-3 font-bold text-[#066548] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Explore Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-7">
              <div>
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="mt-1 text-xs text-white/65 sm:text-sm">
                  Customer Focused
                </p>
              </div>

              <div className="border-l border-white/20 pl-8">
                <p className="text-2xl font-extrabold text-white">Easy</p>
                <p className="mt-1 text-xs text-white/65 sm:text-sm">
                  Shopping Experience
                </p>
              </div>

              <div className="border-l border-white/20 pl-8">
                <p className="text-2xl font-extrabold text-white">Secure</p>
                <p className="mt-1 text-xs text-white/65 sm:text-sm">
                  Shopping Journey
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-300/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 p-2 shadow-2xl sm:rounded-[2rem] sm:p-3">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop"
                alt="Jalvix shopping collection"
                className="h-[300px] w-full rounded-[1.1rem] object-cover sm:h-[380px] md:h-[440px] sm:rounded-[1.5rem]"
              />
            </div>

            <div className="absolute -bottom-5 left-5 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:bottom-6 sm:-left-6 sm:p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3ED] text-2xl">
                💚
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#171717]">
                  Made for You
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Quality meets convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative grid grid-cols-2 items-start gap-4 sm:gap-5">
            <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-[#E8F3ED] blur-2xl" />

            <img
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop"
              alt="Shopping store"
              loading="lazy"
              className="relative h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72 md:h-80"
            />

            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=700&auto=format&fit=crop"
              alt="Online shopping"
              loading="lazy"
              className="mt-8 h-56 w-full rounded-2xl object-cover shadow-lg sm:mt-12 sm:h-72 md:h-80"
            />

            <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-[#E8F3ED] bg-[#F5FAF7] p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F5B] text-xl text-white">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-[#171717]">
                  Shopping Made Easier
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Your everyday essentials in one convenient place.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[2.5px] text-[#087F5B] sm:text-sm">
              <span className="h-0.5 w-8 bg-[#087F5B]" />
              About Our Store
            </p>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Your Everyday
              <span className="block text-[#087F5B]">
                Shopping Partner
              </span>
            </h2>

            <p className="mb-5 text-base leading-8 text-gray-600">
              Jalvix is an online shopping destination created to
              make finding your favorite products easier and more
              enjoyable. From modern electronics to fashionable
              clothing and beautiful accessories, we bring a variety
              of choices together.
            </p>

            <p className="mb-8 text-base leading-8 text-gray-600">
              Our goal is to provide a simple shopping experience
              with quality products, convenient browsing, and a
              customer-first approach.
            </p>

            <Link
              to="/product"
              className="group inline-flex items-center gap-3 rounded-full bg-[#087F5B] px-7 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#066548] hover:shadow-lg"
            >
              Discover More
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F5FAF7] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <p className="mb-4 text-xs font-bold uppercase tracking-[2.5px] text-[#087F5B] sm:text-sm">
              Why Jalvix?
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
              What Makes Us
              <span className="text-[#087F5B]"> Special</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              We focus on making your shopping experience convenient,
              reliable, and enjoyable.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#087F5B]/30 hover:shadow-xl sm:p-7"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F3ED] text-3xl transition duration-300 group-hover:scale-110 group-hover:bg-[#087F5B]">
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-[#171717]">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[2.5px] text-[#087F5B] sm:text-sm">
                Explore Our Collection
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
                Shop by
                <span className="text-[#087F5B]"> Category</span>
              </h2>
            </div>

            <Link
              to="/product"
              className="group inline-flex items-center gap-2 self-start font-bold text-[#087F5B] transition hover:text-[#066548] sm:self-auto"
            >
              View All Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#087F5B]/20 hover:shadow-xl"
              >
                <Link
                  to={product.link}
                  aria-label={`Explore ${product.name}`}
                  className="block overflow-hidden bg-gray-50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-60"
                  />
                </Link>

                <div className="p-5 sm:p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#171717] transition-colors group-hover:text-[#087F5B]">
                    {product.name}
                  </h3>

                  <p className="mb-5 text-sm leading-7 text-gray-500">
                    {product.description}
                  </p>

                  <Link
                    to={product.link}
                    className="group/button inline-flex items-center gap-2 rounded-full bg-[#E8F3ED] px-5 py-2.5 text-sm font-bold text-[#087F5B] transition duration-300 hover:bg-[#087F5B] hover:text-white"
                  >
                    View Category
                    <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-[#043F30] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[2.5px] text-emerald-300 sm:text-sm">
            Your Next Favorite Is Waiting
          </p>

          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Ready to Find Your
            <span className="block text-emerald-300">
              Favorites?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Explore our collection and discover products that fit
            your style, needs, and everyday life.
          </p>

          <Link
            to="/product"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 font-bold text-[#066548] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-xl"
          >
            Start Shopping Now
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
