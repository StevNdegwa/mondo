// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data?: any;
    error?: { message: string }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        let { cityId } = req.query;

        let result = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities/${cityId}`, { method: "GET" }).then((response) => response.json());

        res.status(200).json({
            data: result.data
        })
    } catch (error: unknown) {
        res.status(503).json({
            error: { message: (error as Error).message }
        })
    }
}
