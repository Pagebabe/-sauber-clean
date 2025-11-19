/**
 * Image Upload API
 * Handles image uploads to Cloudinary
 *
 * Setup:
 * 1. Install: npm install cloudinary
 * 2. Add to .env:
 *    CLOUDINARY_CLOUD_NAME=your-cloud-name
 *    CLOUDINARY_API_KEY=your-api-key
 *    CLOUDINARY_API_SECRET=your-api-secret
 * 3. Sign up at: https://cloudinary.com/
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parsing, we'll use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

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

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({
      error: 'Cloudinary not configured',
      message: 'Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file'
    });
  }

  try {
    // Parse form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 1,
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      }
    );

    // Get the uploaded file
    const fileArray = files.file;
    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

    // Validate file type
    if (!file.mimetype?.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'pw-pattaya/properties',
      resource_type: 'image',
      transformation: [
        { width: 1920, height: 1080, crop: 'limit' }, // Max size
        { quality: 'auto:good' }, // Auto quality optimization
        { fetch_format: 'auto' }, // Auto format (WebP if supported)
      ],
    });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    // Return Cloudinary URL
    res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error.message || 'Unknown error occurred'
    });
  }
}
