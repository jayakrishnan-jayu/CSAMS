import * as jwt from "jsonwebtoken";

const HASURA_GRAPHQL_JWT_SECRET = {
    type: "HS256",
    key : process.env.HASURA_SECRET_KEY as string
}



const JWT_CONFIG:jwt.SignOptions = {
    algorithm:HASURA_GRAPHQL_JWT_SECRET.type as "HS256" | "RS512",
    expiresIn:"4h"
}

interface GenerateJWTParams {
    defaultRole : string ,
    allowedRoles: string[] ,
    otherClaims? : Record<string , string | string[]> 
}

export function generateJWT(params: GenerateJWTParams): string {
    const payload = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": params.allowedRoles,
        "x-hasura-default-role": params.defaultRole,
        ...params.otherClaims,
      },
    };
    return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, JWT_CONFIG);
  }
  