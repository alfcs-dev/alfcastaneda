import { z } from 'astro/zod';
import en from '../data/cv.en.json';

// Dates are "YYYY-MM". A missing `end` means the role is current.
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM');

const link = z.object({
  label: z.string(),
  url: z.url(),
});

const work = z.object({
  company: z.string(),
  position: z.string(),
  location: z.string(),
  start: yearMonth,
  end: yearMonth.optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()).optional(),
  // Compact roles are listed under "Earlier career" with title and dates only.
  compact: z.boolean().optional(),
});

const caseStudy = z.object({
  org: z.string(),
  period: z.string().optional(),
  title: z.string(),
  description: z.string(),
  outcome: z.string(),
});

export const cvSchema = z.object({
  basics: z.object({
    name: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    location: z.string(),
    email: z.email(),
    links: z.array(link),
  }),
  about: z.array(z.string()).min(1),
  caseStudies: z.array(caseStudy),
  work: z.array(work).min(1),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      location: z.string(),
      start: yearMonth,
      end: yearMonth,
    }),
  ),
  skills: z.array(
    z.object({
      group: z.string(),
      items: z.array(z.string()).min(1),
    }),
  ),
  languages: z.array(
    z.object({
      language: z.string(),
      level: z.string(),
    }),
  ),
});

export type CV = z.infer<typeof cvSchema>;
export type Locale = 'en' | 'es';

// Parsing at build time: an invalid CV file fails the build.
const cvs: Partial<Record<Locale, CV>> = {
  en: cvSchema.parse(en),
};

export function getCV(locale: Locale): CV {
  const cv = cvs[locale];
  if (!cv) throw new Error(`No CV data for locale "${locale}"`);
  return cv;
}
