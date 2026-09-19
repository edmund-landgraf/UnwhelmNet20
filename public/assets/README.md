# Video assets

The redesign currently streams the existing UnwhelmNet MP4s from the live site:

- net-core-api-full.mp4
- VectorDB.mp4
- UnwhelmNetChatRAG.mp4
- unwhelmNodeNet_ContactUs.mp4

Before replacing the current unwhelm.net deployment with this repository, copy those files into this directory and change the demo `source` values in `src/App.tsx` from absolute `https://unwhelm.net/assets/...` URLs to `/assets/...`.
