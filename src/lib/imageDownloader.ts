/**
 * Google Drive Image Downloader
 * Downloads images from Google Drive URLs and saves them locally
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { randomUUID } from 'crypto';

/**
 * Convert Google Drive sharing URL to direct download URL
 * @param url - Google Drive sharing URL
 * @returns Direct download URL
 */
export function convertGoogleDriveUrl(url: string): string | null {
  // Handle various Google Drive URL formats:
  // https://drive.google.com/file/d/FILE_ID/view
  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID

  let fileId: string | null = null;

  // Format 1: /file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    fileId = match1[1];
  }

  // Format 2: ?id=FILE_ID
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) {
    fileId = match2[1];
  }

  if (!fileId) {
    console.warn('Could not extract file ID from Google Drive URL:', url);
    return null;
  }

  // Return direct download URL
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Download image from URL and save to local filesystem
 * @param url - Image URL (can be Google Drive URL)
 * @param destinationDir - Directory to save image (default: public/uploads/properties)
 * @returns Promise with local file path
 */
export async function downloadImage(
  url: string,
  destinationDir: string = path.join(process.cwd(), 'public', 'uploads', 'properties')
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Convert Google Drive URL if needed
    let downloadUrl = url;
    if (url.includes('drive.google.com')) {
      const converted = convertGoogleDriveUrl(url);
      if (!converted) {
        reject(new Error(`Invalid Google Drive URL: ${url}`));
        return;
      }
      downloadUrl = converted;
    }

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Generate unique filename
    const fileExtension = '.jpg'; // Default to jpg
    const filename = `${randomUUID()}${fileExtension}`;
    const filePath = path.join(destinationDir, filename);

    // Download file
    const file = fs.createWriteStream(filePath);

    https
      .get(downloadUrl, (response) => {
        // Handle redirects (Google Drive often redirects)
        if (response.statusCode === 302 || response.statusCode === 301) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            https
              .get(redirectUrl, (redirectResponse) => {
                redirectResponse.pipe(file);

                file.on('finish', () => {
                  file.close();
                  // Return path relative to public directory
                  const relativePath = `/uploads/properties/${filename}`;
                  resolve(relativePath);
                });
              })
              .on('error', (err) => {
                fs.unlink(filePath, () => {});
                reject(err);
              });
          } else {
            reject(new Error('Redirect without location header'));
          }
        } else {
          response.pipe(file);

          file.on('finish', () => {
            file.close();
            const relativePath = `/uploads/properties/${filename}`;
            resolve(relativePath);
          });
        }
      })
      .on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });

    file.on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

/**
 * Download multiple images from URLs
 * @param urls - Array of image URLs
 * @returns Promise with array of local file paths
 */
export async function downloadImages(urls: string[]): Promise<string[]> {
  const downloadPromises = urls.map((url) => {
    return downloadImage(url).catch((error) => {
      console.error(`Failed to download image from ${url}:`, error);
      return url; // Return original URL if download fails
    });
  });

  return Promise.all(downloadPromises);
}

/**
 * Process property images during import
 * Downloads Google Drive images and returns local paths
 * @param imageUrls - Array of image URLs (Google Drive or direct URLs)
 * @returns Array of local image paths
 */
export async function processPropertyImages(imageUrls: string[]): Promise<string[]> {
  const localPaths: string[] = [];

  for (const url of imageUrls) {
    try {
      // Only download if it's a Google Drive URL
      if (url.includes('drive.google.com')) {
        const localPath = await downloadImage(url);
        localPaths.push(localPath);
        console.log(`✓ Downloaded: ${url} → ${localPath}`);
      } else {
        // Keep direct URLs as-is
        localPaths.push(url);
        console.log(`ℹ Keeping direct URL: ${url}`);
      }
    } catch (error) {
      console.error(`✗ Failed to download ${url}:`, error);
      // Keep original URL if download fails
      localPaths.push(url);
    }
  }

  return localPaths;
}
