// pages/api/contacts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
import Contact from '@/models/Contact';
import connectToDatabase from '@/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    if (req.method === 'GET') {
        try {
            const contacts = await Contact.find({});
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        const { name, content } = req.body;

        try {
            const newContact = new Contact({ name, content });
            await newContact.save();
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
