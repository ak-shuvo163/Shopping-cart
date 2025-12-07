import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../products/ProductCard";
import AddProduct from "../products/AddProduct";

const Home = () => {
  const product = useSelector((state) => state.product);

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Available Products
            </h2>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.length} item(s)
            </span>
          </div>

          {product.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
              {product.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl text-center text-gray-500 dark:text-gray-400">
              No products available
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Add Product */}
        <div>
          <div className="sticky top-24">
            <AddProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
