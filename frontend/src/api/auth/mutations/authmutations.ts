import { gql } from "graphql-request";

export const GET_TOKEN_MUTATION = gql`
mutation TokenAuth (
  $email: String!,
  $password: String!
) 
{
   tokenAuth(email:$email , password:$password)
   {
    token,
    refreshToken
   }
   }

`;

//type Omit <T,K extends keyof any> = Pick<T,Exclude<keyof T , K>


export const CreateUser = gql`
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
export const GET_REFRESH_TOKEN = gql`
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




    



// mutation($email: String! , $password: String!){
//     tokenAuth(email:$email , password:$password)
//     {
//     token
//     }
// }
