import { defineCollection, z } from 'astro:content';

/**
 * Artists Collection Schema
 *
 * Metadata for each artist in the gallery.
 */
const artists = defineCollection({
  type: 'content',
  schema: z.object({
    // Artist display name
    name: z.string()
      .min(1, 'Artist name is required'),

    // Optional artist profile URL (Facebook, Instagram, etc.)
    profileUrl: z.string()
      .url('Profile URL must be a valid URL')
      .optional(),

    // Optional artist bio/description
    bio: z.string()
      .optional(),
  }),
});

/**
 * Images Collection Schema
 *
 * Minimal schema for image gallery - paths, dimensions, and artist attribution.
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

    // Artist slug (references artists collection)
    artist: z.string()
      .min(1, 'Artist is required'),
  }),
});

/**
 * Export collections configuration
 */
export const collections = {
  artists,
  images,
};
