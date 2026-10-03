import type { Locale } from './cv';

export const ui = {
  en: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    present: 'Present',
    print: 'Print / Save as PDF',
    notFound: 'Page not found',
    backHome: 'Back to home',
  },
  es: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    skills: 'Habilidades',
    education: 'Educación',
    languages: 'Idiomas',
    present: 'Actualidad',
    print: 'Imprimir / Guardar como PDF',
    notFound: 'Página no encontrada',
    backHome: 'Volver al inicio',
  },
} satisfies Record<Locale, Record<string, string>>;

export function t(locale: Locale) {
  return ui[locale];
}

/** "2022-01" -> "Jan 2022" (or "ene 2022" in Spanish). */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year!, month! - 1)),
  );
}

export function formatRange(start: string, end: string | undefined, locale: Locale): string {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : t(locale).present}`;
}
