import { configureStore } from "@reduxjs/toolkit";
import authSlice from  './authSlice';

const  store = configureStore({
  reducer:{
    auth : authSlice // auth is name property in authSlice
  }
})
export default store;
