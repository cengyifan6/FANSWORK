import { defineConfig } from 'astro/config';

// Static output is the simplest and most reliable setup for a portfolio on Netlify.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
});
