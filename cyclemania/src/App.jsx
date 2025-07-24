import React, { useContext, useEffect, useState, useRef } from 'react';
import { FirebaseContext } from './context/firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import imagebck from './assets/backgroundIMG1.png';
import logo from './assets/logo.png';

function App() {
  const context = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  const aboutRef = useRef(null);
  const faqsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(context.auth, user => {
      setUser(user || null);
    });
  }, []);

  const generateOnClick = async () => {
    if (user) {
      setTimeout(() => window.location.href = '/dashboard', 200);
    } else {
      await context.signIn();
      setTimeout(() => window.location.href = '/dashboard', 1000);
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#fdf8f3] min-h-screen flex flex-col items-center justify-start">
      {/* Top Navigation */}
      <nav className="w-full flex justify-between items-center p-6 px-10 bg-[#fdf8f3]">
<div className="flex items-center space-x-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={logo}
            alt="CycleMate Logo"
            className="h-20 w-20 rounded-full object-cover shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <span className="text-3xl font-bold leading-none text-black transition-colors duration-300 group-hover:text-[#006F65]">
            CycleMate...
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(faqsRef)}
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            FAQs
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="bg-[#00887A] hover:bg-[#006F65] text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-20 bg-[#fdf8f3] pt-[105px]">
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
        <div className="md:w-1/2 flex justify-center items-center h-full">
          <img
            src={imagebck}
            alt="Bicycle Illustration"
            className="w-[90%] max-w-lg object-contain"
          />
        </div>
      </main>
{/* About Section */}
<section ref={aboutRef} class="w-full">
  <div class="bg-[#006F65] text-center py-20 mt-7">
    <h2 class="text-5xl font-bold text-white mb-16">About Us</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20">
      <div class="bg-white text-[#006F65] rounded-2xl p-8 shadow-md transition-transform duration-300 hover:scale-105">
        <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
        <p class="text-gray-700">We’re committed to making cycling the go-to option for short trips on campus by providing convenient and reliable services.</p>
      </div>
      <div class="bg-white text-[#006F65] rounded-2xl p-8 shadow-md transition-transform duration-300 hover:scale-105">
        <h3 class="text-2xl font-bold mb-4">Campus-Focused</h3>
        <p class="text-gray-700">Our services are tailored to meet the unique needs of university students and faculty, enhancing mobility across the campus.</p>
      </div>
      <div class="bg-white text-[#006F65] rounded-2xl p-8 shadow-md transition-transform duration-300 hover:scale-105">
        <h3 class="text-2xl font-bold mb-4">Promoting Sustainability</h3>
        <p class="text-gray-700">By encouraging cycling, we aim to reduce carbon emissions and promote a healthier, more sustainable campus environment.</p>
      </div>
      <div class="bg-white text-[#006F65] rounded-2xl p-8 shadow-md transition-transform duration-300 hover:scale-105">
        <h3 class="text-2xl font-bold mb-4">Reliable Support</h3>
        <p class="text-gray-700">Our team is dedicated to offering prompt and dependable assistance, ensuring your cycling experience is smooth and stress-free.</p>
      </div>
    </div>
  </div>
  <div class="bg-[#E0F1EF] h-20"></div>
</section>


{/* FAQs Section */}
<section ref={faqsRef} class="w-full">
  <div class="bg-white py-20 mt-[-4rem]">
    <h2 class="text-5xl font-bold text-[#006F65] mb-16 text-center">FAQs</h2>
    <div class="w-full max-w-6xl mx-auto space-y-2 px-4">

      <div class="w-full bg-[#006F65] text-white rounded-2xl p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl text-left">
        <h3 class="text-2xl font-bold mb-1">What is Cycle Mate?</h3>
        <p>Cycle Mate is a campus-focused cycling service designed to offer students and faculty an eco-friendly and convenient way to travel within university premises.</p>
      </div>

      <div class="w-full bg-[#006F65] text-white rounded-2xl p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl text-left">
        <h3 class="text-2xl font-bold mb-1">How do I rent a bicycle?</h3>
        <p>Simply register through our app or website, choose a nearby available cycle, and unlock it using the QR code.</p>
      </div>

      <div class="w-full bg-[#006F65] text-white rounded-2xl p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl text-left">
        <h3 class="text-2xl font-bold mb-1">What happens if the cycle breaks down?</h3>
        <p>Contact our support team immediately. We'll either repair the bike or provide a replacement as quickly as possible.</p>
      </div>

      <div class="w-full bg-[#006F65] text-white rounded-2xl p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl text-left">
        <h3 class="text-2xl font-bold mb-1">Are there any membership plans?</h3>
        <p>Yes, we offer daily, weekly, and monthly subscription plans to suit different usage patterns.</p>
      </div>

    </div>
  </div>
</section>

{/* Contact Section */}
<section ref={contactRef} class="w-full bg-white py-20">
  <div class="max-w-4xl mx-auto px-4 mt-[-4rem]">
    <h2 class="text-5xl font-bold text-[#006F65] mb-12 text-center">Contact Us</h2>
    <div class="bg-[#006F65] text-white rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out  ">
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-2">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" class="bg-white w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]" required />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email" class="bg-white w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]" required />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium mb-2">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Write your message here..." class="bg-white w-full p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]" required></textarea>
        </div>
        <div>
          <button type="submit" class=" align-centre bg-white text-[#006F65] font-semibold py-3 px-6 rounded-lg hover:bg-[#e6f2f1] transition-all duration-300">Send Message</button>
        </div>
      </form>
    </div>
  </div>
</section>

    </div>
  );
}

export default App;
