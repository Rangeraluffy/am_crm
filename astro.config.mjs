import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  experimental: {},
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "pt-br", "es"]
  },
  output: "server",
  adapter: vercel()
});