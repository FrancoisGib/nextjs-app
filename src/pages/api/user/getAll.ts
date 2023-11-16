import prisma from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.user.findMany({select: {id: true} });
  if (users)
    res.status(200).json({ users });
  else
    res.status(400).json({ error: "Error" });
}