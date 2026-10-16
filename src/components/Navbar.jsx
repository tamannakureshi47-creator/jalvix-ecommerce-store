
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItem = [] } = useContext(CartContext);

  const cartCount = cartItem.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Product", path: "/product" },
    { name: "Product2", path: "/product2" },
  ];

  return (
    <nav className="storefront-nav sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-lg">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="flex min-h-[72px] items-center justify-between gap-4 sm:min-h-[82px]">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Jalvix home page"
            className="flex shrink-0 items-center text-neutral-900"
          >
            <h1 className="storefront-brand flex items-center text-[30px] font-extrabold tracking-[-2px] sm:text-[35px]">
              <span className="storefront-brand__mark mr-1 flex h-9 w-9 items-center justify-center rounded-xl bg-[#087F5B] text-2xl text-white sm:h-10 sm:w-10">
                J
              </span>
              alvix
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 md:flex lg:gap-9">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `relative flex min-h-[42px] items-center text-sm font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-[#087F5B] after:transition-all after:duration-200 ${
                      isActive
                        ? "text-[#087F5B] after:w-full"
                        : "text-neutral-600 after:w-0 hover:text-[#087F5B] hover:after:w-full"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#087F5B] hover:bg-[#E8F3ED] hover:text-[#087F5B] sm:h-11 sm:w-11"
            >
              <FaShoppingCart />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#087F5B] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-[#087F5B] transition-colors hover:bg-[#E8F3ED] md:hidden"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 border-t border-gray-100 py-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-[#E8F3ED] text-[#087F5B]"
                          : "text-neutral-600 hover:bg-gray-50 hover:text-[#087F5B]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink
                  to="/cart"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "bg-[#E8F3ED] text-[#087F5B]"
                        : "text-neutral-600 hover:bg-gray-50 hover:text-[#087F5B]"
                    }`
                  }
                >
                  Shopping Cart ({cartCount})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
