import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";


export default withApiAuthRequired(async function handleGraphQL(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV === 'development') {
        const { accessToken } = await getAccessToken(req, res);
        res.end(accessToken);
    }
    res.statusCode = 404;
    res.end()
    }
);