> Current milestone: [approved pixel circuit direction](23-PIXEL-CIRCUIT.md) supersedes conflicting 3D landing, palette, camera, and transition requirements below. Preserve HTML, accessibility, native scroll, and failure recovery rules.

# 04 · 3D world plan

## Build a compact stage

Model one workshop approximately 24m wide × 32m long × 6m high, plus a short pit exit. Imply a larger circuit with distant silhouettes and a sky environment. Keep the hero, project bays, engineering bench, shelf, and desk within this shared shell. No full circuit is required.

```text
                    NORTH / +Z
          [pit exit / daylight / contact]
          [driver desk] [display shelf]
          [engineering bench and car]
          [bay 03] [bay 02] [bay 01]
          [starting bay / hero camera]
                    SOUTH / -Z
```

Runtime coordinates: meters, +Y up, +Z garage depth. Vehicle nose points toward +Z. Blender uses its own authoring convention; validate the exported glTF orientation instead of adding unexplained corrective rotations in React. Ground plane is y=0. Car root origin is centered between axles at ground level. Door pivots match their actual movement.

## Greybox camera anchors

These are starting positions for the proposed scale, not final shots. Adjust after testing aspect ratios and content occlusion.

| Chapter | Position (x,y,z) | Look target | Approx. vertical FOV |
|---|---|---|---|
| Hero | (8, 2.2, -12) | (0, 1, -3) | 40° |
| Projects | (9, 2.5, 0) | (-5, 1.5, 5) | 42° |
| Skills | (6, 2.1, 10) | (0, 1.1, 10) | 40° |
| Achievements | (-4, 1.8, 18) | (-8, 1.6, 19) | 42° |
| About | (4, 2, 22) | (8, 1.3, 22) | 42° |
| Contact | (0, 2.5, 25) | (0, 1.7, 38) | 45° |

Store camera position and look-target paths separately. Prefer authored curves with clearance from geometry; inspect the entire path, not only endpoints. No roll, shake, sudden dolly zoom, or forced orbit. Keep content-side negative space in every shot. Mobile uses authored posters rather than squeezing these shots into a portrait viewport.

## Scene inventory

| Asset | Reuse | Story role |
|---|---|---|
| Formula-style car | One shared model | Recognizable identity and engineering subject |
| Garage module | Instanced/repeated shell | Spatial continuity |
| Door | Shared mesh/material | Optional subtle reveal at project chapter |
| Workbench and monitors | Repeated props | Evidence of engineering work |
| Helmet | Single object | Personal presence without expensive character animation |
| Shelf objects | Two or three simple forms | Achievements without spectacle |
| Track markings | Shared texture/decal atlas | Direction and scale |

The driver is represented by a portrait and helmet in v1. A fully animated driver is a separate asset and performance project.

## Lighting and materials

Use one low-resolution environment map, baked ambient detail, and a restrained key/fill setup. High quality may add one shadow-casting light. Strip-light meshes can be emissive without each becoming a dynamic light. Choose one tone-mapping/color-management configuration and validate it across asset previews and production. Keep HTML colors independent from 3D exposure.

Car paint is satin, tire rubber is rough, exposed metal has directional-looking detail without excessive mirror reflection. Keep scratches subtle and scale-correct. Avoid oversized carbon weave. Use fog only to support depth; it must not obscure HTML or compensate for unfinished foreground geometry.

## Scene lifecycle and acceptance

Load the hero shell and car first; defer distant prop groups until near the relevant chapter. Reuse resources rather than duplicating textures for each bay. Keep only the active and adjacent heavy prop groups resident when measured memory warrants it. Never dispose a shared resource while another object uses it.

Approve the greybox before final modeling: every path clears walls, no section is text-obscured, backward scrolling is coherent, and each key shot reads as a silhouette. Approve final assets only against [10](10-ASSET-PIPELINE.md) and [11](11-PERFORMANCE.md).

