import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn:false,
    hotel:{}
}

const hotelSlice = createSlice({
    name:"hotelSlice",
    initialState,
    reducers:{
        HOTEL_LOGIN:(state,action)=>{
           state.loggedIn=true;
           state.hotel=action.payload
           
        },
        HOTEL_INFO:(state,action)=>{
            state.loggedIn=true;
            state.hotel = action.payload
        },
        HOTEL_LOGOUT:(state,action)=>{
            state.loggedIn = false;
            state.hotel = null;
        },
        HOTEL_DETAILS:(state,action)=>{
            state.loggedIn = true;
            state.hotel = action.payload
        }
    }
})

export const {HOTEL_LOGIN,SIGNIN_WITH_OTP,HOTEL_INFO,HOTEL_LOGOUT,HOTEL_DETAILS} = hotelSlice.actions;
export default  hotelSlice.reducer;
