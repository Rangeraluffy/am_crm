import { defineConfig } from 'astro/config';

export default defineConfig({
  experimental: {
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "pt-br", "es"],
  },
})