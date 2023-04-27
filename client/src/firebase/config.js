import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaFeOM4pxCK9xKo85cx5EKx-h7-UvN8Wo",
  authDomain: "bookmytrip-be209.firebaseapp.com",
  projectId: "bookmytrip-be209",
  storageBucket: "bookmytrip-be209.appspot.com",
  messagingSenderId: "201439147156",
  appId: "1:201439147156:web:c6ff124b6019ceff833081",
  measurementId: "G-08LQ9Q3R3B"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider};

// function onCaptchaVerify(){
//   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',
//    {
//     'size': 'invisible',
//     'callback': (response) => {
//       onSignup()
//     },
// }, auth);

// }


// const mobile = 9567088516

// function onSignup(mobile){
//   onCaptchaVerify()

//   const appVerifier = window.recaptchaVerifier;
//   const formatPh = `+91${mobile}`;
//   console.log(formatPh)
//   return new Promise((resolve,reject)=>{

//     signInWithPhoneNumber(auth,formatPh,appVerifier).then((confirmationResult)=>{
//       window.confirmationResult = confirmationResult;
//       // setLoading(false);
//       // setShowOTP(true);
//       // toast.success("OTP sended successfully");
//       resolve()
//     }).catch((error)=>{
//       reject()
//       // console.log(error)
//       // setLoading(false);
//     })
//   })
  
//  }


