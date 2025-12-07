import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/Firebase.config.js"; 
import { useDispatch } from "react-redux";
import { loadUserCart, saveUserCart } from "../firebase/cart.js";
import { clearCart, setCart } from "../redux/cart/cartSlice.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // Logout + save cart to Firebase
  const logout = async () => {
    try {
      // Get current user from auth state (not from state to avoid stale closure)
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        try {
          const cartState = JSON.parse(localStorage.getItem("cart")) || [];
          if (cartState.length > 0) {
            await saveUserCart(currentUser.uid, cartState);
          }
        } catch (cartError) {
          console.error("Error saving cart on logout:", cartError);
          // Don't block logout if cart save fails
        }
      }
      
      // Clear cart from Redux
      dispatch(clearCart());
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear localStorage cart
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Load cart from Firestore for this user
        const userCart = await loadUserCart(currentUser.uid);
        dispatch(setCart(userCart));
      } else {
        dispatch(clearCart());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading, createUser, loginUser, googleLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
