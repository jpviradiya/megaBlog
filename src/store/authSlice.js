import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,  // user login status
  userData: null  // setting user data
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData //sending data in object formate // calling => login({userData})
      // state.userData = action.payload //(send data without object) // calling => login(userData)
    },
    logout: (state) => {
      state.status = false
      state.userData = null
    }
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer
