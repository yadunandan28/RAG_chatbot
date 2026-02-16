import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/signup", formData);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

    <form onSubmit={handleSignup} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
        Login
      </button>
    </form>

    <p className="text-sm mt-4 text-center">
      Don’t have an account?{" "}
      <Link className="text-blue-600" to="/signup">
        Signup
      </Link>
    </p>
  </div>
</div>

  );
};

export default Signup;
