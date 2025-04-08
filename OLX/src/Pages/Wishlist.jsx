import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchWishlist(user.uid);
      } else {
        setUserId(null);
        setWishlist([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchWishlist = async (uid) => {
    try {
      const wishlistRef = doc(db, "wishlists", uid);
      const docSnap = await getDoc(wishlistRef);
      if (docSnap.exists()) {
        setWishlist(docSnap.data().items || []);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const removeFromWishlist = async (product) => {
    if (!userId) return;
    try {
      const wishlistRef = doc(db, "wishlists", userId);
      await updateDoc(wishlistRef, {
        items: arrayRemove(product),
      });
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Location: {product.location}</p>
                </div>
              </Link>
              <button
                onClick={() => removeFromWishlist(product)}
                className="absolute top-3 right-3 text-red-600 bg-white px-2 py-1 rounded-full shadow-md hover:bg-red-100"
                title="Remove from Wishlist"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
