import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../context/firebase.jsx';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { FaHandHolding } from 'react-icons/fa';

function Lend_cycle() {
  const [lend, setLend] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgURL, setimgURL] = useState();
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleFileInput = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "project_easycycle");
    data.append("cloud_name", "dwl4cbysu");

    const res = await fetch("https://api.cloudinary.com/v1_1/dwl4cbysu/upload", {
      method: "POST",
      body: data
    });

    const uploadURL = await res.json();
    setimgURL(uploadURL.url);
    setLoading(false);
  };

  const handleOnChange = (field, value) => {
    setLend(prev => ({ ...prev, [field]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dataToUpload = { ...lend, present: true, imgURL };
    try {
      await setDoc(doc(db, "Lend", lend.cycleID), dataToUpload);
      toast.success("Cycle Added Successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Failed to add Cycle, Please try again.");
    }
  };

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


      <div className="relative bg-[#e6f2f1] shadow-2xl rounded-3xl p-10 max-w-2xl w-full mx-auto z-10">
<h1 className="text-3xl font-bold text-center text-[#007C7C] mb-6 flex items-center justify-center gap-3">
  Lend Cycle Form <FaHandHolding className="text-2xl text-[#007C7C]" />
</h1>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* Text Inputs */}
          {[
            { label: 'Owner Name', name: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Cycle ID / Serial Number', name: 'cycleID', type: 'text', placeholder: 'CYC12345' },
            { label: 'Cycle Model', name: 'cycleModel', type: 'text', placeholder: 'Hero Sprint 24T' },
            { label: 'Available From', name: 'available', type: 'date', placeholder: '' }
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-[#004f47] font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={(e) => handleOnChange(name, e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#007C7C]"
                required
              />
            </div>
          ))}

          {/* Dropdowns */}
          <div>
            <label className="block text-[#004f47] font-semibold mb-1">Condition</label>
            <select
              onChange={(e) => handleOnChange("condition", e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white"
              required
            >
              <option value="">Select</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
          </div>

          <div>
            <label className="block text-[#004f47] font-semibold mb-1">Hostel</label>
            <select
              onChange={(e) => handleOnChange("hostel", e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white"
              required
            >
              <option value="">Select</option>
              {["VS Hall", "SD Hall", "MV Hall", "GDB Hall", "DBA Hall", "MSS Hall", "HB Hall", "BF Hall", "KMS Hall", "CVR Hall"].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#004f47] font-semibold mb-1">Additional Notes</label>
            <textarea
              onChange={(e) => handleOnChange("notes", e.target.value)}
              placeholder="Any special instructions..."
              className="w-full p-3 rounded-xl border border-gray-300 bg-white resize-none"
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#004f47] font-semibold mb-1">Cycle Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="w-full p-3 border border-dashed border-[#007C7C] bg-white rounded-xl"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007C7C] text-white font-bold py-3 rounded-full hover:bg-[#005f5f] transition duration-300"
          >
            {loading ? "Uploading..." : "Submit Cycle for Lending"}
          </button>
        </form>

        <button
  onClick={() => navigate('/dashboard')}
  className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#007C7C] border border-[#007C7C] rounded-full font-semibold shadow-md hover:bg-[#e6f2f1] hover:text-[#005f5f] transition duration-300"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back to Dashboard
</button>

      </div>
    </div>
  );
}

export default Lend_cycle;
