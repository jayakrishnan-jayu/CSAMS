// Actions :

import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GraphQLClient } from 'graphql-request';
import {gql} from 'graphql-tag'
import { graphqlFetch, RequestHeaders } from 'rtk-query-graphql';
// import { graphqlBaseQuery } from '../../services/BaseQuery';
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


fetchBaseQuery({

})

export const AuthenticationAPI = createApi({
   
   baseQuery: graphqlFetch({url:"http://localhost:8000/api/graphql/" } ),
   
   endpoints:(builder)=>({

    SignUp : builder.mutation<SignUpMutation,string>({
    
        query: ()=> ({
            
            document: CreateUser
        }) 
    }),
    Login: builder.mutation<LoginMutation , AuthenticatedUserResponse>({
        query : ({email,password})=>({
            document: Login,
            variables: {
                email ,
                password
            }
        })
    })
   })

   
})

export const {useSignUpMutation , useLoginMutation} = AuthenticationAPI ;
