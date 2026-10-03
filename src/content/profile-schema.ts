export type Media = { src: string; alt: string };
export type Profile = {
  name: string; role: string; introduction: string[]; photo: Media; banner: Media;
  education: { institution: string; qualification: string; location: string; period: string }[];
  experience: { organization: string; role: string; period: string; context: string; highlights: string[] }[];
  skills: { title: string; items: string[] }[];
  certificates: { title: string; issuer: string; date: string; url: string }[];
  contact: { email: string; message: string; links: { label: string; url: string }[] };
};
export function validateProfile(input: unknown): asserts input is Profile {
  const fail = (message: string): never => { throw new Error(`Profile: ${message}`); };
  const object = (value: unknown, path: string): Record<string, unknown> => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${path} must be an object.`);
    return value as Record<string, unknown>;
  };
  const text = (value: unknown, path: string, required = false) => {
    if (typeof value !== 'string' || (required && !value.trim())) fail(`${path} must be ${required ? 'a nonempty' : 'a'} string.`);
  };
  const array = (value: unknown, path: string): unknown[] => {
    if (!Array.isArray(value)) fail(`${path} must be an array.`);
    return value as unknown[];
  };
  const texts = (value: unknown, path: string) => array(value, path).forEach((entry, index) => text(entry, `${path}[${index}]`, true));
  const url = (value: unknown, path: string, optional = false) => {
    text(value, path); if (optional && value === '') return;
    try { const parsed = new URL(value as string); if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) fail(`${path} must be a public http(s) URL.`); }
    catch { fail(`${path} must be a valid http(s) URL.`); }
  };
  const profile = object(input, 'root');
  text(profile.name, 'name'); text(profile.role, 'role'); texts(profile.introduction, 'introduction');
  for (const field of ['photo', 'banner']) {
    const media = object(profile[field], field); text(media.src, `${field}.src`); text(media.alt, `${field}.alt`);
    if (media.src && (!/^\/images\/[a-zA-Z0-9/_-]+\.(webp|png|jpe?g|avif)$/.test(media.src as string) || !(media.alt as string).trim())) fail(`${field} needs a local /images/ path and descriptive alt text.`);
  }
  for (const entry of array(profile.education, 'education')) {
    const row = object(entry, 'education item'); for (const field of ['institution', 'qualification', 'period']) text(row[field], `education.${field}`, true); text(row.location, 'education.location');
  }
  for (const entry of array(profile.experience, 'experience')) {
    const row = object(entry, 'experience item'); for (const field of ['organization', 'role', 'period']) text(row[field], `experience.${field}`, true); text(row.context, 'experience.context'); texts(row.highlights, 'experience.highlights');
  }
  for (const entry of array(profile.skills, 'skills')) { const row = object(entry, 'skills item'); text(row.title, 'skills.title', true); texts(row.items, 'skills.items'); }
  for (const entry of array(profile.certificates, 'certificates')) { const row = object(entry, 'certificate'); text(row.title, 'certificate.title', true); text(row.issuer, 'certificate.issuer', true); text(row.date, 'certificate.date'); url(row.url, 'certificate.url', true); }
  const contact = object(profile.contact, 'contact'); text(contact.email, 'contact.email'); text(contact.message, 'contact.message');
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email as string)) fail('contact.email must be an email address or an empty string.');
  for (const entry of array(contact.links, 'contact.links')) { const row = object(entry, 'contact link'); text(row.label, 'contact.link.label', true); url(row.url, 'contact.link.url'); }
}
