/**
 * Properties API - CRUD operations for properties
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
  if (req.method === 'GET') {
    try {
      const {
        listingType, // sale or rent
        location,
        propertyType, // condo, house, villa, land
        minPrice,
        maxPrice,
        bedrooms,
        status = 'active',
        limit = '50',
        offset = '0',
      } = req.query;

      // Build where clause
      const where: any = {
        status: status as string,
      };

      if (listingType) {
        where.listingType = listingType as string;
      }

      if (location) {
        where.location = location as string;
      }

      if (propertyType) {
        where.propertyType = propertyType as string;
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseInt(minPrice as string);
        if (maxPrice) where.price.lte = parseInt(maxPrice as string);
      }

      if (bedrooms) {
        where.bedrooms = parseInt(bedrooms as string);
      }

      // Fetch properties
      const properties = await prisma.property.findMany({
        where,
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Count total for pagination
      const total = await prisma.property.count({ where });

      res.status(200).json({
        properties,
        pagination: {
          total,
          limit: parseInt(limit as string),
          offset: parseInt(offset as string),
          hasMore: parseInt(offset as string) + properties.length < total,
        },
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  } else if (req.method === 'POST') {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const propertyData = req.body;

      // Generate unique slug from title
      const slug = await generatePropertySlug(propertyData.title);

      // Create property
      const property = await prisma.property.create({
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

      res.status(201).json(property);
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
