import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './sidebar.css'
import Navbar from '../navbar/NavBar';


const Sidebar = ({ props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path:'/admin',
            name:"DashBoard",
            icon:<FaRegChartBar />
        },
        {
            path: "/admin/users",
            name: "users",
            icon: <FaTh />
        },
        {
            path: "/admin/hotels/approve",
            name: "Approve hotels",
            icon: <FaUserAlt />
        },
        {
            path: "/admin/hotels",
            name: "Hotels",
            icon: <FaRegChartBar />
        },
        {
            path: "/admin/bookings",
            name: "bookings",
            icon: <FaCommentAlt />
        }

    ]
    return (
        <>
            <Navbar/>
            <div className="container">
                <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar" >
                    <div className="top_section">
                        <h5 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin</h5>
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
                                    <NavLink key={index} to={item.path} className="link">
                                        <div className="icon">{item.icon}</div>
                                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                    </NavLink>
                                )
                            }
                        })
                    }
                </div>
                <main>{props?props:""}</main>
            </div>
        </>

    );
};

export default Sidebar;
