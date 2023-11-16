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
  await prisma.user.create({ data: formData }).catch(error => {
    if (error instanceof PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    res.status(404).json({ error: "error" })
  })
  res.status(201).json({ name: formData.name, email: formData });
}