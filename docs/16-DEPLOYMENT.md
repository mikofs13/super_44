# 16 · Deployment and operations

## Deployment model

Baseline: Next.js static export, locally authored content, pre-generated project pages, and direct email contact. Build artifacts are HTML/CSS/JS plus optimized assets. A static CDN host serves them over HTTPS. No database or server-side API is required.

Set the chosen Next.js version's supported static export configuration, pre-generate every published project slug, and define unknown-slug behavior. Verify that metadata routes and image delivery work in the exported output. Runtime server features and the default server image optimizer cannot simply be assumed in a static deployment. [Official static-export guide](https://nextjs.org/docs/app/guides/static-exports).

## Environments

Local development for authoring; pull-request previews for review; production for the public domain. Preview deployments should carry noindex directives/headers and be access-restricted if they contain private draft content. Production canonical URLs, sitemap entries, and social links must use the real public domain, never the preview host.

Default project configuration should require only public site metadata. If an optional service introduces secrets, keep them in the provider's secret store; never put them in a `NEXT_PUBLIC_` value, static file, source control, or generated client bundle.

## Release procedure

1. Select the hosting provider and document its build command, publish directory, Node version, compression, cache, and routing behavior.
2. Build from the committed lockfile; run the gates in [15](15-TESTING.md).
3. Deploy a preview and test direct nested URLs, refresh, missing routes, static assets, decoder MIME types, and external links.
4. Verify cache headers, HTTPS, canonical metadata, social preview, robots, and sitemap.
5. Complete [18](18-LAUNCH-CHECKLIST.md) against this preview.
6. Promote the same reviewed build to production; verify the public domain and certificate.
7. Run a short smoke test on home, direct case study, contact, résumé, and forced Static view.
8. Retain the previous deploy and its asset set for immediate rollback.

Provider commands are intentionally not hardcoded before a provider is selected. Use its documented preview/promotion/rollback mechanism and record the exact steps in the implementation repository README.

## Caching and headers

Fingerprint immutable JS, models, textures, and images; cache these long-term with immutable semantics. Keep HTML on a short/revalidated cache policy so new releases can discover new asset names. Never overwrite the bytes at an immutable URL. Keep earlier release assets available while older HTML can still reference them.

Serve proper MIME types for GLB, KTX2, WASM decoders, fonts, and images. Prefer same-origin assets; if external storage is required, validate CORS and all required subresources. Set appropriate content-type protection and referrer policy. Introduce a tested Content Security Policy; account for any decoder workers/WASM requirements instead of broadly allowing every origin.

## Rollback

Trigger rollback for broken primary journeys, broad scene crashes without recovery, missing assets, or incorrect/private published content. Promote the previous known-good deployment, verify core routes, then investigate in a preview. Do not patch hashed files in place. Keep a documented contact path to the hosting account owner.

## Monitoring and maintenance

After launch review first-day errors and asset failures, then recheck after one week. If analytics is added, track a minimal set such as case-study opens, contact clicks, scene failures, and view choices without message content or personal identifiers. A contact click is an intent signal, not proof that an email was sent. Apply appropriate disclosure/consent decisions for the selected tooling and audience.

Monthly: check links, error reports, dependency advisories, and build reproducibility. Quarterly: review content and device performance. Preserve source assets and deployment access recovery information. Avoid adding analytics merely to decorate the portfolio with statistics.
