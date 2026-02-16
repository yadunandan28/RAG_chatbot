import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/login",
        new URLSearchParams(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("token", token);

      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };
 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        name="username"
        placeholder="Email"
        className="w-full p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
        value={formData.username}
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

export default Login;
