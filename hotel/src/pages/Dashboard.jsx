import React from 'react'
import { useCookies } from 'react-cookie';


const Dashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookieName']);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard