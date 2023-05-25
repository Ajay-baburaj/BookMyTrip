import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import reducer from '../reduxStore/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookingReducer from "./bookingReducer";
import bookedReducer from "./bookedReducer";


const initialState = {
    city: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
}


const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            console.log("payload", action.payload)
            console.log("call is coming here")
            return {
                ...action.payload
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: reducer,
    search: searchReducer,
    booking:bookingReducer,
    booked:bookedReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = []; // Add middleware here
const enhancers = [applyMiddleware(...middleware)];

const composedEnhancers = compose(composeWithDevTools(...enhancers));

const store = createStore(
    persistedReducer,
    composedEnhancers
);
const persistor = persistStore(store);
export default store
export { persistor};
