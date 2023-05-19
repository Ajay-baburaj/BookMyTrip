import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

let path;
function IsLogged() {
  const location = useLocation()
  console.log(location);
  path = location.pathname
  const user = useSelector((state) => state?.user?.user);
  return (
    user != null  ? <Outlet /> : <Navigate to="/login" />
  );
}

// function IsLoggedIn (){
//   const user = useSelector((state) => state?.user?.user); 
//   return (
//     user == null  ? <Outlet/> : <Navigate to={ path || "/" } /> 
//   )
// }

export {IsLogged}