import prisma from '@/db/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  name: string,
  email: string,
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData: User = req.body;
  try {
    await prisma.user.create({ data: formData })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    res.status(404).json({error: "error"})
  }
  res.status(201).json({name: formData.name, email: formData});
}