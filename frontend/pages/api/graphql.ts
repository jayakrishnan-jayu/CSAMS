import { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const { operationName, query, variables } = req.body;
        const response = await fetch(process.env.BACKEND_GRAPHQL_ENDPOINT || 'http://127.0.0.1:8000/api/graphql/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ accessToken,
            },
            body: JSON.stringify({operationName, query, variables}),
        });
        if (!response.ok) {
          throw new Error(await response.text())
        }
        res.status(200).send(await response.json())
      } catch (error : any) {
        res.status(error.status || 500).end(error.message)
      }
})