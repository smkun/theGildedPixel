import { defineCollection, z } from 'astro:content';

/**
 * Images Collection Schema
 *
 * Minimal schema for image gallery - just paths and dimensions.
 * No labels, tags, or text content needed.
 */
const images = defineCollection({
  type: 'content',
  schema: z.object({
    // Image source path (WebP format)
    src: z.string()
      .min(1, 'Image source path is required'),

    // Dimensions for aspect ratio calculation
    width: z.number()
      .positive('Width must be a positive number')
      .int('Width must be an integer'),

    height: z.number()
      .positive('Height must be a positive number')
      .int('Height must be an integer'),
  }),
});

/**
 * Export collections configuration
 */
export const collections = {
  images,
};
