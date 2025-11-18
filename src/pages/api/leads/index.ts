/**
 * Leads API - POST contact form submissions
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message, propertyId } = req.body;

      // Validation
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create lead
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          subject: subject || null,
          message,
          propertyId: propertyId || null,
          source: 'website',
          status: 'new',
        },
      });

      res.status(201).json({ success: true, lead });
    } catch (error) {
      console.error('Error creating lead:', error);
      res.status(500).json({ error: 'Failed to create lead' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
