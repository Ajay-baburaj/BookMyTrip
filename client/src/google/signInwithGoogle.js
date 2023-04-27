
// import { provider, auth } from '../firebase/config'
// import { signInWithPopup } from "firebase/auth";
// import { useDispatch} from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// export default handleGoogle = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
  
//     signInWithPopup(auth, provider).then((data) => {
//         const userDetails = {
//             username: data.user.displayName,
//             email: data.user.email
//         }
//         console.log(userDetails)
//         dispatch({
//             type: "GOOGLE LOGIN",
//             payload: userDetails
//         })
//         console.log(data)
//         navigate("/")
//     }).catch((err) => {
//         console.log(err)
//     })
// }


