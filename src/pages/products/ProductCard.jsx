import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { name, price, category, image, date } = product || {};
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative group h-48 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-black/60 dark:bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h2>

        <div className="flex justify-between items-center mt-2">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-xl">${price}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
