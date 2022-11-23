import {  configureStore} from '@reduxjs/toolkit'

import authSlice from './features/auth/authSlice';


// const reducers = {
//   [authSlice.name] : authReducer
//   //auth->slice name
// } 

//const combinedReducer = combineReducers(reducers);


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
   
    /**
     * 
     * 
     */
    
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat()
  //RTK Query to cache results
})
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
// export const useTypedDispatch = () => useDispatch<AppDispatch>();
// //export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
// // export const useAppDispatch = () => useGenericDispatch();
//  export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;
// export type AppThunk = ThunkAction<void , RootState , unknown , Action>

/**
 * 
 * ThunkAction : 
 * 
 */