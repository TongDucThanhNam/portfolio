import { existsSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import alchemy from "alchemy/cloudflare/tanstack-start";
import { defineConfig } from "vite";

const alchemyConfigPath = fileURLToPath(
	new URL("./.alchemy/local/wrangler.jsonc", import.meta.url),
);
const shouldUseAlchemy = existsSync(alchemyConfigPath);
const cloudflareWorkersShimPath = fileURLToPath(
	new URL("../../packages/env/src/cloudflare-local.ts", import.meta.url),
);

export default defineConfig({
	server: {
		port: Number(process.env.PORT) || 4321,
		host: true,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			...(shouldUseAlchemy
				? {}
				: { "cloudflare:workers": cloudflareWorkersShimPath }),
		},
	},
	plugins: [
		tailwindcss(),
		tanstackStart(),
		react(),
		...(shouldUseAlchemy ? [alchemy({ configPath: alchemyConfigPath })] : []),
	],
});
