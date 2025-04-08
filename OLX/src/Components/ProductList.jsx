import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import moment from "moment";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const wishlistRef = doc(db, "wishlists", user.uid);
        const wishlistSnap = await getDoc(wishlistRef);
        if (wishlistSnap.exists()) {
          const wishlistData = wishlistSnap.data().items || [];
          const favoriteMap = {};
          wishlistData.forEach((item) => {
            favoriteMap[item.id] = true;
          });
          setFavorites(favoriteMap);
        }
      } else {
        setUserId(null);
        setFavorites({});
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (productId) => {
    if (!userId) {
      alert("Please log in to manage wishlist.");
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const isFavorite = !favorites[productId];
    setFavorites((prev) => ({ ...prev, [productId]: isFavorite }));

    const wishlistRef = doc(db, "wishlists", userId);
    const wishlistSnap = await getDoc(wishlistRef);

    if (isFavorite) {
      if (wishlistSnap.exists()) {
        await updateDoc(wishlistRef, {
          items: arrayUnion(product),
        });
      } else {
        await setDoc(wishlistRef, {
          items: [product],
        });
      }
    } else {
      if (wishlistSnap.exists()) {
        await updateDoc(wishlistRef, {
          items: arrayRemove(product),
        });
      }
    }
  };

  const truncateText = (text, maxWords = 10) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">Loading products...</p>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#f2f4f5]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Fresh recommendations
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200 cursor-pointer relative"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-2 right-2 text-xl text-red-500 bg-white rounded-2xl p-1"
                >
                  {favorites[product.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {truncateText(product.title, 6)}
                </h3>
                <p className="text-blue-600 font-bold text-lg mt-1">
                  ₹{product.price}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {truncateText(product.description)}
                </p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>{product.location}</span>
                  {product.createdAt?.toDate && (
                    <span>
                      {moment(product.createdAt.toDate()).fromNow()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
