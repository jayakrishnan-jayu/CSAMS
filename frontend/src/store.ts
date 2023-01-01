import {  configureStore} from '@reduxjs/toolkit'
import { AuthAPI } from './api/auth/apiConfig';
import authSlice from './features/auth/authSlice';
export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    UserDetails : authSlice.reducer

  }, 
  middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(AuthAPI.middleware)
})
 export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
