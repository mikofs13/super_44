# 21 · Sources and verification notes

## Source policy

Prepared 26 September 2026 using the referenced conversation as concept input and official documentation for technical behavior. The previous assistant's personal-name, location, project, and career examples are not verified facts about the owner. This pack intentionally uses a content workbook instead.

The numbers for transfer size, frame timing, geometry, camera positions, art direction, and schedule are authored project targets. They are not vendor requirements or results from a completed build. No specific dependency version set, accessibility conformance, or performance result is certified by this pack.

## Primary references

| Source | Used for |
|---|---|
| [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Rendering and interactivity boundaries |
| [Next.js Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading) | Optional client scene loading |
| [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports) | Static hosting constraints and route generation |
| [React Three Fiber: Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | Demand rendering, invalidation, resource reuse |
| [React Three Fiber: Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls) | Frame-loop discipline and resource lifecycle |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Native-scroll timeline integration |
| [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()) | Responsive animation setup and cleanup |
| [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) | Compressed glTF loader integrations |
| [Web Vitals](https://web.dev/articles/vitals) | User-centric metrics and field interpretation |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accessibility target and criteria |
| [Understanding Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA target-size scope |
| [Understanding Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | Motion control beyond AA baseline |
| [Barlow Condensed specimen](https://fonts.google.com/specimen/Barlow+Condensed) | Proposed display-face review |
| [Source Sans 3 specimen](https://fonts.google.com/specimen/Source+Sans+3) | Proposed reading-face review |

Framework APIs, browser requirements, package compatibility, hosting behavior, font distribution, and asset licenses can change. Recheck the relevant official source during implementation; pin the versions actually tested. Font links are selection references, not proof that a particular downloaded file's license has been reviewed.

## Pack validation

The delivery validation checks Markdown file inventory, relative file links, code-fence balance, and ZIP integrity. It cannot test an application that has not yet been built. The implementation must supply the runtime, accessibility, and device evidence specified by the testing document.
