import {createStore} from 'redux'

const initialState={
    details:[]
}

const bookedReducer = (state=initialState,action)=>{
    switch(action.type){
        case "BOOKED_DETAILS":
            return{
                ...state,
                details:[...action.payload]
            }
        default:
            return state;    
    }
}

export default bookedReducer;