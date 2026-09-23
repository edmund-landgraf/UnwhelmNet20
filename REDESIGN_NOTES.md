# UnwhelmNet 2.0 redesign notes

## What changed

The old site led with broad consultancy positioning and made visitors work to find technical proof. This redesign reverses that order:

1. Clear positioning and direct engineering ownership.
2. Working video demonstrations immediately after the hero.
3. Inspectable public engineering projects.
4. Plain-language capability areas.
5. Domain specialization.
6. Method / customer-conversation approach.
7. About and contact.

## What stayed

- Sora display type, Inter body type, JetBrains Mono technical accents, and a restrained warm/teal engineering palette.
- "Unwhelm your tech stack" brand language.
- Property-management integration specialization.
- AI, API, data, cloud and automation themes.
- Existing contact information.

## What was deliberately removed from the homepage

- The ambiguous "Serving 50+ SMBs" claim.
- Generic testimonial blocks that are difficult for a visitor to independently verify.
- Long menus with many overlapping capability pages.
- AI buzzword density without immediate demonstrations.

## Video migration note

The staged redesign streams the current production videos from `https://unwhelm.net/assets/`. Before this repository replaces the existing production site, migrate those MP4s to `public/assets/` and switch the sources in `src/App.tsx` to relative paths.
