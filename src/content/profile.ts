import { existsSync } from 'node:fs';
import { join } from 'node:path';
import data from './profile.json';
import { validateProfile, type Profile } from './profile-schema';
validateProfile(data);
for (const media of [data.photo, data.banner]) if (media.src && !existsSync(join(process.cwd(), 'public', media.src))) throw new Error(`Profile image missing: public${media.src}`);
export const profile: Profile = data;

