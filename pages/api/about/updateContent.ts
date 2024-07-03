// pages/api/about/updateContent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import AboutContent from '@/models/AboutContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { content } = req.body;

  const updatedContent = await AboutContent.findOneAndUpdate(
    {},
    { content },
    { new: true, upsert: true }
  );

  res.status(200).json(updatedContent);
}
