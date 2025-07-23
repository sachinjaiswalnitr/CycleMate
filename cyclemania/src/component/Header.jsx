import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase.jsx';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const context = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(context.auth, user => {
      setUser(user || null);
    });
  }, []);

  return (
    <header className="w-full bg-[#fdf8f3] py-4 px-6 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-gray-900">
        Bicycle
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        <Link to="/about">
          <button className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition duration-200">
            About
          </button>
        </Link>

        <Link to="/faqs">
          <button className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition duration-200">
            FAQs
          </button>
        </Link>

        {user ? (
          <>
            <span className="hidden md:inline-block font-semibold text-gray-800">
              Hello, {user.displayName}
            </span>
            <button
              onClick={() => signOut(context.auth)}
              className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition duration-200"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => context.signIn()}
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition duration-200"
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
