import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase.jsx';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaBicycle } from 'react-icons/fa';

function View_cycle() {
  const context = useContext(FirebaseContext);
  const db = context.db;
  const [cycle, setCycle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCycle = async () => {
      const q = query(collection(db, "Lend"), where("present", "==", true));
      const snapShot = await getDocs(q);
      const allCycles = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCycle(allCycles);
    };

    fetchCycle();
  }, [db]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bce0dc] to-[#c3e7e3] py-20 px-4 relative overflow-hidden">
      {/* Decorative Wavy Background */}
      <svg className="absolute top-0 left-0 w-full h-[50vh] z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#004f47"
          fillOpacity="1"
          d="M0,160 C360,320 1080,0 1440,160 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="relative bg-[#e6f2f1] shadow-2xl rounded-3xl p-10 max-w-6xl w-full mx-auto z-10">
        <h1 className="text-3xl font-bold text-center text-[#007C7C] mb-10 flex items-center justify-center gap-3">
          View Available Cycles <FaBicycle className="text-2xl text-[#007C7C]" />
        </h1>

        {cycle && cycle.length > 0 ? (
          <div className="flex flex-col gap-8">
            {cycle.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
              >
                <img
                  src={item.imgURL}
                  alt="cycle"
                  className="w-64 h-40 md:w-72 md:h-48 rounded-xl object-cover"
                />
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-gray-800 w-full">
                  <span className="font-semibold">Lender Name:</span> <span>{item.name}</span>
                  <span className="font-semibold">Cycle ID:</span> <span>{item.cycleID}</span>
                  <span className="font-semibold">Model:</span> <span>{item.cycleModel}</span>
                  <span className="font-semibold">Hostel:</span> <span>{item.hostel}</span>
                  <span className="font-semibold">Condition:</span> <span>{item.condition}</span>
                  <span className="font-semibold">Available From:</span> <span>{item.available}</span>
                  <span className="font-semibold">Notes:</span> <span>{item.notes}</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate('/dashboard')}
              className="mt-8 self-center flex items-center gap-2 px-6 py-3 bg-white text-[#007C7C] border border-[#007C7C] rounded-full font-semibold shadow-md hover:bg-[#e6f2f1] hover:text-[#005f5f] transition duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        ) : (
          <h2 className="text-xl text-center text-gray-700">🚫 Currently No Available Cycles</h2>
        )}
      </div>
    </div>
  );
}

export default View_cycle;
