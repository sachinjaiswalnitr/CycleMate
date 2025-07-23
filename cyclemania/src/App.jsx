import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from './context/firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';
import imagebck from './assets/backgroundIMG1.png';
import logo from './assets/logo.png'; // 🔁 Make sure this path matches your file name

function App() {
  const context = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(context.auth, user => {
      setUser(user || null);
    });
  }, []);

  const generateOnClick = async () => {
    if (user) {
      setTimeout(() => navigate('/dashboard'), 200);
    } else {
      await context.signIn();
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  };

  return (
    <div className="bg-[#fdf8f3] min-h-screen flex flex-col items-center justify-start">
      {/* Top Navigation */}
      <nav className="w-full flex justify-between items-center p-6 px-10">
<Link to="/" className="flex items-center space-x-4 group">
  <img
    src={logo}
    alt="CycleMate Logo"
    className="h-23 w-23 rounded-full object-cover shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110"
  />
  <span className="text-3xl font-bold leading-none text-black transition-colors duration-300 group-hover:text-[#006F65]">
    CycleMate...
  </span>
</Link>




        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            About
          </Link>
          <Link
            to="/faqs"
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            FAQs
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-20 bg-[#fdf8f3] mt-[80px]">
{/* Left Content */}
        <div className="md:w-1/2 text-left space-y-6 max-w-xl flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Fix, Borrow & Ride – Your All-in-One Campus Cycle Solution!
          </h1>
          <p className="text-[1.1rem] text-gray-700 italic tracking-wide">
            Whether it's a broken brake, no cycle in sight, or just a quick ride across campus — we've got every pedal-powered problem covered......
          </p>

          <button
            onClick={generateOnClick}
            className="mt-6 bg-[#00887A] hover:bg-[#006F65] text-white text-lg font-semibold py-3 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-md w-fit"
          >
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center items-center h-full">
          <img
            src={imagebck}
            alt="Bicycle Illustration"
            className="w-[90%] max-w-lg object-contain"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
