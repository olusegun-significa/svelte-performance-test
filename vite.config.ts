/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

const myPlugin = {
	name: 'log-request-middleware',
	configureServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) {
		server.middlewares.use((req, res, next) => {
			console.log(`Got request ${req.url}`);
			next();
		});
	}
};

export default defineConfig({
	plugins: [myPlugin, sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
