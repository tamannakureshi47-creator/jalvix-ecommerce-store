
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/product" },
    { name: "New Arrivals", path: "/product2" },
    { name: "Shopping Cart", path: "/cart" },
  ];

  const customerLinks = [
    "Contact Us",
    "FAQs",
    "Shipping Policy",
    "Return Policy",
    "Privacy Policy",
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: FaInstagram,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: FaTwitter,
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: FaYoutube,
    },
  ];

  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      text: "Upleta, Gujarat, India",
    },
    {
      icon: FaPhoneAlt,
      text: "+91 98765 43210",
    },
    {
      icon: FaEnvelope,
      text: "support@jalvix.com",
    },
  ];

  return (
    <footer className="storefront-footer bg-[#171717] text-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-12 lg:py-16">
        {/* Brand & Social Links */}
        <div>
          <Link
            to="/"
            aria-label="Jalvix home page"
            className="inline-flex items-center"
          >
            <h2 className="flex items-center text-[32px] font-extrabold tracking-[-2px]">
              <span className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#087F5B] text-2xl text-white">
                J
              </span>
              alvix
            </h2>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
            Discover the latest trends and shop your favorite products at
            great prices. Quality products, great service, and a better
            shopping experience.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B] hover:bg-[#087F5B] hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Quick Links
            <span className="mt-2 block h-1 w-10 rounded-full bg-[#087F5B]" />
          </h3>

          <ul className="space-y-3.5">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="inline-flex items-center text-sm text-gray-400 transition-colors duration-200 hover:translate-x-1 hover:text-[#12B982]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Customer Service
            <span className="mt-2 block h-1 w-10 rounded-full bg-[#087F5B]" />
          </h3>

          <ul className="space-y-3.5">
            {customerLinks.map((item) => (
              <li key={item}>
                <a
                  href={
                    item === "Contact Us"
                      ? "mailto:support@jalvix.com"
                      : "#"
                  }
                  className="inline-flex text-sm text-gray-400 transition-colors duration-200 hover:translate-x-1 hover:text-[#12B982]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-white">
            Contact Us
            <span className="mt-2 block h-1 w-10 rounded-full bg-[#087F5B]" />
          </h3>

          <div className="space-y-5">
            {contactDetails.map((contact) => {
              const Icon = contact.icon;

              return (
                <div
                  key={contact.text}
                  className="flex items-start gap-3 text-sm text-gray-400"
                >
                  <Icon className="mt-1 shrink-0 text-base text-[#12B982]" />
                  <span className="break-words leading-6">
                    {contact.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-gray-400 sm:px-8 sm:text-sm md:flex-row md:px-12 md:text-left">
          <p>
            © {new Date().getFullYear()} Jalvix. All rights reserved.
          </p>

          <p>
            Designed with{" "}
            <span className="text-[#12B982]">♥</span>{" "}
            for a better shopping experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
