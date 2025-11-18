/**
 * Project Detail API - CRUD operations for single project
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

  if (req.method === 'GET') {
    try {
      const project = await prisma.project.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  } else if (req.method === 'PUT') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const projectData = req.body;

      // Update project
      const project = await prisma.project.update({
        where: {
          id: id as string,
        },
        data: {
          name: projectData.name,
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

      res.status(200).json(project);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  } else if (req.method === 'DELETE') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      await prisma.project.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
