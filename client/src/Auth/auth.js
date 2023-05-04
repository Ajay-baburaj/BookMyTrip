import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = useSelector((state) => state?.user?.user);
  return (
    user != null  ? <Outlet /> : <Navigate to="/login" />
  );
}

export {IsLogged}