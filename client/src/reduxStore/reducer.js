import { createStore } from "redux";


const initialState ={
    user:{},
}

const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                user:{...action.payload}
            }
        case "LOGIN":
            return{
                user:{...action.payload}
           }
        case "GOOGLE LOGIN":
            return{
                user:{...action.payload}
            }
        case "SIGNIN_WITH_OTP":
            return {
                user:{...action.payload}
            }        
        case "LOGOUT":
            return{
                user: action.payload
            }    

        default:
            return state;
    }
}

export default reducer;