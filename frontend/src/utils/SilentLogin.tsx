import React, { useCallback, useEffect, useRef } from "react";
import { useUpdateTokenMutation } from "../api/auth/apiConfig";
import { useAppSelector } from "../services/hooks";
import { useDispatch } from "react-redux";
import authSlice from "../features/auth/authSlice";


export const SilentLogin = ()=>{

    // const [UpdateToken , {isSuccess, isLoading , isError}] = useUpdateTokenMutation();
    // const dispatch  = useDispatch();
    

    // const getNewAccessToken = useCallback( async()=>{

    //     const currentRefreshToken = useAppSelector((state=>state.UserDetails.RefreshToken))
    //     const getNewToken = await UpdateToken({currentRefreshToken});
    //     console.log(getNewAccessToken);
    //     dispatch(authSlice.actions.UpdateToken({currentRefreshToken}));

    useEffect(()=>{
        console.log("Hi")
        // const interval = setInterval(()=>console.log("Hi"));
        // intervalRef.current = interval;
        // return ()=> clearInterval(interval)
    }, [])
        
    
        // var currentDate = new Date() ;
        // var expiryTimeStamp = useAppSelector((state=>state.UserDetails.ExpireAt))*1000;
        // var expiryDate = new Date(expiryTimeStamp) ;
        // var minutes = expiryDate.getMinutes() ;
        // console.log(minutes);
        // console.log(currentDate.getMinutes())
        // console.log(currentDate.getMinutes() - minutes); 
        // console.log(new Date(expiryTimeStamp).toTimeString());
        // var expiry = 20 ;
        // console.log(expiry - minutes);
    
    // } , [] )
    
    
  


 


}