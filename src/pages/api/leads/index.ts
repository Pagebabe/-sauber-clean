/**
 * Leads API - POST contact form submissions
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message, propertyId, source } = req.body;

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
          source: source || 'website',
          status: 'new',
        },
      });

      // Send email notification (fire and forget - don't wait)
      sendLeadNotification(lead).catch((error) => {
        console.error('Failed to send email notification:', error);
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
