import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import BillingPage from "./BillingPage";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {/* LEFT — Cart Items */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">🛒 Your Cart</h2>

          {cart.length ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty...</p>
          )}
        </div>
        

        {/* RIGHT — Billing */}
        <BillingPage />

      </div>
    </div>
  );
};

export default CartPage;
