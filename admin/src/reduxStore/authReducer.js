import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookingReducer from "./bookingReducer";


const userInitialState = {
    data:{},
    loggedIn:false
}

const userReducer = (state=userInitialState,action)=>{
    switch(action.type){
        case "ADMIN_LOGIN":
            return{
                ...state,
                data:{...action.payload}
            }
        case "ADMIN_LOGOUT":
            return{
                ...state,
                data:action.payload
            }  
         default:    
            return state; 
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    booking:bookingReducer
});

const persistConfig ={
    key:'root',
    storage
};

const persistedReducer = persistReducer(persistConfig,rootReducer)
const middleware = []
const enhancers =[applyMiddleware(...middleware)]

const composedEnhancers = compose(composeWithDevTools(...enhancers));

const store = createStore(
    persistedReducer,
    composedEnhancers
)

const persistor = persistStore(store)
export default store
export {persistor}
