import { existsSync } from 'node:fs';
import { join } from 'node:path';
import data from './profile.json';
import { validateProfile, type Profile } from './profile-schema';

validateProfile(data);
export const profile: Profile = data;

// Dev can evaluate a profile edit before its files are copied. Let previews
// recover in the browser while keeping missing files a production build error.
if (process.env.NODE_ENV === 'production') {
  const certificatePreviews = profile.certificates.flatMap(entry => entry.preview ? [entry.preview] : []);
  for (const media of [profile.photo, profile.banner, ...certificatePreviews]) {
    if (media.src && !existsSync(join(process.cwd(), 'public', media.src))) {
      throw new Error(`Profile image missing: public${media.src}`);
    }
  }
  for (const entry of profile.certificates) {
    if (entry.document && !existsSync(join(process.cwd(), 'public', entry.document))) {
      throw new Error(`Certificate PDF missing: public${entry.document}`);
    }
  }
}

