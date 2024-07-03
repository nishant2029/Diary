// pages/api/about/getContent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import AboutContent from '@/models/AboutContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const content = await AboutContent.findOne();
  res.status(200).json(content);
}
