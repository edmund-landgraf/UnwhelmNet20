import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { contactApiMiddleware } from "./server/contact-email.mjs";


function contactApiPlugin(): Plugin {
  const attach = (server: { middlewares: { use: (handler: typeof contactApiMiddleware) => void } }) => {
    server.middlewares.use(contactApiMiddleware);
  };

  return {
    name: "contact-api",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig({
  plugins: [contactApiPlugin(), react()],
  server: {
    port: 5192,
    strictPort: true
  },
  preview: {
    port: 5192,
    strictPort: true
  }
});
