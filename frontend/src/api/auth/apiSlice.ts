// Actions :
import { RequestOptions } from '@octokit/types/dist-types/RequestOptions';
import {  BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import authSlice from '../../features/auth/authSlice';
import {gql} from 'graphql-tag'
import { RootState } from '../../store';
import { selectCurrentAccessToken } from '../../features/auth/authSlice';
import axios from 'axios';
import { $CombinedState } from '@reduxjs/toolkit';
import { graphqlBaseQuery } from '../../services/BaseQuery';






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
mutation tokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    token
    payload
    refreshExpiresIn
    refreshToken
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

// export const Client = new GraphQLClient("http://localhost:8000/api/graphql" , {
    
// } )

// Client.setHeader("Content-type" , "application/json")


//export declare type RequestHeaders = (setHeaders: (headers: RequestInit["headers"] | undefined) => GraphQLClient, setHeader: (key: string, value: string) => GraphQLClient) => ReturnRequestHeaders;
// const baseQuery = axios.create({
//     baseURL: "localhost/api/graphql",
//     headers : {
//         'Content-Type': 'application/json'
//     },


    
// })






export const BaseAPI = createApi({
    reducerPath: "authReducer",
    baseQuery : graphqlBaseQuery({baseUrl: "http://localhost/api/graphql"})

})



// export const API = createApi({
   
//    baseQuery: graphqlFetch({url:"http://localhost:8000/api/graphql/" } )
   
// //    endpoints:(builder)=>({

// //     SignUp : builder.mutation<SignUpMutation,string>({
    
// //         query: ()=> ({
            
// //             document: CreateUser
// //         }) 
// //     }),
// //     Login: builder.mutation<LoginMutation , AuthenticatedUserResponse>({
// //         query : ({email,password})=>({
// //             document: Login,
// //             variables: {
// //                 email ,
// //                 password
// //             }
// //         })
// //     })
// //    })

   
// })




//export const {useSignUpMutation , useLoginMutation} = API ;
