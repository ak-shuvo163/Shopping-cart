// src/auth/Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email/Password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed. Please check your information.");
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Registered with Google");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {/* Google Login */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
