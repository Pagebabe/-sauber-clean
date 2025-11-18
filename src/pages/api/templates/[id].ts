/**
 * API Endpoint: Single Property Template
 * GET /api/templates/[id] - Get template details
 * PUT /api/templates/[id] - Update template
 * DELETE /api/templates/[id] - Delete template
 * POST /api/templates/[id]/use - Increment usage count
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Template ID is required' });
  }

  // GET - Get template details
  if (req.method === 'GET') {
    try {
      const template = await prisma.propertyTemplate.findUnique({
        where: { id },
      });

      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }

      return res.status(200).json(template);
    } catch (error) {
      console.error('Error fetching template:', error);
      return res.status(500).json({ error: 'Failed to fetch template' });
    }
  }

  // PUT - Update template
  if (req.method === 'PUT') {
    try {
      const {
        name,
        description,
        propertyType,
        listingType,
        location,
        views,
        privateFeatures,
        roomsSpaces,
        communalFacilities,
        technicalEquipment,
        security,
        locationFeatures,
        kitchenFeatures,
        layoutFeatures,
        furnishingStatus,
        commission,
        shortTermLet,
        quota,
        transferCosts,
      } = req.body;

      const template = await prisma.propertyTemplate.update({
        where: { id },
        data: {
          name,
          description: description || null,
          propertyType,
          listingType: listingType || null,
          location: location || null,
          views: views || [],
          privateFeatures: privateFeatures || [],
          roomsSpaces: roomsSpaces || [],
          communalFacilities: communalFacilities || [],
          technicalEquipment: technicalEquipment || [],
          security: security || [],
          locationFeatures: locationFeatures || [],
          kitchenFeatures: kitchenFeatures || [],
          layoutFeatures: layoutFeatures || [],
          furnishingStatus: furnishingStatus || null,
          commission: commission || 3.0,
          shortTermLet: shortTermLet || false,
          quota: quota || null,
          transferCosts: transferCosts || null,
        },
      });

      return res.status(200).json(template);
    } catch (error) {
      console.error('Error updating template:', error);
      return res.status(500).json({ error: 'Failed to update template' });
    }
  }

  // DELETE - Delete template
  if (req.method === 'DELETE') {
    try {
      await prisma.propertyTemplate.delete({
        where: { id },
      });

      return res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
      console.error('Error deleting template:', error);
      return res.status(500).json({ error: 'Failed to delete template' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
