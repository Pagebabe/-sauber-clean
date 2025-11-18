/**
 * Email Service - Send email notifications using Nodemailer
 */

import nodemailer from 'nodemailer';
import type { Lead } from '@prisma/client';

// Create reusable transporter
const createTransporter = () => {
  // Use Ethereal for development/testing if no real SMTP configured
  if (!process.env.SMTP_HOST || process.env.NODE_ENV === 'development') {
    console.log('⚠️  Email: Using console logging (no SMTP configured)');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send email notification when new lead is created
 */
export async function sendLeadNotification(lead: Lead): Promise<void> {
  try {
    const transporter = createTransporter();

    // If no transporter (dev mode), just log to console
    if (!transporter) {
      console.log('📧 New Lead Received:', {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
      });
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pw-pattaya.com';

    const mailOptions = {
      from: `"PW Pattaya Website" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🏠 New Lead: ${lead.name}`,
      html: generateLeadEmailHTML(lead),
      text: generateLeadEmailText(lead),
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${adminEmail} for lead #${lead.id}`);
  } catch (error) {
    // Don't throw - email failures shouldn't break the API
    console.error('❌ Failed to send email notification:', error);
  }
}

/**
 * Generate HTML email template for lead notification
 */
function generateLeadEmailHTML(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3d5a6c 0%, #4d748a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #3d5a6c; margin-bottom: 5px; }
    .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #4d748a; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; background: #3d5a6c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏠 New Lead Received</h1>
      <p>Someone contacted you through the website</p>
    </div>

    <div class="content">
      <div class="field">
        <div class="label">👤 Name:</div>
        <div class="value">${lead.name}</div>
      </div>

      <div class="field">
        <div class="label">📧 Email:</div>
        <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
      </div>

      <div class="field">
        <div class="label">📞 Phone:</div>
        <div class="value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
      </div>

      ${lead.propertyId ? `
      <div class="field">
        <div class="label">🏘️ Property ID:</div>
        <div class="value">${lead.propertyId}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="label">💬 Message:</div>
        <div class="value">${lead.message.replace(/\n/g, '<br>')}</div>
      </div>

      <div class="field">
        <div class="label">📍 Source:</div>
        <div class="value">${lead.source}</div>
      </div>

      <div class="field">
        <div class="label">📅 Received:</div>
        <div class="value">${new Date(lead.createdAt).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short'
        })}</div>
      </div>

      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads/${lead.id}" class="button">
          View in Admin Panel
        </a>
      </div>
    </div>

    <div class="footer">
      <p>This email was sent from PW Pattaya Real Estate Website</p>
      <p>Lead ID: ${lead.id} | Status: ${lead.status}</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text email for lead notification
 */
function generateLeadEmailText(lead: Lead): string {
  return `
New Lead Received - PW Pattaya Real Estate

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
${lead.propertyId ? `Property ID: ${lead.propertyId}\n` : ''}
Message:
${lead.message}

Source: ${lead.source}
Status: ${lead.status}
Received: ${new Date(lead.createdAt).toLocaleString()}

View in admin panel:
${process.env.NEXT_PUBLIC_APP_URL}/admin/leads/${lead.id}

Lead ID: ${lead.id}
  `.trim();
}
