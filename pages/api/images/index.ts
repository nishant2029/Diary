import { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
import Image from '@/models/Image';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nextConnect from 'next-connect';
import { NextApiRequestWithFile } from '@/types/next'; // Adjust the path as needed
import connectToDatabase from '@/lib/mongodb';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Configure multer
const upload = multer({ dest: '/tmp' });

const handler = nextConnect<NextApiRequestWithFile, NextApiResponse>();

handler.use(upload.single('file'));

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

handler.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  await connectToDatabase();

  const { path } = req.file;
  try {
    const result = await cloudinary.uploader.upload(path);
    const newImage = new Image({ url: result.secure_url });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
