import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    GET_BOOKINGS: (state, action) => {
      // clear the array
      state.splice(0, state.length);

      // add the new bookings to the array
      state.push(...action.payload);
    },
  },
});

export const { GET_BOOKINGS } = bookingSlice.actions;
export default bookingSlice.reducer;
