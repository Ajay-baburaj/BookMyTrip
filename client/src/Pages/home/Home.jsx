import React from "react";
import "./home.css"
import Featured from "../../components/featured/Featured";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import BrowseProperty from "../../components/browseProperty/BrowseProperty";
import GuestLove from "../../components/guestLove/GuestLove";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import ConnectWithTravelers from "../../components/connectWithTravelers/ConnectWithTravelers";



const Home = ()=>{
 
 return(
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Homes guests love</h1>
        <GuestLove/>
        <MailList/>
        <Footer/>
      </div>
    </div>
 )   
}
export default Home;