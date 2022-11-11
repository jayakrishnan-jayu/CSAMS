// Actions :
import store, { RootState } from '../../store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut, Token, User } from '../../features/auth/authSlice';

import {gql} from 'graphql-tag'
import { graphqlBaseQuery } from '../../services/BaseQuery';
import { AuthenticatedUserResponse, LoginMutation, SignUpMutation } from '../../services/types';





const CreateUser = gql`
    mutation CreateUser(
      $email:String!,
      $password: String!   
    )
    {
        createUser(email:$email , password:$password){
            user {
                email
            }
        }
    }

`

const Login =  gql`
mutation tokenAuth(
  $email:String!,
  $password: String!   
)
{
    tokenAuth(email:$email , password:$password){
        user {
            token,
            refereshToken
        }
    }
}

`

const GET_REFRESH_TOKEN = gql`
    mutation RefreshToken (
        $refreshToken:String!
    )
    {
        refreshToken(refreshToken:$refreshToken) {
            refresh{
                refreshToken
            }
        }
    }
`

export const AuthenticationAPI = createApi({
   baseQuery: graphqlBaseQuery({baseUrl:"http:localhost:8000/api/graphql"}),
   endpoints:(builder)=>({
    SignUp : builder.mutation<SignUpMutation,string>({
        query: ()=> ({
            document: CreateUser
        }) 
    }),
    Login: builder.mutation<LoginMutation , AuthenticatedUserResponse>({
        query : ()=>({
            document: Login
        })
    })
   })

   
})





// const baseQuery = fetchBaseQuery({
//     baseUrl: "http:localhost:8000/api/graphql",
//     credentials: 'include' ,
//     //sending http-only secure cookie
//     //With every query the cookie is being sent 
//     prepareHeaders:(headers,{getState})=>{
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//         headers.set("authorization", `Bearer ${token}`)
//     }
//     return headers
//     },    

// })




//button to createuser


/**
 * 
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
})
})

 */



// const baseQueryWithReauth:BaseQueryFn<string | FetchArgs , unknown , FetchBaseQueryError> = async (args,api ,extraOptions)=>{
//     let result = await baseQuery(args,api,extraOptions);
//     if(result?.error?.status === 403)
//     {
//         console.log("Sending refresh token");
    
//     //
         
//     const refreshResult = apiSlice.injectEndpoints({
//         endpoints: (builder) => ({
//             getRefreshToken: builder.query<RefreshToken, { refreshtoken: string }>({
//               query: (variables) => ({
//                 document: GET_REFRESH_TOKEN,
//                 variables,
//               }),
//             }),
//           }),
//         });


    /*
builder =>({
            getRefreshToken: builder.mutation<RefreshToken,{refresh:string}>({
                query:(variables)=>{
                    document : GET_REFRESH_TOKEN ,
                    variables,
                }
            })
        })


    */

    /*
     endpoints: (builder) => ({
    filterFruitsFam: builder.query<IData, { family: string }>({
      query: (variables) => ({
        document: FILTER_FRUITS_FAM,
        variables,
      }),
    }),
  }),
});


    */

    // this is not going to this end point
   // console.log(refreshResult);
    
/**
 * const initialState : User & Token  = {
    user : {email:"" , first_name: "" , last_name: ""},
    token: ""

}
 */


//     if(refreshResult?.data)
//     {
//         const getState = api.getState as () => RootState;

//        const TOKEN : Token = {...refreshResult.data as Token}

//         const setCredentialsData : User & Token = {
//             user:{email:getState().auth.user.email , first_name:getState().auth.user.first_name , last_name:getState().auth.user.last_name},
//             token: TOKEN
//         }
//         api.dispatch(setCredentials(setCredentialsData))
//     }
//     else 
//     {
//        api.dispatch(logOut({}));
//     }
//     // backend endpoint to get the refreshToken
// }
//     return result ;

// }
//
// const apiSlice = createApi({
//     baseQuery:baseQueryWithReauth,  
    
//     endpoints: (builder) => ({
//         getRefreshToken: builder.query<RefreshToken, { refreshtoken: string }>({
//           query: (variables) => ({
//             document: GET_REFRESH_TOKEN,
//             variables,
//           }),
//         }),
//       }),
//     });
    // Extended API Slices



//1. CreateAPI slice for creating the user , once the user is created 
// figure out how the auth token is generated in the tutorial.
// 

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