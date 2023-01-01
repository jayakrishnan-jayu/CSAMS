import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const initialState   = {
    email: "" ,
    name : "" ,
    AccessToken: "",
    RefreshToken: "",
    ExpireAt : 1

}
export const authSlice = createSlice({
    name: 'auth' ,
    initialState: initialState ,
    reducers: {
        getToken: (state, action:PayloadAction<any>)=>{
            state.AccessToken = action.payload["tokenAuth"]["token"]
            state.RefreshToken = action.payload["tokenAuth"]["refreshToken"]
        },
        UpdateToken: (state, action:PayloadAction<any>)=>{
            state.AccessToken = action.payload["refreshToken"]["token"]
            state.RefreshToken = action.payload["refreshToken"]["refreshToken"]
        }
    },
});

export const authReducer = authSlice.reducer ;
export default authSlice   ;



