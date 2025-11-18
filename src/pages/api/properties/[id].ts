/**
 * Property Detail API - GET single property by ID
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const property = await prisma.property.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      res.status(200).json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
