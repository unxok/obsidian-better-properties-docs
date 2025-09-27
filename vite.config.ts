import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import rehypeSlug from "rehype-slug";
import rehypeMdxToc from "rehype-mdx-toc";

export default defineConfig({
	plugins: [
		mdx({ rehypePlugins: [rehypeSlug, rehypeMdxToc] }),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
	],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./app"),
		},
	},
});
