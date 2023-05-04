import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home';
import List from './Pages/list/List';
import Hotel from './Pages/hotel/Hotel';
import Login from './Pages/login/Login';
import Register from './Pages/Register/Register';
import Booking from './Pages/booking/Booking';
import Payment from './Pages/payment/Payment';
import ResetPassword from './Pages/resetPassword/ResetPassword';
import OtpEnter from './Pages/otp/OtpEnter';
import Profile from './Pages/Profile';
import OrderSuccessfull from './Pages/OrderSuccessfull'
import BookingDetails from './Pages/BookingDetails';
import { IsLogged } from './Auth/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} exact path='/' />
        <Route element={<List />} exact path='/hotels' />
        <Route element={<Hotel />} exact path='/hotels/:id' />
        <Route element={<Login />} exact path='/login' />
        <Route element={<Register />} exact path="/register" />
        <Route element={<ResetPassword />} exact path="/reset/password/:id/:token" />
        <Route element={<OtpEnter />} exact path="/otp/enter/:mobile" />
        <Route element={<IsLogged />}>
          <Route element={<Booking />} exact path="/booking/:id" />
          <Route element={<Payment />} exact path="/payment" />
          <Route element={<Profile />} exact path='/profile' />
          <Route element={<OrderSuccessfull />} exact path='/order/sucess' />
          <Route element={<BookingDetails />} exact path='/booking/details/:id' />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
