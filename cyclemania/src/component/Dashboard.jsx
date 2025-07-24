import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot
} from 'firebase/firestore';

import user_img from '../assets/user_img.jpg';
import logo from '../assets/logo.png';

import {
    FaBicycle,
    FaTools,
    FaExchangeAlt,
    FaShoppingCart,
    FaHandHolding,
    FaEye,
} from 'react-icons/fa';
function Dashboard() {
    const context = useContext(FirebaseContext);
    const auth = context.auth;
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const [actionCounts, setActionCounts] = useState({
        sell: 0,
        buy: 0,
        lend: 0,
        borrow: 0,
        repair: 0,
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                // Firestore listener
                const db = getFirestore();
                const q = query(collection(db, 'cycleActions'), where('userId', '==', user.uid));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const counts = { sell: 0, buy: 0, lend: 0, borrow: 0, repair: 0 };
                    snapshot.forEach(doc => {
                        const type = doc.data().actionType;
                        if (counts[type] !== undefined) {
                            counts[type]++;
                        }
                    });
                    setActionCounts(counts);
                });

                return () => unsubscribe();
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleLogout = () => {
    auth.signOut()
        .then(() => {
            navigate('/'); // <-- Redirects to landing page after logout
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });
};


    const serviceStats = [
        { label: 'Cycles Sold', value: actionCounts.sell },
        { label: 'Cycles Bought', value: actionCounts.buy },
        { label: 'Times Lent', value: actionCounts.lend },
        { label: 'Times Borrowed', value: actionCounts.borrow },
        { label: 'Times Repaired', value: actionCounts.repair },
    ];

    const features = [
        { label: 'Sell Cycle', path: '/dashboard/sell', icon: <FaExchangeAlt className="text-4xl mb-4" /> },
        { label: 'Buy Cycle', path: '/dashboard/buy', icon: <FaShoppingCart className="text-4xl mb-4" /> },
        { label: 'Lend Cycle', path: '/dashboard/lend_cycle', icon: <FaHandHolding className="text-4xl mb-4" /> },
        { label: 'Borrow Cycle', path: '/dashboard/borrow_cycle', icon: <FaBicycle className="text-4xl mb-4" /> },
        { label: 'Repair Cycle', path: '/dashboard/repair_cycle', icon: <FaTools className="text-4xl mb-4" /> },
        { label: 'View All Cycles', path: '/dashboard/view_cycle', icon: <FaEye className="text-4xl mb-4" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/*Navbar*/}
            <header className="bg-[#007C7C] text-white px-6 py-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <span className="text-2xl font-bold">CycleMate</span>
                </div>
                <div className="flex items-center gap-4 relative">
                    <span className="text-base font-medium hidden sm:block">
                        Welcome, {user?.displayName || 'User'}
                    </span>
                    <img
                        src={user?.photoURL || user_img}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`group relative w-10 h-10 flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 ${showDropdown ? 'rotate-90' : ''}`}
                        >
                            <span className="hamburger-line group-hover:bg-white"></span>
                            <span className="hamburger-line group-hover:bg-white"></span>
                            <span className="hamburger-line group-hover:bg-white"></span>
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10 animate-fadeIn">
                                <button onClick={() => navigate('/dashboard/ViewProfile')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">View Profile</button>
                                <button onClick={() => navigate('/dashboard/ContactUs')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">Contact Us</button>
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">Logout</button>
                            </div>

                            
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
  {serviceStats.map((stat, idx) => (
    <div
      key={idx}
      className="bg-[#e0f7f6] hover:bg-[#d1f2f0] p-6 rounded-2xl shadow-sm text-center transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
    >
      <h2 className="text-xl font-semibold text-gray-700">{stat.label}</h2>
      <p className="text-3xl font-bold text-[#007C7C] mt-2">{stat.value}</p>
    </div>
  ))}
</div>


                {/* Services Section */}
                <h2 className="text-3xl font-bold text-[#007C7C] mb-8 text-center">Services</h2>

                {/* Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(feature.path)}
                            className="cursor-pointer bg-white text-[#007C7C] hover:bg-[#007C7C] hover:text-white transition duration-300 shadow-lg p-6 rounded-xl text-center"
                        >
                            {feature.icon}
                            <p className="text-xl font-semibold">{feature.label}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
