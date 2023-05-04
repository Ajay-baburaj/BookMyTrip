import React, { useEffect } from 'react'
import './navbar.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'



function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    navigate("/login")
  }


  const user = useSelector(state => state.user.user)

  return (
    <div className='navbar'>
      <div className="navContainer">
        <span className="logo">BookMytrip</span>
        {user?.username && user?.username ? (
          <div className="userDisplay" onClick={()=>navigate('/profile')}>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1679303737~exp=1679304337~hmac=9a0d99da350810dd8e2f71f5127f56af325bc8f2e2e1ba980fd58fff858c483ec" alt="user Image" className="userProPic" />
            <span className='user'>{user.username}</span>
            <span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={handleLogout}>logout</span>
          </div>
        ) : (
          <div className="navItems">
            <button className='navButton' onClick={() => navigate('/register')}>Register</button>
            <button className='navButton' onClick={() => navigate('/login')}>Login</button>
          </div>
        )
        }

      </div>
    </div>
  )
}

export default Navbar