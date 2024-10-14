import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['test/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['test/vitest.setup.ts']
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
