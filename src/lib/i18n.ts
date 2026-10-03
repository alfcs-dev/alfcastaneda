import type { Locale } from './cv';

export const ui = {
  en: {
    about: 'About',
    work: 'Selected work',
    workNav: 'Work',
    workNote: 'A few projects I led or shaped, and what changed because of them.',
    outcome: 'Outcome',
    experience: 'Experience',
    experienceNote: 'Over ten years building for the web in Mexico City and Berlin.',
    earlierCareer: 'Earlier career',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    contact: 'Contact',
    contactTitle: "Let's talk",
    contactText: "I'm open to Engineering Manager and Tech Lead roles. Email is the best way to reach me.",
    elsewhere: 'Elsewhere',
    currently: 'Currently',
    at: 'at',
    present: 'Present',
    now: 'now',
    getInTouch: 'Get in touch',
    downloadCv: 'Download CV',
    toggleTheme: 'Toggle light and dark theme',
    backToTop: 'Back to top',
    notFound: 'Page not found',
    backHome: 'Back to home',
  },
  es: {
    about: 'Sobre mí',
    work: 'Proyectos destacados',
    workNav: 'Proyectos',
    workNote: 'Algunos proyectos que lideré o en los que tuve un papel clave, y lo que cambió gracias a ellos.',
    outcome: 'Resultado',
    experience: 'Experiencia',
    experienceNote: 'Más de diez años construyendo para la web en Ciudad de México y Berlín.',
    earlierCareer: 'Experiencia anterior',
    skills: 'Habilidades',
    education: 'Educación',
    languages: 'Idiomas',
    contact: 'Contacto',
    contactTitle: 'Hablemos',
    contactText: 'Estoy abierto a roles de Engineering Manager y Tech Lead. El correo es la mejor forma de contactarme.',
    elsewhere: 'En otros sitios',
    currently: 'Actualmente',
    at: 'en',
    present: 'Actualidad',
    now: 'hoy',
    getInTouch: 'Contáctame',
    downloadCv: 'Descargar CV',
    toggleTheme: 'Cambiar entre tema claro y oscuro',
    backToTop: 'Volver arriba',
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

/** "2019-11", "2021-12" -> "2019–2021"; no end -> "2022–now". */
export function formatYears(start: string, end: string | undefined, locale: Locale): string {
  const from = start.slice(0, 4);
  const to = end ? end.slice(0, 4) : t(locale).now;
  return from === to ? from : `${from}–${to}`;
}
