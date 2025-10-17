import { defineCollection, z } from 'astro:content';

/**
 * Images Collection Schema
 *
 * Defines the structure and validation for AI-generated image metadata.
 * All images must include proper metadata for SEO, accessibility, and display.
 */
const images = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string()
      .min(1, 'Title is required')
      .max(100, 'Title must be 100 characters or less'),

    alt: z.string()
      .min(10, 'Alt text must be at least 10 characters for accessibility')
      .max(200, 'Alt text should be concise (max 200 characters)'),

    src: z.string()
      .min(1, 'Image source path is required'),

    width: z.number()
      .positive('Width must be a positive number')
      .int('Width must be an integer'),

    height: z.number()
      .positive('Height must be a positive number')
      .int('Height must be an integer'),

    tags: z.array(z.string())
      .min(1, 'At least one tag is required')
      .max(10, 'Maximum 10 tags per image'),

    createdAt: z.date({
      required_error: 'Creation date is required',
      invalid_type_error: 'Creation date must be a valid date',
    }),

    // Optional fields
    prompt: z.string()
      .max(500, 'Prompt should be max 500 characters')
      .optional(),

    model: z.string()
      .max(100, 'Model name should be max 100 characters')
      .optional(),

    credit: z.string()
      .max(200, 'Credit should be max 200 characters')
      .optional(),
  }),
});

/**
 * Collections Schema (Optional)
 *
 * Defines curated collections of images grouped by theme, style, or category.
 */
const collectionsSchema = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string()
      .min(1, 'Collection title is required')
      .max(100, 'Title must be 100 characters or less'),

    description: z.string()
      .min(10, 'Description should be at least 10 characters')
      .max(500, 'Description should be max 500 characters'),

    coverImage: z.string()
      .min(1, 'Cover image is required'),

    tags: z.array(z.string())
      .min(1, 'At least one tag is required')
      .max(10, 'Maximum 10 tags per collection'),

    createdAt: z.date({
      required_error: 'Creation date is required',
      invalid_type_error: 'Creation date must be a valid date',
    }),

    // Optional fields
    featured: z.boolean()
      .default(false)
      .optional(),
  }),
});

/**
 * Export collections configuration
 * This replaces auto-generated collections and enables TypeScript types
 */
export const collections = {
  images,
  collections: collectionsSchema,
};
