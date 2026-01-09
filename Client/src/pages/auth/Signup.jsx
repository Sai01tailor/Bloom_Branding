import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sendOtp = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Password & Confirm Password must match");
      return;
    }

    try {
      await api.post("/admin/signup-send-otp", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/verify-otp", {
        state: { email: form.email },
      });
    } catch (err) {
      alert(err.response?.data?.message || "OTP send failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1529336953121-ad6a5c4f7c2c')] bg-cover">
      <div className="bg-black/60 p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-6">
          Admin Signup
        </h2>

        {["username", "email", "password", "confirmPassword"].map((f) => (
          <input
            key={f}
            type={f.includes("password") ? "password" : "text"}
            placeholder={f}
            className="w-full p-3 mb-3 rounded bg-white/10"
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}

        <button
          onClick={sendOtp}
          className="w-full bg-indigo-600 py-3 rounded mt-4"
        >
          Send OTP
        </button>

        {/* 🔗 LOGIN LINK */}
        <p className="text-sm mt-4 text-center">
          Already registered?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
