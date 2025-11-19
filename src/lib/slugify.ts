/**
 * Slug Generation Utilities
 * Generate URL-friendly slugs from titles
 */

import { prisma } from '@/lib/prisma';

/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 *
 * @example
 * slugify("Luxury Beach Condo in Pattaya") // "luxury-beach-condo-in-pattaya"
 * slugify("2-Bedroom Apartment @ Jomtien!") // "2-bedroom-apartment-jomtien"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generate a unique slug for a property
 * @param title - Property title
 * @param propertyId - Optional property ID (for updates, to exclude self from uniqueness check)
 * @returns A unique slug
 *
 * @example
 * await generatePropertySlug("Beach Condo") // "beach-condo" or "beach-condo-2" if exists
 */
export async function generatePropertySlug(title: string, propertyId?: string): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Check if slug exists (excluding current property if updating)
    const existing = await prisma.property.findFirst({
      where: {
        slug,
        id: propertyId ? { not: propertyId } : undefined,
      },
    });

    if (!existing) {
      return slug;
    }

    // Slug exists, try with counter
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * Generate a unique slug for a project
 * @param name - Project name
 * @param projectId - Optional project ID (for updates, to exclude self from uniqueness check)
 * @returns A unique slug
 *
 * @example
 * await generateProjectSlug("Luxury Villa Complex") // "luxury-villa-complex" or "luxury-villa-complex-2" if exists
 */
export async function generateProjectSlug(name: string, projectId?: string): Promise<string> {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Check if slug exists (excluding current project if updating)
    const existing = await prisma.project.findFirst({
      where: {
        slug,
        id: projectId ? { not: projectId } : undefined,
      },
    });

    if (!existing) {
      return slug;
    }

    // Slug exists, try with counter
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}
