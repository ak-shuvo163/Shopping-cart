// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart || []);
  const cartCount = cart.reduce((s, item) => s + (item.quantity || 1), 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const cartRef = useRef();

  const handleLogout = async () => {
    try {
      setAvatarOpen(false);
      await logout();
      // Small delay to ensure state updates
      setTimeout(() => {
        toast.success("Logged out successfully");
        navigate("/");
      }, 100);
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  // Pulse animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setBadgePulse(true);
      const t = setTimeout(() => setBadgePulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subTotal = cart
    .reduce((t, it) => t + (it.price || 0) * (it.quantity || 1), 0)
    .toFixed(2);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3v18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="font-semibold text-gray-800 dark:text-gray-100 text-lg tracking-tight">
                Shoply
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => {
                  setCartOpen((s) => !s);
                  setAvatarOpen(false);
                }}
                className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={cartOpen}
                aria-label="Open cart"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"
                  />
                </svg>

                <span
                  className={`absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full transform ${
                    badgePulse ? "animate-pulse scale-105" : ""
                  }`}
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              </button>

              {/* Cart Dropdown */}
              {cartOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Cart
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      You have {cartCount} item(s)
                    </p>
                  </div>

                  <div className="max-h-64 overflow-auto divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.length ? (
                      cart.map((it) => (
                        <div
                          key={it.id}
                          className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-700">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 w-full sm:w-auto">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                              {it.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {it.quantity} × ${it.price}
                            </p>
                          </div>

                          <div className="flex justify-between w-full sm:w-auto mt-2 sm:mt-0 items-center">
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              ${(it.price * it.quantity).toFixed(2)}
                            </div>
                            <button
                              className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs sm:text-sm font-medium"
                              onClick={() => {
                                /* handle remove */
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Your cart is empty
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">${subTotal}</span>
                    </div>
                    <Link
                      to="/cart"
                      onClick={() => setCartOpen(false)}
                      className="block"
                    >
                      <button className="w-full rounded-md bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition">
                        View cart & checkout
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Login/Register */}
            {/* Login / Register or User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen((s) => !s)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/YR6V7Qy/user.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {user.displayName || user.email}
                  </span>
                </button>

                {/* Dropdown */}
                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium text-gray-800 dark:text-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span>Cart</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {cartCount}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
