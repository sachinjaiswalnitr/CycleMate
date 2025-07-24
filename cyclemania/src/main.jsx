import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FirebaseProvider } from './context/firebase.jsx'
import App from './App.jsx'
import Footer from './component/Footer.jsx'
import Dashboard from './component/Dashboard.jsx'
import ViewProfile from './component/viewprofile'
import ContactUs from './component/contactus'
import Sell from './component/Sell'
import Buy from './component/Buy'
import Lend_cycle from './component/Lend_cycle'
import View_cycle from './component/View_cycle'
import Repair_cycle from './component/Repair_cycle'
import Borrow_cycle from './component/Borrow_cycle'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <Toaster />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/sell' element={<Sell />} />
          <Route path='/dashboard/buy' element={<Buy />} />
          <Route path='/dashboard/viewprofile' element={<ViewProfile />} />
          <Route path='/dashboard/ContactUs' element={<ContactUs />} />
          <Route path='/dashboard/lend_cycle' element={<Lend_cycle />} />
          <Route path='/dashboard/view_cycle' element={<View_cycle />} />
          <Route path='/dashboard/repair_cycle' element={<Repair_cycle />} />
          <Route path='/dashboard/borrow_cycle' element={<Borrow_cycle />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>,
)
