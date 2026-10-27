import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createClub = async (req: Request, res: Response) => {
  try {
    const { name, description, logoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Club name is required' });
    }

    const newClub = await prisma.club.create({
      data: {
        name,
        description,
        logoUrl,
      },
    });

    return res.status(201).json({ success: true, data: newClub });
  } catch (error) {
    console.error('Error creating club:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};