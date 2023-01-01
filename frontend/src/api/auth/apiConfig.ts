// Actions :

import {createApi } from '@reduxjs/toolkit/query/react'
import {gql} from 'graphql-tag'
import { graphqlBaseQuery } from '../../services/BaseQuery';
import { UserReturn } from '../../services/types';
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
    payload
  }
}

`
const GET_REFRESH_TOKEN = gql`
    mutation RefreshToken ($refreshToken:String!)
    
    
    {
        refreshToken(refreshToken:$refreshToken) {
                token
                refreshToken
            
        }
    }
`

export const AuthAPI = createApi({
    reducerPath: "SignUpAPI",
    baseQuery: graphqlBaseQuery({baseUrl: "http://localhost/api/graphql/"}),
    endpoints: (builder)=>({
        createUser: builder.mutation<UserReturn,any>({
            query: ({email,password})=>({
                
                document: CreateUser,
                variables:{
                    email,
                    password
                } 
            }
            )  
        }), 
        
        LoginUser: builder.mutation<any,any>({
            query: ({email,password})=>({
                
                document: Login,
                variables:{
                    email,
                    password
                } 
            }
            )  
        }),

        UpdateJWTTokens : builder.mutation<any,any>({
            query:({refreshToken})=>({
                document : GET_REFRESH_TOKEN,
                variables :{
                    refreshToken
                }
            }
            )
        })

        

    }
)
})
export const {useCreateUserMutation, useLoginUserMutation , useUpdateJWTTokensMutation} = AuthAPI



