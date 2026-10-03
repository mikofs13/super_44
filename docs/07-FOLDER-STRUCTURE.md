# 07 · Folder structure

```text
portfolio/
├── docs/                         # This documentation pack
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Fonts, metadata, global shell
│   │   ├── page.tsx              # Server-rendered landing content
│   │   ├── globals.css           # Reset and semantic design tokens
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── credits/page.tsx
│   │   └── projects/[slug]/page.tsx
│   ├── components/
│   │   ├── ui/                   # Buttons, links, disclosure
│   │   ├── navigation/           # Header, chapter links, mobile menu
│   │   ├── portfolio/            # Semantic landing sections
│   │   └── case-study/            # Reading layout and evidence media
│   ├── experience/
│   │   ├── SceneBoundary.tsx      # Eligibility, poster, error handling
│   │   ├── ExperienceCanvas.tsx   # Client-only canvas
│   │   ├── world/                # Garage, car, benches, shelf
│   │   ├── camera/               # Rig and authored anchor data
│   │   ├── animation/            # Section controller and progress mapping
│   │   ├── quality/              # Capability and adaptation policy
│   │   ├── assets/               # Runtime manifest and load groups
│   │   └── effects/              # Optional measured effects
│   ├── content/
│   │   ├── profile.ts
│   │   ├── projects/             # Typed case-study objects
│   │   ├── skills.ts
│   │   ├── achievements.ts
│   │   └── experience.ts
│   ├── lib/                      # Content validation, URLs, preferences
│   └── types/                    # Shared serializable domain contracts
├── public/
│   ├── models/                   # Optimized release GLBs only
│   ├── textures/                 # Compressed runtime textures
│   ├── decoders/                 # Versioned required decoder files
│   ├── images/                   # Posters, screenshots, social preview
│   ├── fonts/                    # Licensed subsets and license notices
│   └── downloads/                # Accessible current résumé
├── assets-source/                # Editable .blend / image source, not served
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── fixtures/
├── scripts/                      # Content, link and asset-budget validation
├── package.json
├── package-lock.json             # If npm is selected; one lockfile only
├── next.config.ts
├── tsconfig.json
├── playwright.config.ts
├── .env.example                  # Only if configuration requires it
└── README.md                     # Setup, commands, build, troubleshooting
```

## Boundary rules

`content/` imports no UI or browser modules. Shared types do not import Three.js unless they are scene-specific and live under `experience/`. The case-study route must not import the experience barrel. `public/` is publicly accessible: never place unlicensed sources, private evidence, contact secrets, or unused large assets there.

Keep large editable sources in an appropriate asset repository or Git LFS if needed. Record where they live and how release assets are reproduced. Hash runtime filenames when using immutable caching.

## Adding a project

Add one validated content object, optimized screenshot variants with dimensions, and a stable slug. Include it in static route generation and sitemap output. It should automatically appear in project navigation without touching the camera system. The number of visible 3D bays may stay at three while the HTML index grows.

## Adding a chapter

Update the content order, stable anchor, section controller, camera anchor configuration, fallback poster mapping, and navigation tests together. Avoid spreading hardcoded numeric scroll percentages through world components.
