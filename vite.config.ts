import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypeSlug from "rehype-slug";
import rehypeMdxToc from "rehype-mdx-toc";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import recmaExportFilepath from "recma-export-filepath";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		mdx({
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				rehypeMdxToc,
				rehypeAutoLinkHeadings,
				rehypeStarryNight,
			],
			recmaPlugins: [recmaExportFilepath],
		}),
		devtools(),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
