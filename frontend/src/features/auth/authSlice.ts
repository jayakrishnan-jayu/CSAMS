import {createSlice, PayloadAction} from "@reduxjs/toolkit"


export interface UserType 
{
    email: string
    first_name:string
    last_name : string 
    
}

export interface User 
{
    user : UserType    

}

// create a type of object of defined type

export interface Token 
{
    AccessToken?:string  ,
    RefreshToken?: string

}

const initialState : User & Token  = {
    user : {email:"" , first_name: "" , last_name: ""},
    AccessToken: undefined,
    RefreshToken: undefined

}   

const authSlice = createSlice({
    name: 'auth' ,
    initialState: initialState ,
    reducers: {
        setCredentials: (state,action:PayloadAction<User&Token>)=>{
            state.user = action.payload.user 
            state.AccessToken = action.payload.AccessToken ;
            state.RefreshToken = action.payload.RefreshToken
            localStorage.setItem("Access-token" , state.AccessToken || "");
            localStorage.setItem("Refresh-Token", state.RefreshToken || "");

        },
        logOut : (state , _)=>{
            state.user = {email:"" , first_name: "" , last_name:""},
            state.AccessToken = undefined,
            state.RefreshToken = undefined 
        },
    },
    extraReducers: (builder)=>{
        builder.addMatcher()
    }

});

//


export  const {setCredentials ,logOut} = authSlice.actions ;

export default authSlice   ;

export const selectCurrentUser = (state: { auth: { user: User } })=> state.auth.user ;

export const selectCurrentRefreshToken  = (state:{auth:{token:Token["RefreshToken"]}})=> state.auth.token ;

export const selectCurrentAccessToken = (state:{auth:{token:Token["AccessToken"]}})=>state.auth.token ;