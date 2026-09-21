import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { destinations, interests } from './data/taxonomy';

const destinationIds = new Set(Object.keys(destinations));
const interestIds = new Set(Object.keys(interests));

const durationSchema = z.object({
  min: z.number().int().positive().optional(),
  ideal: z.number().int().positive(),
  max: z.number().int().positive().optional()
});

const heroImageSchema = z.object({
  src: z.string().min(1), alt: z.string().min(5), source: z.string().min(2), creator: z.string().min(2),
  sourceUrl: z.string().url(), license: z.string().min(2), downloaded: z.coerce.date(),
  status: z.enum(['spike', 'approved']).optional()
}).optional();

const heroVideoSchema = z.object({
  src: z.string().min(1), poster: z.string().min(1), source: z.string().min(2), creator: z.string().min(2),
  sourceUrl: z.string().url(), license: z.string().min(2), reviewed: z.coerce.date(), status: z.enum(['spike', 'approved'])
}).optional();

const commonSchema = z.object({
  title: z.string().min(10),
  heroTitle: z.string().min(4).max(80).optional(),
  description: z.string().min(50).max(180),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  country: z.string().min(2),
  destination: z.string().refine((value) => destinationIds.has(value), 'Unknown destination'),
  interests: z.array(z.string().refine((value) => interestIds.has(value), 'Unknown interest')).min(1),
  duration: durationSchema,
  targetProfile: z.array(z.string()).default(['komfortorientiert', 'individualreisend']),
  commercialIntent: z.array(z.enum(['hotel', 'tickets', 'tours', 'rental-car', 'none'])).default(['none']),
  datePublished: z.coerce.date(), dateReviewed: z.coerce.date(), reviewAfter: z.coerce.date(),
  status: z.enum(['draft', 'review', 'published']),
  heroImage: heroImageSchema, heroVideo: heroVideoSchema,
  affiliateDisclosure: z.boolean().default(false),
  sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
  editorialApproval: z.boolean().default(false),
  editorialGateVersion: z.union([z.literal(2), z.literal(3)]).optional(),
  spatialExperienceVersion: z.literal(1).optional()
});

const destinationsCollection = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/destinations' }), schema: commonSchema.extend({ type: z.literal('destination') }) });
const guides = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }), schema: commonSchema.extend({ type: z.literal('guide') }) });
const decisions = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/decisions' }), schema: commonSchema.extend({ type: z.literal('decision') }) });

export const collections = { destinations: destinationsCollection, guides, decisions };
