import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			"/ped": "http://localhost:4040/ped",
			"/api": "http://localhost:4040/"
		}
	}
});
