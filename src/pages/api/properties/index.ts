/**
 * Properties API - GET all properties with filters
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
