import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

 const submitHandler = async () => {
  try {
    const res = await api.post("/admin/login", form);
        console.log("LOGIN RESPONSE:", res.data);

    // 🔥 YAHI PE LAGANA HAI
    login(res.data.token, res.data.admin);

    navigate("/dashboard", { replace: true });

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="bg-white p-8 rounded-xl w-full max-w-sm">
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          placeholder="Email"
          className="w-full p-2 border mb-3"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={submitHandler}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          New admin?{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
