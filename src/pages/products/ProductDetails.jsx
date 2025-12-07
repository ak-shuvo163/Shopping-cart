import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams(); // Get product id from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find product from store
  const product = useSelector(state => 
    state.product.find(p => p.id.toString() === id)
  );

  if (!product) return <p className="p-4 text-gray-800 dark:text-gray-100">Product not found</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart"); // Optional: redirect to cart after adding
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Product Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">{product.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4 capitalize">Category: {product.category}</p>
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">${product.price}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Quisque et urna nec elit tempor malesuada.
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition font-medium"
          >
            Add to Cart
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-gray-800 dark:text-gray-100"
          >
            Back
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
