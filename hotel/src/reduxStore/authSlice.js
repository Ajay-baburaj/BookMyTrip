import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export default authSlice.reducer
export const {setAuth} = authSlice.actions


