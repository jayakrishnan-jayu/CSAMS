import {  configureStore} from '@reduxjs/toolkit'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import {authReducer} from "../src/features/auth/authSlice" ;

// const reducers = {
//   [authSlice.name] : authReducer
//   //auth->slice name
// } 

//const combinedReducer = combineReducers(reducers);



export const store = configureStore({
  reducer: {
    auth : authReducer
   
    /**
     * 
     * 
     */
    
  },

  
  //RTK Query to cache results
})
 export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


/**
 * 
 * ThunkAction : 
 * 
 */