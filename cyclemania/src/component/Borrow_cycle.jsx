import { FirebaseContext } from '@/context/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Borrow_cycle() {
  const context = useContext(FirebaseContext);
  const auth = context.auth;
  const db = context.db;
  const [hostel, setHostel] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const [reason, setReason] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user || null);
    });
  }, []);

  const selectCycle = async () => {
    if (!hostel) return toast.warning("Please select your hostel first.");
    setLoading(true);
    try {
      const q = query(collection(db, "Lend"), where("present", "==", true));
      const snap = await getDocs(q);
      const allCycle = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const same = allCycle.filter(c => c.hostel === hostel);
      const other = allCycle.filter(c => c.hostel !== hostel);

      let selected;
      if (same.length > 0) {
        selected = same[Math.floor(Math.random() * same.length)];
      } else if (other.length > 0) {
        selected = other[Math.floor(Math.random() * other.length)];
        toast.info("No cycles available in your hostel. Alloted from another hostel.");
      } else {
        toast.error("No cycle available to borrow at the moment.");
        setLoading(false);
        return;
      }

      setSelectedCycle(selected);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching cycles.");
    }
    setLoading(false);
  };

  const handleBorrow = async () => {
    if (!selectedCycle || !returnDate || !reason) {
      toast.error("Please fill all the details.");
      return;
    }

    try {
      await updateDoc(doc(db, "Lend", selectedCycle.cycleID), { present: false });

      await addDoc(collection(db, "Borrowed"), {
        cycleID: selectedCycle.cycleID,
        borrowedBy: user?.displayName || "Anonymous User",
        borrowedOn: new Date().toISOString(),
        expectedReturn: returnDate,
        reason: reason,
        borrowedHostel: hostel,
      });

      toast.success("Cycle borrowed successfully");
      context.borrCycle();
      setHostel("");
      setReturnDate("");
      setReason("");
      setSelectedCycle(null);
    } catch (err) {
      console.log(err);
      toast.error("Borrowing Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bce0dc] to-[#c3e7e3] py-20 px-4 relative overflow-hidden">
      {/* Wavy Background */}
      <svg className="absolute top-0 left-0 w-full h-[50vh] z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#004f47"
          fillOpacity="1"
          d="M0,160 C360,320 1080,0 1440,160 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="relative max-w-3xl mx-auto bg-[#e6f2f1] shadow-2xl rounded-3xl p-8 z-10">
        <h1 className="text-3xl font-bold text-center text-[#007C7C] mb-6">Borrow Cycle</h1>

        {!selectedCycle && (
          <div className="space-y-4">
            <label className="block text-[#004f47] font-semibold text-lg">Your Current Hostel</label>
            <select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#007C7C]"
              required
            >
              <option value="">Select</option>
              {["VS Hall", "SD Hall", "MV Hall", "GDB Hall", "DBA Hall", "MSS Hall", "HB Hall", "BF Hall", "KMS Hall", "CVR Hall"].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <button
              onClick={selectCycle}
              disabled={loading}
              className="w-full bg-[#007C7C] text-white font-bold py-3 rounded-full hover:bg-[#005f5f] transition duration-300"
            >
              {loading ? "Checking..." : "Check Available Cycle"}
            </button>
          </div>
        )}

        {selectedCycle && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={selectedCycle.imgURL}
                alt="Cycle"
                className="w-60 h-36 rounded-xl object-cover shadow-md"
              />
              <div className="text-[#004f47] space-y-1">
                <p><strong>Model:</strong> {selectedCycle.cycleModel}</p>
                <p><strong>Cycle ID:</strong> {selectedCycle.cycleID}</p>
                <p><strong>Owner:</strong> {selectedCycle.name}</p>
                <p><strong>Hostel:</strong> {selectedCycle.hostel}</p>
                <p><strong>Condition:</strong> {selectedCycle.condition}</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[#004f47] font-semibold">Expected Return Date</label>
              <input
                type="date"
                className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#007C7C]"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />

              <label className="block text-[#004f47] font-semibold">Reason for Borrowing</label>
              <textarea
                className="w-full p-3 rounded-xl border border-gray-300 bg-white resize-none"
                placeholder="E.g. going to city / class"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />

              <div className="flex gap-4">
                <button
                  onClick={handleBorrow}
                  className="flex-1 bg-[#007C7C] text-white py-3 rounded-full font-semibold hover:bg-[#005f5f] transition duration-300"
                >
                  Confirm Borrow
                </button>
                <button
                  onClick={() => setSelectedCycle(null)}
                  className="flex-1 bg-white text-[#007C7C] border border-[#007C7C] py-3 rounded-full font-semibold hover:bg-[#e6f2f1] hover:text-[#005f5f]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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

export default Borrow_cycle;
