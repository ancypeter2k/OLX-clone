import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">{product.title}</h1>

        <div className="w-full h-[500px] bg-gray-50 flex justify-center items-center rounded-xl shadow-md">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <p className="text-2xl text-blue-600 font-semibold mt-2">₹{product.price}</p>

        <p className="text-gray-700 mt-4 text-base leading-relaxed whitespace-pre-line">
          {product.description || "No description provided."}
        </p>

        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-gray-800">Location:</span> {product.location}
          </p>
          <p>
            <span className="font-medium text-gray-800">Category:</span> {product.category}
          </p>
        </div>

        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Contact to Seller
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
