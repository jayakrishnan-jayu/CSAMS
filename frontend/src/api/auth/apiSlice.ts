// Actions :

import {createApi } from '@reduxjs/toolkit/query/react'
import {gql} from 'graphql-tag'
import { graphqlBaseQuery } from '../../services/BaseQuery';
import { CreateUser, LoginMutation , AuthenticatedUserResponse } from '../../services/types';






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

// const RequestHeaders: HeadersInit = new Headers();
// // requestHeaders.set('Content-Type', 'application/json');
// //requestHeaders.set('authorization' , `Bearer ${token}`);



export const AuthAPI = createApi({
    reducerPath: "SignUpAPI",
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
        }), 
        
        LoginUser: builder.mutation<AuthenticatedUserResponse,LoginMutation>({
            query: ({email,password})=>({
                
                document: Login,
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
export const {useCreateUserMutation, useLoginUserMutation} = AuthAPI



