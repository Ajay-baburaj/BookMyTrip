import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import HotelLogin from './pages/HotelLogin';
import HotelRegister from './pages/HotelRegister';
import Info from './pages/Info';
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import { Provider } from 'react-redux';
import { store, persistor } from './reduxStore/store'
import ResetPassword from './pages/ResetPassword';
import OtpEnter from "./pages/OtpEnter"
import HotelProfile from './pages/HotelProfile';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './pages/Dashboard';
import { IsLogged } from './Authentication/auth';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <BrowserRouter>
          <Routes>
            <Route path='/hotel/login' element={<HotelLogin />} exact />
            <Route path='/hotel/register' element={<HotelRegister />} exact />
            <Route path='/hotel/reset/password/:id/:token' element={<ResetPassword />} exact />
            <Route path='/hotel/otp/:mobile' element={<OtpEnter />} exact />
            <Route element={<IsLogged/>}>
              <Route path='/hotel/info' element={<Sidebar props={<Info />} />} exact />
              <Route path='/' element={<Sidebar props={ <Dashboard />} exact/>}/>
              <Route path='/hotel/rooms' element={<Sidebar props={<Rooms />} />} exact />
              <Route path='/hotel/bookings' element={<Booking props={<Booking />} />} exact />
              <Route path='/hotel/profile' element={<Sidebar props={<HotelProfile />} />} exact />
            </Route>
           
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  );
}

export default App;
