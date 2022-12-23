export type Maybe<T> = T | null ;
export type Exact<T extends {[key:string]:unknown }> = {[K in keyof T]: T[K] };
export type MakeOptional<T , K extends  keyof T> = Omit <T,K> & {[SubKey in K ]?: Maybe<T[SubKey]>}      
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

// export type UserReturn = {
//   token : Scalars['String'],
//   refreshToken : Scalars['String']
// }

// export type CreateUser = {
//   __typename? : 'CreateUser',
//   username : Scalars['String'],
//   email    : Scalars['String'],
//   password : Scalars['String']
// }

// //we are passing in the email and password as input 
// //As a result we expect the JWT Token & refresh token as the response.
// // If we don't receive the same , then using typscript conditional typing 
// // we make the the response to be some error string

// export type AuthenticatedUserResponse = any ;



// //TokenAuth
// export type LoginMutation = {
//   __typename?: 'Mutation',
//    email : string ,
//    password: string
// } 

// export type LogoutMutation = {

// }




// //CreateUser
// export type SignUpMutation = {
//  __typename?:'Mutation' ;
//  CreateUser : Required<CreateUser>;
// }




