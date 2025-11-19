/**
 * Projects API - CRUD operations for projects
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { generateProjectSlug } from '@/lib/slugify';

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
  } else if (req.method === 'POST') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const projectData = req.body;

      // Generate unique slug from name
      const slug = await generateProjectSlug(projectData.name);

      // Create project
      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          slug,
          nameDE: projectData.nameDE || null,
          nameTH: projectData.nameTH || null,
          nameRU: projectData.nameRU || null,
          nameFR: projectData.nameFR || null,
          description: projectData.description,
          descriptionDE: projectData.descriptionDE || null,
          descriptionTH: projectData.descriptionTH || null,
          descriptionRU: projectData.descriptionRU || null,
          descriptionFR: projectData.descriptionFR || null,
          location: projectData.location,
          developer: projectData.developer,
          completion: projectData.completion,
          units: parseInt(projectData.units),
          priceFrom: parseInt(projectData.priceFrom),
          images: projectData.images || [],
          amenities: projectData.amenities || [],
        },
      });

      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
