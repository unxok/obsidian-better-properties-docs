import { defineConfig } from "@solidjs/start/config";
export default defineConfig({
	server: {
		preset: "cloudflare_module",
		compatibilityDate: "2025-09-18",
	},
});
