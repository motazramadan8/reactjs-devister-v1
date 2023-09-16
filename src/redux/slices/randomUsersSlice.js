import { createSlice } from "@reduxjs/toolkit";

const randomUsersSlice = createSlice({
  name: "randomUsers",
  initialState: {
    randomProfiles: [],
  },
  reducers: {
    setRandomProfiles(state, action) {
      state.randomProfiles = action.payload
    }
  },
});

const randomUsersReducer = randomUsersSlice.reducer;
const randomUsersActions = randomUsersSlice.actions;

export { randomUsersReducer, randomUsersActions };
