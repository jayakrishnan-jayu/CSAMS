import {  configureStore} from '@reduxjs/toolkit'
// import {authReducer} from "../src/features/auth/authSlice" ;
import { AuthAPI } from './api/auth/apiConfig';
import authSlice from './features/auth/authSlice';
// import authAPI from './features/auth/authSlice';

// const reducers = {
//   [authSlice.name] : authReducer
//   //auth->slice name
// } 

//const combinedReducer = combineReducers(reducers);



export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    UserDetails : authSlice.reducer

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