import React from 'react';
import { useNavigate } from "react-router-dom";
export default function ContactUs() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 text-[#006F65]">
      <h1 className="text-4xl font-bold mb-10">Contact Us</h1>

      <div className="bg-[#006F65] text-white rounded-2xl p-8 w-full max-w-md shadow-lg transition duration-300">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-base font-semibold mb-2">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#004f47]"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-white text-[#006F65] font-semibold py-3 px-6 rounded-lg hover:bg-[#e6f2f1] transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="mt-8 bg-[#007C7C] hover:bg-[#005f5f] text-white px-6 py-2 rounded-lg font-medium transition duration-300"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
