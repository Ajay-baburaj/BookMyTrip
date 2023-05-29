import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const user = useSelector(state => state.user.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    
    setCookie('accessToken', '', { expires: new Date(0) });
    setCookie('refreshToken', '', { expires: new Date(0) });

    navigate("/");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        <span className="logo" onClick={() => navigate('/')}>BookMytrip</span>
        <div className={`mobileMenuToggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navItems ${isMobileMenuOpen ? 'open' : ''}`}>
          {user?.username && user?.username ? (
            <div className="userDisplay" onClick={() => navigate('/profile')}>
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1679303737~exp=1679304337~hmac=9a0d99da350810dd8e2f71f5127f56af325bc8f2e2e1ba980fd58fff858c483ec" alt="user Image" className="userProPic" />
              <span className='user'>{user.username}</span>
              <span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={handleLogout}>logout</span>
            </div>
          ) : (
            <>
              <button className='navButton' onClick={() => navigate('/register')}>Register</button>
              <button className='navButton' onClick={() => navigate('/login')}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
