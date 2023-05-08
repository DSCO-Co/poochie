import type { NextApiRequest, NextApiResponse } from 'next';
export default function isAllowedMethod(req: NextApiRequest, res: NextApiResponse, allowedMethods: string[]): boolean;
