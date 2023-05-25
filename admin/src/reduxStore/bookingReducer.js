

const initialState = []

const bookingReducer = (state=initialState,action)=>{
    switch(action.type){
        case "GET_BOOKINGS":
            console.log(action.payload)
            return{
                ...state,
                bookings:[...action.payload]
            }

            default:
                return state;
    }
}


export default bookingReducer;