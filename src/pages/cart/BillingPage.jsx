import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/cartSlice";
import toast from "react-hot-toast";

const BillingPage = () => {
  const cart = useSelector((state) => state.cart);

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subTotal > 0 ? 4.99 : 0;
  const total = (subTotal + shipping).toFixed(2);
 
  const dispatch = useDispatch();
  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    dispatch(clearCart());
  }
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 h-fit sticky top-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Billing Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-3">
        <p>Subtotal</p>
        <p>${subTotal.toFixed(2)}</p>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-3">
        <p>Shipping</p>
        <p>{shipping ? "$4.99" : "$0.00"}</p>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {/* Total */}
      <div className="flex justify-between">
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Total</p>
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${total}</p>
      </div>

      <button onClick={handleCheckout} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default BillingPage;
