import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'
function IsLogged() {
  const user = useSelector(state=>state?.user?.email)
  console.log(user)
  return (
    user ? <Outlet /> : <Navigate to="/admin/login" />
  );
}


export { IsLogged};