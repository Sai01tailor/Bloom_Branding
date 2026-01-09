import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const OtpVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(120);
  const [loading, setLoading] = useState(false);

  // ⏱ TIMER
  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  // ✅ VERIFY OTP
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await api.post("/admin/signup-verify-otp", {
        email: state.email,
        otp,
      });

      console.log("OTP VERIFY RESPONSE:", res.data);
      login(res.data.token, res.data.admin);

      navigate("/dashboard", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "OTP invalid");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const resendOtp = async () => {
    try {
      await api.post("/admin/signup-send-otp", {
        email: state.email,
      });
      setTime(120);
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white/10 p-8 rounded-xl w-full max-w-sm">
        <h2 className="text-xl mb-4">Verify OTP</h2>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 rounded bg-black/40 mb-3"
          placeholder="Enter 6 digit OTP"
        />

        <p className="text-sm">
          Time left:{" "}
          <span className="font-semibold">
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </p>

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-green-600 py-2 rounded mt-4"
        >
          Verify OTP
        </button>

        {time === 0 && (
          <button
            onClick={resendOtp}
            className="block mt-4 text-sm underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpVerify;
