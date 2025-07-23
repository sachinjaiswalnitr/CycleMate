// import React, { useContext, useEffect, useState } from 'react'
// import { FirebaseContext } from '../context/firebase.jsx'
// import { onAuthStateChanged } from 'firebase/auth'
// import user_img from '../assets/user_img.jpg'
// import { useNavigate } from 'react-router-dom'

// function Dashboard() {

//     const context = useContext(FirebaseContext);
//     const auth = context.auth;
//     const [user, setUser] = useState(null);
//     const [img, setImg] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         onAuthStateChanged(auth, user => {
//             if (user) {
//                 setUser(user);
//                 setImg(user?.photoURL);
//                 // console.log(user);
//             }
//             else {
//                 setUser(null);
//                 setImg(null);
//             }
//         })
//     }, []);

//     return (
//         <div className='w-[97%] h-auto mt-22 relative ml-2 md:ml-5 flex flex-col items-center'>

//             <div className='rounded-2xl w-[90%] md:w-[80%] h-auto min-h-[12rem] mt-5 relative flex flex-col items-center justify-center gap-5 p-4 md:flex-row md:justify-evenly md:items-center bg-gray-200 shadow-xl transition-transform duration-200 hover:scale-102'>
//                 <img src={img || user_img} alt="Profile Image" className=' h-[5rem] rounded-full md:h-[7rem] lg:h-[10rem]' />
//                 <div className='min-w-[50%] min-h-[10rem] flex flex-col justify-center items-start gap-3'>
//                     <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Name : {user?.displayName}</h1>
//                     <h1 className='text-[1rem] lg:text-2xl'>Email : {user?.email}</h1>
//                     <h1 className='text-[1rem] lg:text-2xl'>Hostel : Dhirubhai Ambani Hall of Residence</h1>
//                     <h1 className='text-[1rem] lg:text-2xl'>Category : Student</h1>
//                 </div>
//             </div>

//             <h1 className='relative mt-10 font-bold text-4xl'>Services</h1>

//             <div className='mt-10  h-auto w-full md:w-[95%] grid sm:grid-cols-1 md:grid-cols-2 justify-items-center items-center'>
//                 <div
//                     onClick={() => {
//                         setTimeout(() => {
//                             navigate('/dashboard/borrow_cycle');
//                         }, 200);
//                     }}
//                     className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-red-200 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
//                     <h1 className='font-bold text-2xl mb-5'>Borrow Cycle 🚲</h1>
//                     <p>Easily borrow a cycle by <br /> selecting from the available <br /> list and checking it out in seconds.</p>
//                 </div>
//                 <div
//                     onClick={() => {
//                         setTimeout(() => {
//                             navigate('/dashboard/lend_cycle');
//                         }, 200);
//                     }}
//                     className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-blue-200 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
//                     <h1 className='font-bold text-2xl mb-5'>Lend Cycle 🔁</h1>
//                     <p>List your cycle for others to <br /> use and contribute to a smarter, <br /> shared campus commute.</p>
//                 </div>
//                 <div
//                     onClick={() => {
//                         setTimeout(() => {
//                             navigate('/dashboard/repair_cycle');
//                         }, 200);
//                     }}
//                     className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-green-100 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
//                     <h1 className='font-bold text-2xl mb-5'>Repair Cycle 🛠️</h1>
//                     <p>Report issues and send damaged <br /> cycles for repair to keep the <br /> system running smoothly.</p>
//                 </div>
//                 <div
//                     onClick={() => {
//                         setTimeout(() => {
//                             navigate('/dashboard/view_cycle');
//                         }, 200);
//                     }}
//                     className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-yellow-100 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
//                     <h1 className='font-bold text-2xl mb-5'>View All cycle 📋</h1>
//                     <p>Browse all registered cycles <br /> with live availability and <br /> maintenance status at a glance.</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard



// import React, { useContext, useEffect, useState } from 'react'
// import { FirebaseContext } from '../context/firebase.jsx'
// import { onAuthStateChanged } from 'firebase/auth'
// import user_img from '../assets/user_img.jpg'
// import { useNavigate } from 'react-router-dom'

// function Dashboard() {

//     const context = useContext(FirebaseContext);
//     const auth = context.auth;
//     const [user, setUser] = useState(null);
//     const [img, setImg] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         onAuthStateChanged(auth, user => {
//             if (user) {
//                 setUser(user);
//                 setImg(user?.photoURL);
//             }
//             else {
//                 setUser(null);
//                 setImg(null);
//             }
//         })
//     }, []);

//     return (
//         <div className='w-full min-h-screen bg-gradient-to-br from-[#006F65] to-white py-6 px-4'>
//             {/* Navbar */}
//             <div className='bg-[#006F65] text-white flex justify-between items-center px-6 py-4 rounded-xl shadow-md'>
//                 <div className='text-2xl font-bold'>CycleMate 🚲</div>
//                 <div className='flex items-center gap-4'>
//                     <span className='text-lg font-semibold hidden sm:block'>Welcome, {user?.displayName || 'User'}!</span>
//                     <img src={img || user_img} alt="User" className='h-10 w-10 rounded-full border-2 border-white' />
//                 </div>
//             </div>

//             {/* Profile Section */}
//             <div className='mt-10 w-full flex justify-center'>
//                 <div className='w-full max-w-6xl bg-[#006F65] text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center'>
//                     <img src={img || user_img} alt="Profile" className='h-28 w-28 rounded-full border-4 border-white' />
//                     <div className='text-left space-y-2'>
//                         <h1 className='text-2xl font-bold'>Name: {user?.displayName}</h1>
//                         <h1 className='text-lg'>Email: {user?.email}</h1>
//                         <h1 className='text-lg'>Hostel: Dhirubhai Ambani Hall of Residence</h1>
//                         <h1 className='text-lg'>Category: Student</h1>
//                     </div>
//                 </div>
//             </div>

//             {/* Services */}
//             <h1 className='mt-12 mb-6 text-center text-4xl font-bold text-[#006F65]'>Our Services</h1>

//             <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center w-full max-w-6xl mx-auto'>
//                 {[
//                     { title: 'Borrow Cycle 🚲', desc: 'Easily borrow a cycle by selecting from the available list and checking it out in seconds.', route: '/dashboard/borrow_cycle' },
//                     { title: 'Lend Cycle 🔁', desc: 'List your cycle for others to use and contribute to a smarter, shared campus commute.', route: '/dashboard/lend_cycle' },
//                     { title: 'Repair Cycle 🛠️', desc: 'Report issues and send damaged cycles for repair to keep the system running smoothly.', route: '/dashboard/repair_cycle' },
//                     { title: 'View All Cycles 📋', desc: 'Browse all registered cycles with live availability and maintenance status at a glance.', route: '/dashboard/view_cycle' },
//                     { title: 'Buy Cycle 💸', desc: 'Purchase cycles available for sale by other users or the administration.', route: '/dashboard/buy_cycle' },
//                     { title: 'Sell Cycle 📦', desc: 'List your cycle for sale and reach potential buyers instantly.', route: '/dashboard/sell_cycle' },
//                 ].map((service, index) => (
//                     <div
//                         key={index}
//                         onClick={() => navigate(service.route)}
//                         className='bg-[#006F65] text-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#00584f] w-full max-w-xs text-left'
//                     >
//                         <h2 className='text-2xl font-bold mb-3'>{service.title}</h2>
//                         <p className='text-sm'>{service.desc}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Dashboard;


import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import user_img from '../assets/user_img.jpg';

function Dashboard() {
    const context = useContext(FirebaseContext);
    const auth = context.auth;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const serviceStats = [
        { label: 'Cycles Sold', value: 32 },
        { label: 'Cycles Bought', value: 25 },
        { label: 'Times Lent', value: 42 },
        { label: 'Times Borrowed', value: 36 },
        { label: 'Times Repaired', value: 18 },
    ];

    const features = [
        { label: 'Sell Cycle', path: '/dashboard/sell_cycle' },
        { label: 'Buy Cycle', path: '/dashboard/buy_cycle' },
        { label: 'Lend Cycle', path: '/dashboard/lend_cycle' },
        { label: 'Borrow Cycle', path: '/dashboard/borrow_cycle' },
        { label: 'Repair Cycle', path: '/dashboard/repair_cycle' },
        { label: 'View All Cycles', path: '/dashboard/view_cycle' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#002D62] text-white flex flex-col py-6 px-4">
                <div className="flex flex-col items-center gap-2">
                    <img src={user?.photoURL || user_img} className="w-20 h-20 rounded-full" alt="User" />
                    <h2 className="text-lg font-bold mt-2">{user?.displayName || 'User'}</h2>
                    <p className="text-sm">{user?.email}</p>
                </div>
                <nav className="mt-10 space-y-4 text-sm">
                    <button className="hover:text-yellow-300 text-left">View Profile</button>
                    <button className="hover:text-yellow-300 text-left">Edit Profile</button>
                    <button className="hover:text-yellow-300 text-left">Contact Us</button>
                    <button
                        onClick={() => auth.signOut()}
                        className="hover:text-red-400 text-left">
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {serviceStats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-md text-center">
                            <h2 className="text-xl font-semibold text-gray-700">{stat.label}</h2>
                            <p className="text-2xl font-bold text-[#002D62] mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(feature.path)}
                            className="cursor-pointer bg-white hover:bg-[#002D62] hover:text-white transition duration-200 shadow-lg p-6 rounded-xl text-center text-gray-800 font-semibold text-lg"
                        >
                            {feature.label}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
