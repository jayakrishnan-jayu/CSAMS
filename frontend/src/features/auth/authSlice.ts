import { createSlice, PayloadAction } from "@reduxjs/toolkit"





export interface User 
{
    email?: string
    name?: string

}

// create a type of object of defined type

export interface Token 
{
    AccessToken?:string  ,
    RefreshToken?: string

}


export interface State 
{
    error ?: string,
    success?: string ,
    loading?: string
}

const initialState : User & Token & State  = {
    email: undefined ,
    name : undefined ,
    AccessToken: undefined,
    RefreshToken: undefined,
    error: undefined,
    success:undefined,
    loading: undefined

}

export const authSlice = createSlice({
    name: 'auth' ,
    initialState: initialState ,
    reducers: {
        setCredentials: (state,action:PayloadAction<User&Token>)=>{
            
            state.email = action.payload.email;
            state.name = action.payload.name ;
            state.AccessToken = action.payload.AccessToken ;
            state.RefreshToken = action.payload.RefreshToken
            localStorage.setItem("Access-token" , state.AccessToken || "");
            localStorage.setItem("Refresh-Token", state.RefreshToken || "");

        },
        logOut : (state , _)=>{
            state.email = "";
            state.name = "" ;
            state.AccessToken = undefined,
            state.RefreshToken = undefined 
        },
    },
    // extraReducers: (builder)=>{
    //     builder.addMatcher()
    // }

});

export const authReducer = authSlice.reducer ;
export  const {setCredentials ,logOut} = authSlice.actions ;
export default authSlice   ;
export const selectCurrentAccessToken = (state:{auth:{token:Token["AccessToken"]}})=>state.auth.token ;
export const selectCurrentRefreshToken  = (state:{auth:{token:Token["RefreshToken"]}})=> state.auth.token ;

// export const selectCurrentUser = (state: { auth: { user: User } })=> state.auth.user ;

// 

