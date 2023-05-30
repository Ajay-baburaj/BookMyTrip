import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HOTEL_LOGOUT } from '../../reduxStore/hotelSlice'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaLock
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './sidebar.css'
import MenuAppBar from '../Navbar';


const Sidebar = ({ props }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path:'/',
            name:'Dashboard',
            icon: <FaRegChartBar />
        },
        {
            path: "/hotel/info",
            name: "information",
            icon: <FaTh />
        },
        {
            path: "/hotel/rooms",
            name: "Rooms",
            icon: <FaUserAlt />
        },
        {
            path: "/hotel/bookings",
            name: "Bookings",
            icon: <FaRegChartBar />
        },
        {
            path: "/hotel/profile",
            name: "profile",
            icon: <FaCommentAlt />
        },
       

    ]
    return (
        <>
            <MenuAppBar/>
            <div className="container">
                <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar" >
                    <div className="top_section">
                        <h5 style={{ display: isOpen ? "block" : "none" }} className="logo">bookMyTrip</h5>
                        <div style={{ marginLeft: isOpen ? "10px" : "0px" }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => {
                            if (item.callback) {
                                return (
                                    <div key={index} onClick={item.callback} className="link">
                                        <div className="icon">{item.icon}</div>
                                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                    </div>
                                )
                            } else {
                                return (
                                    <NavLink key={index} to={item.path} className="link" activeClassName="active">
                                        <div className="icon">{item.icon}</div>
                                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                    </NavLink>
                                )
                            }
                        })
                    }
                </div>
                <main>{props}</main>
            </div>
        </>

    );
};

export default Sidebar;
