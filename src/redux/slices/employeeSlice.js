import { createSlice } from "@reduxjs/toolkit";
import { createEmployeeAction, deleteEmployeeAction, getEmployeeAction, updateEmployeeAction } from "../actions/employeeAction";

const initialState = {
    isLoading: false,
    employee: {},
    isError: null,
    message: null,
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    extraReducers: (builder)=>{
        builder
        //add employee:-
        .addCase(createEmployeeAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createEmployeeAction.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.message = action.payload ? action.payload.message : null;
        })
        .addCase(createEmployeeAction.rejected, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.isError = action.payload;
        })

        //update employee-
        .addCase(updateEmployeeAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateEmployeeAction.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.message = action.payload ? action.payload.message : null;
        })
        .addCase(updateEmployeeAction.rejected, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.isError = action.payload;
        })
        
        // get all employee-
        .addCase(getEmployeeAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getEmployeeAction.fulfilled, (state, action)=>{
;            state.isLoading = false;
            state.employee = action.payload ? action.payload.Data : null;
        })
        .addCase(getEmployeeAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = action.payload;
        })

        // delete employee:-
        .addCase(deleteEmployeeAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteEmployeeAction.fulfilled, (state, action)=>{
;            state.isLoading = false;
             state.message = action.payload.success ? action.payload.message : null;
        })
        .addCase(deleteEmployeeAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
})

export default employeeSlice.reducer;