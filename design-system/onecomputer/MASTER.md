# ONEComputer public design system

The public site should feel like the ONEComputer application at editorial
scale—not like an unrelated cybersecurity campaign.

## Product tokens

| Role | Value |
| --- | --- |
| Page background | `#1f1e1d` |
| Deep background / sidebar | `#171615` / `#1a1918` |
| Card surface | `#272625` |
| Primary text | `#f5f5f3` |
| Muted text | `#aaa7a2` |
| Border | `#3b3937` |
| Brand / enforcement | `#19ba5d` |
| Warning | `#e5ad41` |
| Danger | `#e05b55` |
| Standard radius | `8–10px` |

Typography is local Geist for product and editorial copy, with Geist Mono for
eyebrows, state, and evidence labels. Large headings may be expressive, but
controls and captures must preserve the product's compact proportions.

## Visual principles

1. Lead with the real product. Use deployed screenshots and name the surface.
2. Explain trust through separation: ONEComputer runs workflow; OpenVTC holds
   identity, signing authority, Trust Tasks, and evidence.
3. Use motion to clarify transitions and state, never as ambient noise.
4. Use green only for brand, verified state, enforcement, and primary actions.
5. Prefer quiet borders and warm charcoal depth to neon glow or blue gradients.
6. Keep technical claims specific, auditable, and free of roadmap language.

## Motion language

- Framer Motion owns page reveals, product-state transitions, scroll progress,
  the approval path, and small interaction feedback.
- Default easing: `[0.22, 1, 0.36, 1]`.
- Interaction transitions should finish in roughly 180–300 ms; editorial reveals
  may take 550–800 ms.
- Honor the operating system's reduced-motion preference and never depend on
  animation to communicate required content.

## Product captures

- Show a browser or application frame only when it gives useful context.
- Do not invent dashboards or metrics.
- Cover internal test identifiers in the presentation layer; do not silently
  alter the source image.
- Captions must identify captures as coming from the deployed cloud build.

## Accessibility and responsive requirements

- Preserve visible keyboard focus and semantic buttons, links, tabs, and panels.
- Maintain WCAG AA text contrast.
- Verify at 375, 768, 1024, and 1440 px widths.
- Avoid horizontal page overflow; horizontal scrolling is permitted only inside
  a clearly bounded product-tab control on small screens.
- Fixed navigation must not cover linked section headings.

## Forbidden patterns

- Cyberpunk, glitch, scanline, Matrix, or terminal cosplay
- Generic stock imagery or generated product screenshots
- Decorative metric claims without evidence
- Approval controls that imply ONEComputer can sign its own high-risk actions
- Hidden focus states, hover-only information, and motion without a reduced mode
