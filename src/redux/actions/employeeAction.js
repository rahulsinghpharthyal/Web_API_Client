import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/customAxios";

export const createEmployeeAction = createAsyncThunk(
  "/create-employee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(
        "/employee/create-employee",
        employeeData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.error(
        "Error creating employee: ",
        error.response || error.message
      );
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateEmployeeAction = createAsyncThunk('/update-employee', async({id, formData}, {rejectWithValue})=>{
  try{
    console.log(id)
    const {data} = await axiosPrivate.put(`/employee/update-employee/${id}`, formData, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  }catch(error){
    console.log(error)
    return rejectWithValue(error.response.data.message || error.message)
  }
})

export const getEmployeeAction = createAsyncThunk(
  "/get-employee",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("employee/get-employee");
      return data;
    } catch (error) {
      return rejectWithValue(error.respnose.data.message || error.message);
    }
  }
);

export const deleteEmployeeAction = createAsyncThunk('/delete-Employee', async(employeeId, {rejectWithValue})=>{
  try{
    const {data} = await axiosPrivate.delete(`/employee/delete-employee/${employeeId}`);
    return data;
  }catch(error){
    console.log(error)
    return rejectWithValue(error.data.message || error.message)
  }
})
