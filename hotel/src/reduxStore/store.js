import {combineReducers, configureStore} from '@reduxjs/toolkit'
import hotelSlice from './hotelSlice'
import authslice from './authSlice'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import bookingSlice from './bookingSlice';

const persistConfig ={
    key:"root",
    storage,
}

const rootReducer = combineReducers({
    hotel:hotelSlice,
    auth:authslice,
    bookings:bookingSlice
});

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
 

