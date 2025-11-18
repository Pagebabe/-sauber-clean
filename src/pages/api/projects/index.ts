/**
 * Projects API - GET all projects
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { location, developer, limit = '50', offset = '0' } = req.query;

      // Build where clause
      const where: any = {};

      if (location) {
        where.location = location as string;
      }

      if (developer) {
        where.developer = developer as string;
      }

      // Fetch projects
      const projects = await prisma.project.findMany({
        where,
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Count total
      const total = await prisma.project.count({ where });

      res.status(200).json({
        projects,
        pagination: {
          total,
          limit: parseInt(limit as string),
          offset: parseInt(offset as string),
          hasMore: parseInt(offset as string) + projects.length < total,
        },
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
