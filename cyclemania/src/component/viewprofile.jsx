import React from 'react';
import user_img from '../assets/logo.png'; // fallback image
import { useContext } from 'react';
import { FirebaseContext } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
const ViewProfile=()=>{
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FBFA] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-[#007C7C] mb-6">View Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL || user_img}
            alt="User"
            className="w-40 h-40 rounded-full border-4 border-[#007C7C] object-cover"
          />
        </div>

        <div className="space-y-4 text-left mb-6">
          <div className="bg-[#007C7C] text-white py-3 px-6 rounded-xl text-lg font-semibold shadow hover:scale-105 transition">
            <span className="block">Name:</span>
            <span className="block">{user?.displayName}</span>
          </div>

          <div className="bg-[#007C7C] text-white py-3 px-6 rounded-xl text-lg font-semibold shadow hover:scale-105 transition">
            <span className="block">Email:</span>
            <span className="block">{user?.email}</span>
          </div>

          <div className="bg-[#007C7C] text-white py-3 px-6 rounded-xl text-lg font-semibold shadow hover:scale-105 transition">
            <span className="block">Hostel:</span>
            <span className="block">Dhirubhai Ambani Hall of Residence</span>
          </div>

          <div className="bg-[#007C7C] text-white py-3 px-6 rounded-xl text-lg font-semibold shadow hover:scale-105 transition">
            <span className="block">Role:</span>
            <span className="block">Student</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#007C7C] text-white py-2 px-6 rounded-full font-semibold shadow hover:bg-[#005f5f] transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
