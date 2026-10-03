# Add a project to Super 44

Projects are maintained in **src/content/projects.json**. No database or admin login is needed. Changes become public after a new build and deployment; the site itself is not an upload dashboard.

1. Put a screenshot in **public/images/projects/**. Prefer an optimized WebP around 1600 × 900 or 800 × 450; keep it below 300 KB where practical. Only use images you can publish.
2. Copy the existing object in **src/content/projects.json**, adding a comma between objects.
3. Give it a unique lowercase hyphenated `slug`. Fill out the fields below with your real information.
4. Run `npm run build` to validate the data and export the website. Run `npm run preview` and open http://127.0.0.1:3000/projects/ to review it. If preview is already running, refresh it after building. Deploy the updated build using your normal hosting workflow.

Example template only, replace every example before adding it:

```json
{
  "slug": "my-project",
  "title": "My project name",
  "status": "Completed",
  "summary": "One or two sentences explaining what the project does and who it helps.",
  "description": [
    "Explain the problem and what you built.",
    "Explain your contribution, an important decision, and the result. Only include outcomes you can support."
  ],
  "stack": ["React", "TypeScript"],
  "preview": {
    "src": "/images/projects/my-project.webp",
    "alt": "Describe the actual interface visible in your screenshot"
  },
  "links": {
    "repo": "https://github.com/YOUR-USERNAME/YOUR-REPOSITORY",
    "live": "https://YOUR-PROJECT.example"
  }
}
```

- Array order controls display order. Delete an object to remove a project.
- `summary` appears on the card. Each `description` item becomes a paragraph in the detail view.
- `preview.src` omits `public`: `/images/projects/my-project.webp` corresponds to `public/images/projects/my-project.webp`.
- `repo` and `live` are optional. Omit an unavailable key, or use `"links": {}`. Do not use empty URLs or `#` placeholders. Private repositories can be omitted.
- Repo and demo links open in a new tab; the visitor keeps their place in the garage.
- The preview and Explore the build link open the project inside the existing portfolio window, at `/projects/#project-my-project`. Refresh and browser Back/Forward work. Keep slugs stable if you share these URLs.
- The build checks required text, unique slugs, image paths and files, alternative text, and URL format. It does not prove external URLs exist or that their content is correct; open them before publishing.
- An image request failure displays Preview unavailable while the text and links remain usable.

The seeded Super 44 entry has no repo/demo URL because those addresses have not been supplied. Add them to its `links` object when ready. No fictional projects or personal claims are included.

## Current presentation
The current window displays project cards at `/projects/`, opening each explanation within the same window. Share `/projects/#project-my-project`. Optional `screenshots` data is validated and retained, but the current single-preview presentation does not render a gallery. See [current specification](27-REFERENCE-PROFILE-AND-CONTENT.md). Personal sections use the separate [profile editing guide](28-EDITING-CONTENT.md).
