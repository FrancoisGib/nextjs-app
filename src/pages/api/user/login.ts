import prisma from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.findUnique({ where: {email: req.body.email}, select: {id: true} });
  if (user)
    res.status(200).json({ id: user.id });
  else
    res.status(400).json({ error: "no user with this email" });
  
}