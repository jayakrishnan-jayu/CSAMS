import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch
} from 'react-redux';




export default configureStore({
  reducer: {
   // auth: authSlice.reducer,
   
    /**
     * 
     * 
     */
    
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(apiSlice.middleware)
  //RTK Query to cache results
})

const rootReducer = combineReducers({
  //auth:authSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;
// export const useAppDispatch = () => useGenericDispatch();
// export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;
// export type AppThunk = ThunkAction<void , RootState , unknown , Action>

/**
 * 
 * ThunkAction : 
 * 
 */