import {  configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
// import {authReducer} from "../src/features/auth/authSlice" ;
import { AuthAPI } from './api/auth/apiConfig';
// import authAPI from './features/auth/authSlice';

// const reducers = {
//   [authSlice.name] : authReducer
//   //auth->slice name
// } 

//const combinedReducer = combineReducers(reducers);



export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer 
  }, 
  middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(AuthAPI.middleware)

})




 export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


/**
 * 
 * ThunkAction : 
 * 
 */