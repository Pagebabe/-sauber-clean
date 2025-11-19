/**
 * Lead Detail API - GET and UPDATE operations for single lead
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Require authentication for all methods
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const lead = await prisma.lead.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      res.status(200).json(lead);
    } catch (error) {
      console.error('Error fetching lead:', error);
      res.status(500).json({ error: 'Failed to fetch lead' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { status } = req.body;

      // Update lead status
      const lead = await prisma.lead.update({
        where: {
          id: id as string,
        },
        data: {
          status,
        },
      });

      res.status(200).json(lead);
    } catch (error) {
      console.error('Error updating lead:', error);
      res.status(500).json({ error: 'Failed to update lead' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.lead.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
      console.error('Error deleting lead:', error);
      res.status(500).json({ error: 'Failed to delete lead' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
