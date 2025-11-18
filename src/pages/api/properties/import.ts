/**
 * API Endpoint: Bulk Property Import
 * POST /api/properties/import
 * Imports multiple properties with Google Drive image download
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import { processPropertyImages } from '@/lib/imageDownloader';
import type { ParsedProperty } from '@/lib/importParser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { properties } = req.body as { properties: ParsedProperty[] };

    if (!properties || !Array.isArray(properties)) {
      return res.status(400).json({ error: 'Invalid request: properties array required' });
    }

    const results = {
      success: [] as string[],
      failed: [] as { property: string; error: string }[],
      total: properties.length,
    };

    // Import each property
    for (const property of properties) {
      try {
        // 1. Download images from Google Drive (if any)
        let processedImages: string[] = [];
        if (property.images && property.images.length > 0) {
          console.log(`Downloading ${property.images.length} images for ${property.title}...`);
          processedImages = await processPropertyImages(property.images);
        }

        // 2. Create property in database
        const createdProperty = await prisma.property.create({
          data: {
            // Basic Info
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            propertyType: property.propertyType,
            listingType: property.listingType,
            status: property.status,

            // Owner Info
            ownerName: property.ownerName,
            ownerLine: property.ownerLine,
            ownerPhone: property.ownerPhone,
            ownerEmail: property.ownerEmail,
            ownerType: property.ownerType,

            // Listing Details
            commission: property.commission,
            shortTermLet: property.shortTermLet,
            quota: property.quota,
            landSize: property.landSize,

            // Features (arrays)
            views: property.views,
            privateFeatures: property.privateFeatures,
            roomsSpaces: property.roomsSpaces,
            communalFacilities: property.communalFacilities,
            technicalEquipment: property.technicalEquipment,
            security: property.security,
            locationFeatures: property.locationFeatures,

            // Kitchen & Layout
            furnishingStatus: property.furnishingStatus,
            kitchenFeatures: property.kitchenFeatures,
            layoutFeatures: property.layoutFeatures || [],

            // Financial
            maintenanceCharges: property.maintenanceCharges,
            commonAreaFee: property.commonAreaFee,
            transferCosts: property.transferCosts,

            // Availability
            availableFrom: property.availableFrom,
            specialRemarks: property.specialRemarks,

            // Images (processed/downloaded)
            images: processedImages,

            // Old features field for compatibility
            features: [
              ...property.views,
              ...property.privateFeatures,
              ...property.roomsSpaces,
            ],

            // Import tracking
            importSource: property.importSource || 'google-sheets-import',
            importDate: new Date(),
          },
        });

        results.success.push(createdProperty.id);
        console.log(`✓ Imported: ${property.title} (ID: ${createdProperty.id})`);
      } catch (error: any) {
        console.error(`✗ Failed to import ${property.title}:`, error);
        results.failed.push({
          property: property.title,
          error: error.message || 'Unknown error',
        });
      }
    }

    // Return results
    return res.status(200).json({
      message: 'Import completed',
      results: {
        total: results.total,
        success: results.success.length,
        failed: results.failed.length,
        successIds: results.success,
        errors: results.failed,
      },
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return res.status(500).json({
      error: 'Import failed',
      message: error.message,
    });
  }
}
