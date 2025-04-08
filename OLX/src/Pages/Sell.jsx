import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/cloudinaryUpload";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Sell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/sign-in" />;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload an image before submitting");

    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      const productData = {
        ...formData,
        imageUrl,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, "products"), productData);

      toast.success("Your ad has been posted successfully!");
      setFormData({ title: "", description: "", price: "", category: "", location: "" });
      setFile(null);
      setPreview(null);
      navigate("/");
    } catch (error) {
      toast.error("Error adding product");
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Your Ad</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Include Some Details</h3>
            <input
              type="text"
              name="title"
              placeholder="Ad Title *"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
              required
            />
            <textarea
              name="description"
              placeholder="Describe what you are selling *"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Set a Price</h3>
            <input
              type="number"
              name="price"
              placeholder="Selling Price (₹) *"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Section 3: Category and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Category</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select a Category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="vehicles">Vehicles</option>
                <option value="phones">Phones</option>
                <option value="fashion">Fashion</option>
                <option value="scooters">Scooters</option>
              </select>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Location</h3>
              <input
                type="text"
                name="location"
                placeholder="City or Area *"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Photos</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {preview && (
              <img
                src={preview}
                alt="Product Preview"
                className="w-32 h-32 object-cover mt-4 rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
