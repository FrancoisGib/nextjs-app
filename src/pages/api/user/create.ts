import prisma from '@/db/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '@/lib/auth';

type User = {
  name: string,
  email: string,
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hashedPassword = await hashPassword(req.body.password);
  const user: User = {name: req.body.name, email: req.body.email, password: hashedPassword}
  await prisma.user.create({ data: user }).catch(error => {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    res.status(404).json({ error: "error" })
  })
  res.status(201).json({ name: user.name, email: user.email });
}