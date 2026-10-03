> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 11 · Performance budgets and adaptation

## Baseline loading budget

All transfer budgets refer to cold-load bytes over the network after normal HTTP compression where applicable. “Initial” ends when primary HTML content is readable, before optional 3D requests. Resource budgets are proposed project gates, not observed measurements.

| Measure | Target |
|---|---|
| Initial route JS, including framework and controls | ≤200KB gzip-equivalent transfer |
| Initial CSS | ≤35KB compressed |
| Initially requested fonts | ≤100KB combined |
| Hero poster | ≤250KB |
| Complete initial route transfer | ≤700KB including HTML and overhead |
| Optional 3D code and decoders | ≤500KB compressed target, measured separately |
| First 3D asset group | ≤2.5MB total |
| Full desktop world assets | ≤6MB cumulative transfer |
| Optional mobile low-quality assets | ≤1.5MB total |

If the selected dependency combination cannot meet a budget, measure the reason, reduce imports or features, and record an explicit revised budget before proceeding. Never quietly exclude framework bytes or decoder files from a report. The website remains usable while optional transfers proceed.

## User-centric metrics

Aim for field p75 LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1, evaluated separately for mobile and desktop where data permits. These are the published good-experience thresholds; a lab run is not proof of field compliance. [Web Vitals](https://web.dev/articles/vitals).

Before field data exists, test a production build under a documented mobile network/CPU profile, repeat five cold runs, and retain the median plus worst result. Inspect interactions manually; a Lighthouse score alone is not a release guarantee.

## Runtime quality profiles

| Profile | DPR cap | Visible triangles | Draw calls target | Lighting/effects |
|---|---|---|---|---|
| Low | 1.0 | 70k | ≤60 | Baked/static; no live shadows or postprocessing |
| Medium | 1.25 | 120k | ≤90 | Environment + simple key; no bloom by default |
| High | 1.5 | 180k | ≤120 | One shadow light; optional measured bloom |
| Static | N/A | 0 | 0 | HTML and responsive posters |

Targets: stable ~60fps on the reference desktop, at least ~30fps on optional low-tier mobile 3D, and responsive HTML interactions in all modes. Record actual device models, browsers, and thermal conditions. Estimate resident texture allocation with an initial target of ≤128MiB; browser tools may not expose total GPU memory reliably. An uncompressed RGBA 2048² texture with mipmaps is roughly 21MiB, so a small downloaded file can still consume substantial memory.

## Adaptive-quality algorithm

Auto desktop begins at Medium. Measure active rendering after warm-up, ignoring hidden-tab samples and asset-loading stalls. Over a five-second moving window, if median frame time exceeds 25ms, drop one tier. After another sustained window above 40ms at Low, switch to poster and offer retry. Use a 10-second cooldown between changes. Do not automatically upgrade during that visit; an explicit retry can re-evaluate. Forced 3D still permits quality reductions and safe fallback.

These are tunable heuristics. Test them against real devices, especially where frame timing includes unrelated page work. Never infer GPU capability solely from screen width, user agent, core count, or memory hints.

## Optimization order

First remove unnecessary work: idle frames, offscreen objects, duplicate resources, excessive lights, high DPR, and expensive materials. Then reduce texture resolution and geometry where visible quality survives. Use instancing for repeated props and share materials. Optimize asset compression only after eliminating waste. Avoid per-frame object allocations and React state changes. [R3F performance pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls).

Pause rendering when the tab is hidden. Dispose owned resources on route exit. If scrolling is inactive and nothing changes, no continuous frames should be requested. Preserve the same page layout when switching between poster and canvas to prevent layout shift.

## Evidence required

Save bundle report, network waterfall, frame trace during all six chapters, a route-exit memory observation, quality-switch recording, and five-run lab results. No exception may compromise working static content, responsive input, or failure recovery.

