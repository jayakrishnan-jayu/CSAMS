export type Maybe<T> = T | null ;
export type Exact<T extends {[key:string]:unknown }> = {[K in keyof T]: T[K] };
export type MakeOptional<T , K extends  keyof T> = Omit <T,K> & {[SubKey in K ]?: Maybe<T[SubKey]>}      
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

// type todoPreview = Omit<Todo , "description">


export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUser = {
  __typename? : 'CreateUser',
  username : Scalars['String'],
  email    : Scalars['String'],
  password : Scalars['String']
}

//



//TokenAuth
export type LoginMutation = {
  __typename?: 'Mutation',
   LoginUser : Pick<CreateUser,"email" | "password">
} 

export type LogoutMutation = {

}




//CreateUser
export type SignUpMutation = {
 __typename?:'Mutation' ;
 CreateUser : Required<CreateUser>;
}




