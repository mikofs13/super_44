# 13 · Accessibility

## Target and scope

Target WCAG 2.2 AA for the published website, with additional reduced-motion support as a deliberate product requirement. Do not claim conformance until manual and automated checks cover the final content and interactions. The canvas remains decorative, and all meaningful information and controls live in HTML. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Required behavior

| Area | Implementation rule | Verification |
|---|---|---|
| Structure | Landmarks, logical headings, one route H1 | Inspect document outline and screen reader navigation |
| Keyboard | Every action accessible without pointer | Complete primary journeys with Tab/Shift+Tab/Enter/Space |
| Focus | Strong visible indicator; never obscured by sticky header | Navigate at zoom and after anchor jumps |
| Contrast | Normal text ≥4.5:1; large text ≥3:1; required UI indicators ≥3:1 | Measure actual rendered combinations |
| Targets | Project goal 44×44px; meet AA minimum/spacing rules | Check compact layouts manually |
| Motion | Static mode, reduced-motion response, no forced camera travel | Toggle OS preference during session |
| Images | Useful alt for content; empty alt for decoration | Read page without images |
| Links | Descriptive purpose; identify downloads | Inspect links list in screen reader |
| Loading | Nonblocking, concise status, recovery action | Throttle/abort assets |

WCAG 2.2 AA target size criterion is 24×24 CSS px with exceptions and spacing provisions; 44×44 is this project's more generous control target. Disabling interaction-triggered animation goes beyond the AA baseline but is required by this plan. [Target size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

## Canvas and HTML

Hide the purely decorative canvas from the accessibility tree and do not give it focus. Provide equivalent HTML project imagery where that imagery conveys product information. Keep all navigation above the canvas in both stacking order and pointer behavior. Never duplicate an interactive screen-reader interface inside the canvas.

Text must remain selectable and visible without animation scripts. Do not initialize meaningful text to opacity zero in baseline CSS. Set `scroll-margin-top` for destination sections so sticky navigation cannot obscure headings. If custom anchor handling is introduced, move focus to the destination heading appropriately without adding it to normal tab order.

## Announcements and route changes

Announce load success/failure only when useful, using a polite status region. Do not announce scroll progress or chapter changes continuously. After client-side route changes, ensure the new page title and main heading are discoverable; verify the framework's behavior before adding duplicate announcements. Preserve focus and scroll appropriately on browser Back.

The mobile menu is an inline disclosure: its toggle exposes expanded state and controls ID. Hidden items must not remain tabbable. Do not apply modal semantics or focus trapping to an inline disclosure.

## Reading, contact, and résumé

Support 200% zoom and reflow at 320 CSS px. Do not disable user scaling. Keep paragraph widths comfortable and body text at least the design-system size. Email copy controls announce success or failure; the address remains visible and selectable if clipboard access fails. Résumé downloads identify format and file size, and the PDF should have readable text, headings, and sensible reading order.

## Manual release pass

Use NVDA with a supported Windows browser and VoiceOver with Safari where available. Test all links, view controls, menu state, error recovery, and case-study structure. Also test keyboard only, no JavaScript, reduced motion, increased text size, and forced-colors/high-contrast mode. Automated checks are useful but do not establish complete accessibility.
