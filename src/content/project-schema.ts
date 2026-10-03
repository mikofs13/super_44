export type Project = {
  slug: string;
  title: string;
  status: string;
  summary: string;
  description: string[];
  stack: string[];
  preview: { src: string; alt: string };
  screenshots?: { src: string; alt: string }[];
  links: { repo?: string; live?: string };
};

export function validateProjects(value: unknown): asserts value is Project[] {
  if (!Array.isArray(value)) throw new Error('Projects must be a JSON array.');
  const slugs = new Set<string>();
  for (const entry of value) {
    const fail = (message: string): never => { throw new Error(`Project ${entry?.slug || '(unnamed)'}: ${message}`); };
    if (!entry || typeof entry !== 'object') fail('must be an object.');
    for (const field of ['slug', 'title', 'status', 'summary']) {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) fail(`${field} is required.`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) fail('slug must use lowercase words separated by hyphens.');
    if (slugs.has(entry.slug)) fail('duplicate slug.');
    slugs.add(entry.slug);
    for (const field of ['description', 'stack']) {
      if (!Array.isArray(entry[field]) || !entry[field].length || entry[field].some((text: unknown) => typeof text !== 'string' || !text.trim())) fail(`${field} needs at least one nonempty string.`);
    }
    if (!entry.preview || typeof entry.preview.src !== 'string' || !/^\/images\/[a-zA-Z0-9/_-]+\.(webp|png|jpe?g|avif)$/.test(entry.preview.src)) fail('preview.src must be a local image path under /images/.');
    if (typeof entry.preview.alt !== 'string' || !entry.preview.alt.trim()) fail('preview.alt is required.');
    if (entry.screenshots !== undefined) {
      if (!Array.isArray(entry.screenshots)) fail('screenshots must be an array.');
      for (const image of entry.screenshots) {
        if (!image || typeof image.src !== 'string' || !/^\/images\/[a-zA-Z0-9/_-]+\.(webp|png|jpe?g|avif)$/.test(image.src) || typeof image.alt !== 'string' || !image.alt.trim()) fail('each screenshot needs a local image path and alt text.');
      }
    }
    if (!entry.links || typeof entry.links !== 'object' || Array.isArray(entry.links)) fail('links must be an object.');
    for (const key of Object.keys(entry.links)) {
      if (!['repo', 'live'].includes(key)) fail(`unknown link key ${key}; use repo or live.`);
      try {
        const url = new URL(entry.links[key]);
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) fail(`${key} must be a public http(s) URL.`);
      } catch { fail(`${key} must be a valid http(s) URL, or omit it.`); }
    }
  }
}
