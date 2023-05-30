import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import AdminLogin from "./pages/login/AdminLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/login/ForgotPassword";
import Landingpage from "./pages/landing/Landingpage";
import ResetPassword from "./pages/ResetPassword";
import BasicTable from "./pages/BasicTable";
import Hotels from "./pages/Hotels";
import HotelApprove from "./pages/HotelApprove";
import { IsLogged } from "./auth/auth";
import Bookings from "./pages/Bookings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} exact></Route>
        <Route path="/admin/forget/password" element={<ForgotPassword />} exact></Route>
        <Route path="/admin/reset/password/:id/:token" element={<ResetPassword />} exact />
        <Route element={<IsLogged />}>
          <Route path="/" />
          <Route path="/admin" element={<Sidebar props={<Landingpage />} />} exact></Route>
          <Route path="/admin/users" element={<Sidebar props={<BasicTable />} />} exact />
          <Route path="/admin/hotels/approve" element={<Sidebar props={<HotelApprove />} />} exact />
          <Route path="/admin/hotels" element={<Sidebar props={<Hotels />} />} exact />
          <Route path ="/admin/bookings" element={<Sidebar props={<Bookings />} />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>


  );
}


