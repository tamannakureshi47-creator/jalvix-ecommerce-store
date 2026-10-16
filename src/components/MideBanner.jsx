import { Link } from "react-router-dom";
import banner from "../assets/midbanner-fashion.jpg";

const MideBanner = () => {
  return (
    <section className="midbanner-section px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="midbanner relative mx-auto flex min-h-[390px] max-w-[1380px] items-center overflow-hidden rounded-2xl sm:min-h-[430px] sm:rounded-3xl">
        <img
          className="midbanner__image"
          src={banner}
          alt=""
          aria-hidden="true"
        />
        <div className="midbanner__overlay" aria-hidden="true" />
        <div className="midbanner__content relative z-10 w-full max-w-2xl px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
          <span className="midbanner__eyebrow inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-200 backdrop-blur-md sm:text-xs">
            <span className="midbanner__dot" aria-hidden="true" />
            The new season edit
          </span>

          <h2 className="midbanner__title mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:mt-7 sm:text-4xl md:text-5xl lg:text-6xl">
            Find your
            <br />
            <span className="midbanner__title-accent text-emerald-300">
              signature style.
            </span>
          </h2>

          <p className="midbanner__description mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Fresh finds, timeless essentials, and those little details that
            make every look feel like you.
          </p>

          <Link
            to="/product"
            className="midbanner__button group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-emerald-600 bg-emerald-700 px-7 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          >
            Shop Now
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
        <div className="midbanner__collection" aria-hidden="true">
          <span className="midbanner__collection-mark">✦</span>
          <span className="midbanner__collection-kicker">Made for your moment</span>
          <span className="midbanner__collection-title">The style edit</span>
          <span className="midbanner__collection-note">Discover pieces you'll love</span>
        </div>
        <span className="midbanner__orbit" aria-hidden="true" />
        <span className="midbanner__frame" aria-hidden="true" />
      </div>
    </section>
  );
};

export default MideBanner;
