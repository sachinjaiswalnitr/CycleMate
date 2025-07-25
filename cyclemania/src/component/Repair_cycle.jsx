import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/firebase.jsx";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";

function getVisTime(isUrgent) {
  const now = new Date();
  if (isUrgent) {
    const urgentDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return changeVisTime(urgentDate, "(Urgent)");
  } else {
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    next.setHours(10, 0, 0, 0);
    return changeVisTime(next, "");
  }
}

function changeVisTime(dateObj, suffix = "") {
  const visitTime =
    dateObj.toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }) + (suffix ? `${suffix}` : "");
  const visitDate = dateObj.toISOString();
  return { visitTime, visitDate };
}

function Repair_cycle() {
  const context = useContext(FirebaseContext);
  const db = context.db;
  const [repair, setRepair] = useState({
    cycleID: "",
    issue: "",
    hostel: "",
    isUrgent: false,
  });
  const [visTime, setVisTime] = useState(null);
  const [fault, setFault] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (field, value) => {
    setRepair({ ...repair, [field]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { visitTime, visitDate } = getVisTime(repair.isUrgent);

    const dataToUpload = {
      ...repair,
      dateReported: serverTimestamp(),
      status: "Pending",
      visitTime: visitTime,
      visitDate: visitDate,
    };

    try {
      await addDoc(collection(db, "Repairs"), dataToUpload);
      toast.success(`Repair request submitted! Visit Shop by ${visitTime}.`);
      setVisTime(visitTime);
      setFault(dataToUpload);
      setRepair({ cycleID: "", issue: "", hostel: "", isUrgent: false });
      context.repCycle();
    } catch (err) {
      console.log("Failed to submit request : ", err);
      toast.error("Failed to submit repair request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bce0dc] to-[#c3e7e3] py-20 px-4 relative overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-[50vh] z-0"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#004f47"
          fillOpacity="1"
          d="M0,160 C360,320 1080,0 1440,160 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="relative bg-[#e6f2f1] shadow-2xl rounded-3xl p-10 max-w-2xl w-full mx-auto z-10">
        <h1 className="text-3xl font-bold text-center text-[#007C7C] mb-6 flex items-center justify-center gap-3">
          Repair Cycle Form <FaTools className="text-2xl text-[#007C7C]" />
        </h1>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          {[
            {
              label: "Cycle ID",
              name: "cycleID",
              type: "text",
              placeholder: "Enter Cycle ID",
            },
            {
              label: "Issue Description",
              name: "issue",
              type: "textarea",
              placeholder: "Describe the issue",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-[#004f47] font-semibold mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  placeholder={placeholder}
                  onChange={(e) => handleOnChange(name, e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-white resize-none"
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={(e) => handleOnChange(name, e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 bg-white"
                  required
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-[#004f47] font-semibold mb-1">
              Hostel
            </label>
            <select
              name="hostel"
              onChange={(e) => handleOnChange("hostel", e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white"
              required
            >
              <option value="">Select Hostel</option>
              {[
                "VS Hall",
                "SD Hall",
                "MV Hall",
                "GDB Hall",
                "DBA Hall",
                "MSS Hall",
                "HB Hall",
                "BF Hall",
                "KMS Hall",
                "CVR Hall",
              ].map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isUrgent"
              onChange={(e) => handleOnChange("isUrgent", e.target.checked)}
              className="mr-2"
            />
            <label className="text-[#004f47] font-medium">Mark as Urgent</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#007C7C] text-white font-bold py-3 rounded-full hover:bg-[#005f5f] transition duration-300"
          >
            Submit Repair Request
          </button>
        </form>

        {visTime && (
          <div className="mt-8 p-6 rounded-2xl bg-gray-100 shadow-inner">
            <h2 className="text-lg font-semibold mb-2">🕑 Repair Time Slot</h2>
            <p>
              <strong>Cycle ID:</strong> {fault.cycleID}
            </p>
            <p>
              <strong>Hostel:</strong> {fault.hostel}
            </p>
            <p>
              <strong>Issue:</strong> {fault.issue}
            </p>
            <p>
              <strong>Visit By:</strong> {visTime}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#007C7C] border border-[#007C7C] rounded-full font-semibold shadow-md hover:bg-[#e6f2f1] hover:text-[#005f5f] transition duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Repair_cycle;
