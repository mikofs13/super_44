# Edit your portfolio

Edit `src/content/profile.json` for your identity, About, education, experience, skills, certificates and contact. Edit `src/content/projects.json` for projects, screenshots, explanations and repository/live links; see [project guide](24-ADDING-PROJECTS.md).

Use valid JSON: double quotes, commas between entries, no trailing commas or comments. Keep the existing top-level keys. Array order is display order; delete a record to remove it. Empty arrays are allowed. Empty About/education/experience/certificates show honest pending messages.

## Profile fields

- `name`, `role`: your public name and professional role; empty strings retain placeholders.
- `introduction`: paragraph strings, for example `["Your verified personal introduction.", "What you enjoy building."]`.
- `photo`: `{ "src": "/images/profile/me.webp", "alt": "Portrait of your name" }`. Put your actual owned portrait at `public/images/profile/me.webp`. Leave `src` empty for the silhouette.
- `banner`: same image shape; the existing original garage is the default. Supported local formats: WebP, PNG, JPEG and AVIF. Set descriptive alternative text whenever a source is supplied. `/images/` paths omit `public`.
- `education`: records with `institution`, `qualification`, `location`, `period` strings. The first, second and fourth fields must contain text; location may be empty.
- `experience`: records with `organization`, `role`, `period`, `context` strings and `highlights` paragraph strings. Organization, role and period must contain text; context and highlights may be empty.
- `skills`: records with `title` and `items` string arrays. Existing groups and your recent additions are preserved here.
- `certificates`: records with `title`, `issuer`, `date`, `url` strings. Date may be empty; URL may be empty to hide the credential link.
- `contact`: `email`, `message` strings and `links` records with `label`, `url`. Empty email hides the email link. Use public HTTP(S) destinations for links.

Record templates below are instructions, not published claims. Replace all text with your verified details before inserting a record into its array:

```json
{
  "institution": "Your institution",
  "qualification": "Your actual qualification",
  "location": "Your institution's location",
  "period": "Your attendance dates"
}
```

```json
{
  "organization": "Your organization",
  "role": "Your actual role",
  "period": "Your employment dates",
  "context": "Your employment arrangement",
  "highlights": ["An accurate description of your work."]
}
```

```json
{
  "title": "Your certificate title",
  "issuer": "The issuing organization",
  "date": "Your award date",
  "url": ""
}
```

## Review and publish

1. Save the JSON and images. Run `npm run build`; it validates the profile and project schemas, local image existence and URL formats, then exports `out/`.
2. Run `npm run preview` and review `/info/`, `/projects/` and your edited sections at `http://127.0.0.1:3000`. On this Windows host, keep preview in a separate terminal for browser tests. Refresh after each new build.
3. Run `npm run lint`, `npm run typecheck`, `npm run test` and `npm run test:e2e` for relevant verification.
4. Rebuild and deploy with your hosting workflow to publish. Editing files alone does not update the public site. No deployment was performed in this revision.

If port 3000 is occupied, verified PowerShell alternative: `$env:SUPER44_PORT='3100'` followed by `npm run preview`. Set the same variable in the terminal running `npm run test:e2e`.

Build validation cannot prove external links work or personal claims are true. Review destinations, actual text lengths, portrait cropping and mobile layout before publishing. A failed image request shows a fallback while text and navigation remain usable.
