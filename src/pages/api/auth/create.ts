import prisma from '@/db/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextApiRequest, NextApiResponse } from 'next'

type Auth = {
  id: number,     
  userId: number,  
  token: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.auth.create({ data: {userId: req.body.id, token:" fdsf"} })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log("A user already exists with that email")
      }
    }
    res.status(404).json({error: "error"})
  }
}