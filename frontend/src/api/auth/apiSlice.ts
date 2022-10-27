// Actions :
import store, { RootState } from '../../store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut, Token, User } from '../../features/auth/authSlice';





const baseQuery = fetchBaseQuery({
    baseUrl: "http:localhost:8080",
    credentials: 'include' ,
    //sending http-only secure cookie
    //With every query the cookie is being sent 
    prepareHeaders:(headers,{getState})=>{
    const token = (getState() as RootState).auth.token;
    if (token) {
        headers.set("authorization", `Bearer ${token}`)
    }
    return headers
    },    

})




const baseQueryWithReauth:BaseQueryFn<string | FetchArgs , unknown , FetchBaseQueryError> = async (args,api ,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions);
    if(result?.error?.status === 403)
    {
        console.log("Sending refresh token");
    
    const refreshResult = await baseQuery('/refresh' , api , extraOptions);
    console.log(refreshResult);
    
/**
 * const initialState : User & Token  = {
    user : {email:"" , first_name: "" , last_name: ""},
    token: ""

}
 */


    if(refreshResult?.data)
    {
        const getState = api.getState as () => RootState;

       const TOKEN : Token = {...refreshResult.data as Token}

        const setCredentialsData : User & Token = {
            user:{email:getState().auth.user.email , first_name:getState().auth.user.first_name , last_name:getState().auth.user.last_name},
            token: TOKEN
        }
        api.dispatch(setCredentials(setCredentialsData))
    }
    else 
    {
       api.dispatch(logOut({}));
    }
    // backend endpoint to get the refreshToken
}
    return result ;

}

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder => ({

    })
    // Extended API Slices
})


/**
 * export const saveValue = (value: number): (dispatch: Dispatch<SaveValue>, getState: () => State): void => {
    return (dispatch: Dispatch<SaveValue>, getState: () => State): void => {
        axios.post('www.exampleurl.com', value)
            .then((response) => {
                const someValueFromState = getState().stateValue;
                const payload = {...response, someValueFromState}
                dispatch({ type: constants.SAVE_VALUE, payload });
            });
    };
};

interface MyState {
    LoginPageReducer: {
        token: string;
    }
}

 */