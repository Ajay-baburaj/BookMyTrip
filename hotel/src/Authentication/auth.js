import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IsLogged() {
  const user = useSelector((state) => state?.hotel);
    console.log(user)
  return (
    user.loggedIn  ? <Outlet /> : <Navigate to="/hotel/login" />
  );
}

// function LoggedIn() {
// const user = useSelector((state) => state?.hotel?.hotel);
//   console.log(user);

//   return (
//     user.loggedIn ? <Navigate to="/hotel" /> : <Outlet />
//   );
// }

export { IsLogged};