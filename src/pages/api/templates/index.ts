/**
 * API Endpoint: Property Templates
 * GET /api/templates - List all templates
 * POST /api/templates - Create new template
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

  // GET - List all templates
  if (req.method === 'GET') {
    try {
      const templates = await prisma.propertyTemplate.findMany({
        orderBy: [
          { usageCount: 'desc' }, // Most used first
          { updatedAt: 'desc' },
        ],
      });

      return res.status(200).json({ templates });
    } catch (error) {
      console.error('Error fetching templates:', error);
      return res.status(500).json({ error: 'Failed to fetch templates' });
    }
  }

  // POST - Create new template
  if (req.method === 'POST') {
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

      // Validation
      if (!name || !propertyType) {
        return res.status(400).json({ error: 'Name and property type are required' });
      }

      const template = await prisma.propertyTemplate.create({
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
          createdBy: (session.user as any)?.id || null,
        },
      });

      return res.status(201).json(template);
    } catch (error) {
      console.error('Error creating template:', error);
      return res.status(500).json({ error: 'Failed to create template' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
