import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeQuantity,
} from "../../redux/cart/cartSlice";

const CartItem = ({ product }) => {
  const { id, name, price, category, image, quantity } = product || {};
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-lg transition 
                    flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* IMAGE + INFO (Left side) */}
      <div className="flex items-center gap-4 flex-1">

        {/* IMAGE */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT INFO */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            Category: {category}
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-bold mt-1 text-md">${price}</p>
        </div>
      </div>

      {/* QUANTITY BUTTONS */}
      <div className="flex items-center justify-start sm:justify-center gap-3">
        <button
          onClick={() => dispatch(decreaseQuantity(id))}
          className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center 
                     text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-800 dark:text-gray-100"
        >
          -
        </button>

        <span className="text-xl font-semibold w-8 text-center text-gray-900 dark:text-gray-100">
          {quantity}
        </span>

        <button
          onClick={() => dispatch(increaseQuantity(id))}
          className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center 
                     text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition text-gray-800 dark:text-gray-100"
        >
          +
        </button>
      </div>

      {/* PRICE + REMOVE BUTTON (Right side) */}
      <div className="flex flex-col items-end sm:items-center sm:w-auto">

        <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
          ${(price * quantity).toFixed(2)}
        </p>

        <button
          onClick={() => dispatch(removeQuantity(id))}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium mt-1"
        >
          Remove
        </button>
      </div>

    </div>
  );
};

export default CartItem;
