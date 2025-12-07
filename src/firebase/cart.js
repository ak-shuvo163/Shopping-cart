import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./Firebase.config";

// Save cart for a user
export const saveUserCart = async (uid, cart) => {
  try {
    await setDoc(doc(db, "carts", uid), { items: cart });
  } catch (err) {
    console.error("Error saving cart:", err);
  }
};

// Load cart for a user
export const loadUserCart = async (uid) => {
  try {
    const docRef = doc(db, "carts", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data().items || [];
    return [];
  } catch (err) {
    console.error("Error loading cart:", err);
    return [];
  }
};
