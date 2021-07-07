// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data?: any;
    links?: any;
    metadata?: any;
    error?: { message: string; }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        let { api } = req.query;

        let result = await fetch(`http://geodb-free-service.wirefreethought.com${api}`, { method: "GET" }).then((response) => response.json());

        res.status(200).json({

            data: result.data,
            links: result.links,
            metadata: result.metadata

        })

    } catch (error: unknown) {

        res.status(503).json({

            error: { message: (error as Error).message }

        })
    }
}
