import React, { useState } from "react";
import olxLogo from "../assets/olxLogo.png";
import loadSpinner from "../assets/loading.gif";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signin } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signin(email, password);
      toast.success("Sign In successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Sign In failed:", err);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loadSpinner} alt="Loading..." />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img src={olxLogo} alt="Logo" className="w-24 mx-auto mb-6" />
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

          {error && (
            <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black-800 transition duration-200"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-sm">
            New to OLX?{" "}
            <Link to="/sign-up" className="text-black font-bold hover:underline">
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
