import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    user:{},
    loggedIn:false
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADMIN_LOGIN":
            return{
                ...state,
                user:{...action.payload}
        
            }
        case "ADMIN_LOGOUT":
            return{
                ...state,
                user:action.payload
            }  
         default:    
            return state; 
    }
}

const persistConfig ={
    key:'root',
    storage
};

const persistedReducer = persistReducer(persistConfig,reducer)
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