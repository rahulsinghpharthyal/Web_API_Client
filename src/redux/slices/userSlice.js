import { createSlice } from "@reduxjs/toolkit";
import { createUserAction, loginUserAction, logoutUserAction } from "../actions/userAction";


const initialState = {
    isLoading: false,
    user: {},
    isError: null,
    message: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            console.log(action)
                state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        // create User
        .addCase(createUserAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createUserAction.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.message = action?.payload?.success ? action?.payload?.message : null;
        })
        .addCase(createUserAction.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = action.payload
        })

        // login
        .addCase(loginUserAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(loginUserAction.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.user = action?.payload?.success ? action?.payload?.Data : null;
        })
        .addCase(loginUserAction.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = action.payload
        })

        // logout
        .addCase(logoutUserAction.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(logoutUserAction.fulfilled, (state, action)=>{
            console.log(action.payload);
            state.isLoading = false;
            state.user = null;
            state.message = action.payload.success ? action.payload.message : null;
        })
        .addCase(logoutUserAction.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = action.payload
        })

    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;