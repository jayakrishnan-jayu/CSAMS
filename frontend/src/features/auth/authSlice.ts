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
    token:string | any 
}

const initialState : User & Token  = {
    user : {email:"" , first_name: "" , last_name: ""},
    token: ""

}   

const authSlice = createSlice({
    name: 'auth' ,
    initialState: initialState ,
    reducers: {
        setCredentials: (state,action:PayloadAction<User&Token>)=>{
            state.user = action.payload.user 
            state.token = action.payload.token ;
        },
        logOut : (state , _)=>{
            state.user = {email:"" , first_name: "" , last_name:""},
            state.token = ""
        }
    }
});


export  const {setCredentials ,logOut} = authSlice.actions ;

export default authSlice   ;

export const selectCurrentUser = (state: { auth: { user: User } })=> state.auth.user ;

export const selectCurrentToken  = (state:{auth:{token:Token}})=> state.auth.token ;