# UnwhelmNet 2.0

A proof-first redesign of unwhelm.net.

This version keeps the established UnwhelmNet technical tone—Sora/Inter typography, mono accents, restrained color, and engineering-board surfaces—but changes the information architecture so working systems and demonstrations appear before broad service marketing.

## Design goals

- Put real demonstrations near the top of the site.
- Present Edmund Landgraf / UnwhelmNet as a hands-on senior software and integration engineer rather than a generic consultancy.
- Make APIs, integrations, AI guardrails, cloud/on-prem infrastructure, and operational automation the core story.
- Surface AMBA and other public engineering work as technical proof.
- Preserve the property-management integration specialization without making it the only identity.
- Avoid unverifiable scale claims and generic testimonials.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Route parity

Legacy /videos and /documents paths are rebuilt as first-class routes in this app so production users do not need to leave the new site for old content pages. Copy and wording can be expanded later without changing the route contract.

## Video assets

The first version streams the existing UnwhelmNet demo videos from `https://unwhelm.net/assets/` so the new repository can remain lightweight. Before replacing the existing production deployment, copy the four source MP4 files into `public/assets/` and change the video URLs in `src/App.tsx` to relative paths.

## Stack

- React
- TypeScript
- Vite
- Lucide React
- Hand-authored CSS design system
