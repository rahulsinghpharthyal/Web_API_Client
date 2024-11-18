import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios, { axiosPrivate } from "../../customAxios/customAxios";

export const createUserAction = createAsyncThunk(
  "/create-user",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await customAxios.post("/user/create-user", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "/login-user",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post("/user/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(data);
      localStorage.setItem('user', JSON.stringify(data.Data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUserAction = createAsyncThunk('"/logout-user', async(_, {rejectWithValue})=>{
    try{
        const {data} = await axiosPrivate.get("/user/logout");
        return data;

    }catch(error){
        return rejectWithValue(error.response.data.message || error.message)
    }
})
