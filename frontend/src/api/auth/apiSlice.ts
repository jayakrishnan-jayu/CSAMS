// Actions :

import {createApi } from '@reduxjs/toolkit/query/react'
import {gql} from 'graphql-tag'
import { graphqlBaseQuery } from '../../services/BaseQuery';
import { CreateUser, LoginMutation } from '../../services/types';






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



export const AuthAPI = createApi({
    reducerPath: "AuthAPI",
    baseQuery: graphqlBaseQuery({baseUrl: "http://localhost/api/graphql/"}),
    endpoints: (builder)=>({
        createUser: builder.mutation<CreateUser,LoginMutation>({
            query: ({email,password})=>({
                
                document: CreateUser,
                variables:{
                    email,
                    password
                }
                
            }
            )
            
            
        })
        
    }
)

})



// export const BaseAPI = createApi({
//     reducerPath: "authReducer",
//     baseQuery : graphqlBaseQuery({baseUrl: "http://localhost/api/graphql"})

// })



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




export const {  useCreateUserMutation} =  AuthAPI ;
