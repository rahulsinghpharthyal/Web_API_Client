import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import employeeReducer from './slices/employeeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
  },
});

export default store;
