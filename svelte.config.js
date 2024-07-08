import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '$components': 'src/components',
      '$routes': 'src/routes'
    }
  }
};

export default config;
