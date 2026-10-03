# 08 · Content strategy

## Editorial priority

Lead with a clear role and useful work. Motorsport supplies setting and secondary labels; technical credibility comes from evidence. Write direct sentences in the owner's voice. Avoid “world-class,” unsupported expertise, decorative skill percentages, and fictional metrics.

Hero pattern: **[Name] / [Specific role] / I build [type of product] for [kind of need].** Primary action: “View projects.” Secondary action: “Contact me.” Keep the value statement below roughly 25 words. The name, location, and sample projects mentioned by the previous assistant are not verified personal facts.

## Content requirements

| Item | Required material | Suggested length |
|---|---|---|
| Featured project | Problem, role, stack, result, screenshot, case study | 40–70-word preview |
| Case study | Constraints, decisions, implementation, evidence, limits | 600–1,200 words if warranted |
| Skill group | Skills used and supporting project links | 2–4 lines per group |
| Achievement | Issuer, date, significance, proof when public | 25–50 words |
| About | Motivation, focus, working approach | 100–180 words |
| Experience | Organization, role, dates, contribution | 2–3 useful bullets per entry |
| Contact | Real address, verified profiles, optional availability | One clear invitation |

Three well-supported projects are preferable to many empty entries. If fewer are ready, launch with fewer and adjust the physical bays. Never fabricate achievements to fill the shelf.

## Serializable project contract

```ts
interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: { start: string; end?: string }; // ISO date strings
  teamContext: string;
  stack: string[];
  problem: string;
  constraints: string[];
  decisions: { choice: string; reason: string; tradeoff: string }[];
  outcome: { statement: string; evidence?: string; limitations: string };
  media: { src: string; alt: string; width: number; height: number; caption?: string }[];
  links: { demo?: string; source?: string };
  featured: boolean;
}
```

Use structured blocks for longer case studies if necessary; keep the public metadata serializable. Build validation rejects duplicate slugs, missing titles, invalid URLs, nonexistent images, impossible dates, and published placeholders. URL existence checks supplement schema validation.

## Case-study narrative

1. Show what the project does, for whom, and your contribution.
2. Explain constraints: data, time, budget, team size, or platform.
3. Compare meaningful alternatives and why you selected one.
4. Show architecture only to explain a decision or limitation.
5. Present results with measurement method, sample, baseline, and date where applicable.
6. Explain remaining limitations and what you would improve.
7. Link to a functioning demo/source or honestly state why it is unavailable.

If a metric is unmeasured, use a factual qualitative result. Distinguish team outcomes from individual contributions. Remove private data from screenshots and obtain permission for employer or client work before publication.

## Skill taxonomy

Suggested groups: Interface engineering, Services and APIs, Data systems, Delivery and operations, and Applied ML only if supported by actual work. Secondary labels may be Control systems, Power unit, Telemetry, Pit operations, and Race strategy. Every highlighted skill should link to evidence rather than rely on a proficiency bar.

## Search and sharing

Give every case study a unique page title, description, canonical URL, and useful social image. Use one H1 per route, descriptive links, accurate image alt text, and actual text rather than canvas lettering. Generate sitemap entries from published content. Add structured data only when it truthfully matches the published person/project information.

Maintain content quarterly or after significant work: verify links, résumé, dates, availability, project status, and claims. Record last review dates in the workbook.

## Current project editor contract

For this single-scene milestone, the implemented authoring contract is [Adding projects](24-ADDING-PROJECTS.md), backed by src/content/projects.json. It uses slug, title, status, summary, description paragraphs, stack, local preview with alternative text, and optional repo/live links. The richer long-form schema above remains a future editorial target, not the current required input. Each record produces a card and an in-window detail view with a shareable #project-SLUG route; standalone routes are not generated. Build validation checks missing local images, duplicate slugs, required content and URL syntax. External reachability is checked manually.
