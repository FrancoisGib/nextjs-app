import prisma from '@/db/db';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, published, authorEmail } = req.body;
  const newPost = await prisma.post.create({ data: { title: title, content: content, published: published, author: { connect: { email: authorEmail } } }, select: { id: true } });
  res.status(201).json({ id: newPost.id })
}