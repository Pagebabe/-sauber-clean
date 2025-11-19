/**
 * Property Detail API - CRUD operations for single property
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { generatePropertySlug } from '@/lib/slugify';

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
  } else if (req.method === 'PUT') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const propertyData = req.body;

      // Generate unique slug from title (pass ID to exclude self from uniqueness check)
      const slug = await generatePropertySlug(propertyData.title, id as string);

      // Update property
      const property = await prisma.property.update({
        where: {
          id: id as string,
        },
        data: {
          title: propertyData.title,
          slug,
          titleDE: propertyData.titleDE || null,
          titleTH: propertyData.titleTH || null,
          titleRU: propertyData.titleRU || null,
          titleFR: propertyData.titleFR || null,
          description: propertyData.description,
          descriptionDE: propertyData.descriptionDE || null,
          descriptionTH: propertyData.descriptionTH || null,
          descriptionRU: propertyData.descriptionRU || null,
          descriptionFR: propertyData.descriptionFR || null,
          price: parseInt(propertyData.price),
          location: propertyData.location,
          bedrooms: parseInt(propertyData.bedrooms),
          bathrooms: parseInt(propertyData.bathrooms),
          area: parseFloat(propertyData.area),
          floor: propertyData.floor ? parseInt(propertyData.floor) : null,
          propertyType: propertyData.propertyType,
          listingType: propertyData.listingType,
          status: propertyData.status || 'active',
          images: propertyData.images || [],
          features: propertyData.features || [],
          latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : null,
          longitude: propertyData.longitude ? parseFloat(propertyData.longitude) : null,
        },
      });

      res.status(200).json(property);
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Failed to update property' });
    }
  } else if (req.method === 'DELETE') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      await prisma.property.delete({
        where: {
          id: id as string,
        },
      });

      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
