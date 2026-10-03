# 10 · Asset pipeline and production brief

## Minimum asset inventory

| Asset | Initial target | Delivery |
|---|---|---|
| Generic formula car | ≤70k triangles high; ≤25k low | GLB, shared materials, no official marks |
| Garage shell | ≤40k triangles | Modular GLB; invisible faces removed |
| Combined props | ≤40k visible triangles | Shared atlases, reusable geometry |
| Helmet/shelf detail | ≤10k visible triangles | Simple silhouettes; no character rig |
| Environment lighting | 512–1024px starting resolution | Optimized supported environment asset |
| Hero poster | ≤250KB transfer target | Responsive AVIF/WebP plus fallback |
| Chapter posters | ≤150KB each | Lazy-loaded below fold |
| Project images | ≤200KB preview target | Responsive variants with dimensions |

These are ceilings for planning, not an instruction to use every available triangle. Visible-scene and transfer budgets in [11](11-PERFORMANCE.md) remain authoritative. Include textures and decoder files when computing payload size.

## Asset acquisition brief

Seek a clean generic open-wheel car with editable materials, suitable web redistribution rights, no embedded sponsor marks, and manageable topology. Inspect the wireframe and texture count before purchase or adoption. A free download does not establish permission to redistribute model files through a website.

The environment should be custom modular geometry where practical. Use real project screenshots for screens. Prefer a static portrait/helmet over an animated driver. Source assets are not included with this pack.

## Production pipeline

1. Record creator, source URL, license, permitted uses, attribution, cost, and acquisition date.
2. Import into Blender; verify units, pivots, orientation, normals, UVs, and material slots.
3. Remove unseen internal detail, duplicate materials, excessive bevel segments, and hidden accessories.
4. Create low/medium variants where silhouette survives; inspect close shots before accepting decimation.
5. Bake subtle ambient detail; avoid baking highlights that conflict with runtime lighting.
6. Export glTF/GLB with named nodes and stable material names.
7. Compress geometry with a selected supported method, and textures with KTX2 where tested. Configure matching decoder/transcoder assets before loading.
8. Inspect exported output in a viewer and the actual target renderer. Compare normals, transparency, texture orientation, and color.
9. Measure network size, decode time, visible draw calls, and texture memory; update the manifest.
10. Produce posters from approved camera shots using the same lighting and grade.

Three.js GLTFLoader supports configurable KTX2 and Meshopt integration; the asset format and loader setup must agree. Do not assume a compressed asset will decode without its support files. [GLTFLoader documentation](https://threejs.org/docs/pages/GLTFLoader.html).

## Runtime manifest fields

`id`, `version`, `url`, `loadGroup`, `quality`, `transferBytes`, `triangles`, `materialCount`, `textureDimensions`, `compression`, `sourceRecord`, `poster`, and `lastVerified`. Runtime URLs should be fingerprinted. Load groups: hero, projects, engineering, details. Do not preload every group on initial page load.

## Asset rights record template

| Field | Value to enter |
|---|---|
| Asset ID and author | REPLACE |
| Original source and license file | REPLACE |
| Web redistribution and modification allowed | Verify and record |
| Required public credit | Exact attribution text |
| Derivative changes | Describe modifications |
| Proof location and date | Local record / receipt |

Unclear rights block use of that asset; use owned geometry or a verified alternative. Maintain credits for models, HDRIs, textures, fonts, and audio if added. This is a production provenance process, not a legal conclusion about any particular asset.

## Handoff acceptance

An asset is ready only when its source is recoverable, licensing record is complete, runtime export renders correctly, intended shots are approved, budgets pass, and posters exist. Keep original source files out of `public/`.
