import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/products/productSlice";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const productData = {
      ...data,
      price: Number(data.price)
    };
    dispatch(addProduct(productData));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Product Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Wireless Headphones"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select category</option>
            <option value="fashion">Fashion</option>
            <option value="bags">Bags</option>
            <option value="gadgets">Gadgets</option>
            <option value="electronics">Electronics</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Image URL
          </label>
          <input
            {...register("image", { required: true })}
            type="url"
            placeholder="https://example.com/img.jpg"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Price ($)
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="19.99"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Upload Date
          </label>
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
