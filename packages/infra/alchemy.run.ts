import alchemy from "alchemy";
import { D1Database, Route, TanStackStart } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("tanstack-start-portfolio");

const db = await D1Database("database", {
	adopt: true,
	migrationsDir: "../../packages/db/src/migrations",
});

export const web = await TanStackStart("web", {
	cwd: "../../apps/web",
	bindings: {
		DB: db,
	},
});

await Route("portfolio-domain-route", {
	pattern: "tongducthanhnam.id.vn/*",
	script: web,
	adopt: true,
});

console.log(`Web -> ${web.url}`);

await app.finalize();
