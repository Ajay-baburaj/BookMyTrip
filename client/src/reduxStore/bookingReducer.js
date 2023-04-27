import {createStore} from 'redux'

const initialState={
    details:{}
}

const bookingReducer = (state=initialState,action)=>{
    switch(action.type){
        case "BOOK_ROOM":
            return{
                ...state,
                details:{...action.payload}
            }
        default:
            return state;    
    }
}

export default bookingReducer;