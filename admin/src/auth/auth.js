import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'
function IsLogged() {
  const user = useSelector(state=>state?.user?.data?.email)
  return (
    user != null ? <Outlet /> : <Navigate to="/admin/login" />
  );
}


export { IsLogged};