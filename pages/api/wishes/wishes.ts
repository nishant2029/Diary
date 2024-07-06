// pages/api/contacts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
// import Contact from '@/models/Contact';
import Wish from '@/models/Wishes';
import connectToDatabase from '@/lib/mongodb';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const wishes = await Wish.find({});
            res.status(200).json(wishes);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        const { wishcontent } = req.body;

        try {
            const newWish = new Wish({ wishcontent:wishcontent });
            await newWish.save();
            res.status(201).json(newWish);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
