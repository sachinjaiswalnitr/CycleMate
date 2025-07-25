import React, { useEffect, useState, useContext } from "react";
import user_img from "../assets/logo.png"; // fallback image
import { FirebaseContext } from "../context/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const ViewProfile = () => {
  const navigate = useNavigate();
  const context = useContext(FirebaseContext);
  const auth = context.auth;

  const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-[#e0f7f5] to-[#d0ebeb] dark:from-[#062d2d] dark:to-[#0a3f3f] transition-colors duration-500">
      {/* Background Waves */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-40">
          <path
            fill="#007C7C"
            fillOpacity="0.6"
            d="M0,64L48,74.7C96,85,192,107,288,128C384,149,480,171,576,170.7C672,171,768,149,864,154.7C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0 rotate-180">
        <svg viewBox="0 0 1440 320" className="w-full h-40">
          <path
            fill="#004c4c"
            fillOpacity="0.7"
            d="M0,64L48,74.7C96,85,192,107,288,128C384,149,480,171,576,170.7C672,171,768,149,864,154.7C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Card */}
      <div className="z-10 bg-white/90 dark:bg-[#0f2e2e]/90 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-md w-full text-center hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-[#007C7C] dark:text-teal-200 mb-6">View Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL || user_img}
            alt="User"
            className="w-40 h-40 rounded-full border-4 border-[#007C7C] object-cover"
          />
        </div>

        <div className="space-y-4 text-left mb-6">
          {[
            { label: "Name", value: user?.displayName },
            { label: "Email", value: user?.email },
            { label: "Hostel", value: "Dhirubhai Ambani Hall of Residence" },
            { label: "Role", value: "Student" },
          ].map(({ label, value }, i) => (
            <div
              key={i}
              className="bg-[#007C7C] text-white py-3 px-6 rounded-xl text-lg font-semibold shadow hover:scale-105 transition"
            >
              <span className="block">{label}:</span>
              <span className="block">{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#007C7C] text-white py-2 px-6 rounded-full font-semibold shadow hover:bg-[#005f5f] transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
