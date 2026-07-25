import type { Chapter, Project, SkillGroup, StoryBeat } from "./types";

export const chapters: Chapter[] = [
	{ id: "hero", num: "00", label: "Intro", short: "Intro" },
	{ id: "projects", num: "01", label: "Work", short: "Work" },
	{ id: "why", num: "02", label: "Why", short: "Why" },
	{ id: "about", num: "03", label: "About", short: "About" },
	{ id: "experience", num: "04", label: "Experience", short: "Exp" },
	{ id: "skills", num: "05", label: "Skills", short: "Skills" },
	{ id: "contact", num: "06", label: "Contact", short: "Contact" },
];

export const storyBeats: StoryBeat[] = [
	{
		count: "01",
		kicker: "01 - Product proof",
		title: "I ship the thing, not just the pitch.",
		copy: "A published browser extension, a live AI workspace, deployed web apps, and a Google Play utility turn the product claims into inspectable evidence.",
		proofLabel: "Evidence",
		proof: "Shipped products",
		step: "Product",
	},
	{
		count: "02",
		kicker: "02 - Full-stack loop",
		title: "I can own the whole product loop.",
		copy: "UI, backend routes, persistence, authentication, browser APIs, automation, deployment, and streaming AI behavior connect into one working surface.",
		proofLabel: "Signal",
		proof: "System ownership",
		step: "System",
	},
	{
		count: "03",
		kicker: "03 - Verifiable output",
		title: "The output is public enough to inspect.",
		copy: "Repositories, live demos, extension releases, and a published Android app let you evaluate the product decisions instead of taking a résumé claim on faith.",
		proofLabel: "Proof",
		proof: "Verifiable output",
		step: "Proof",
	},
];

export const skills: SkillGroup[] = [
	{
		num: "01",
		label: "Languages",
		description:
			"Product work across web, AI workflows, automation, and Android.",
		items: ["TypeScript", "JavaScript", "Kotlin", "Python"],
	},
	{
		num: "02",
		label: "AI applications",
		description: "Context-aware product flows beyond a plain chatbot surface.",
		items: [
			"Vercel AI SDK",
			"Streaming responses",
			"Model / tool routing",
			"BYOM workflows",
		],
	},
	{
		num: "03",
		label: "Frontend",
		description: "Stateful interfaces for web products and AI workspaces.",
		items: [
			"React",
			"Next.js",
			"TanStack",
			"Tailwind CSS",
			"Zustand",
			"Shadcn/UI",
		],
	},
	{
		num: "04",
		label: "Backend",
		description: "Typed services, product APIs, and deployment-ready runtimes.",
		items: ["Hono", "Express.js", "Node.js", "tRPC", "REST APIs", "Bun"],
	},
	{
		num: "05",
		label: "Browser extensions",
		description:
			"Local-first browser automation and cross-tab product workflows.",
		items: [
			"WXT",
			"Chrome Extension",
			"Firefox Extension",
			"Content scripts",
			"Service workers",
			"Tab messaging",
		],
	},
	{
		num: "06",
		label: "Data / infrastructure",
		description:
			"Relational product state, archived content, and edge deployment.",
		items: [
			"Cloudflare Workers / D1 / R2",
			"Drizzle",
			"SQLite",
			"MongoDB",
			"Google Sheets API",
		],
	},
	{
		num: "07",
		label: "Automation",
		description:
			"Operational workflows with permissions and resilient fallbacks.",
		items: [
			"Discord bots",
			"Slash commands",
			"Webhooks",
			"RBAC flows",
			"OCR fallback",
		],
	},
	{
		num: "08",
		label: "Mobile",
		description: "Focused Android utilities for real, repeated user tasks.",
		items: ["Android IME", "Jetpack Compose", "Kotlin"],
	},
];

export const projects: Project[] = [
	{
		name: "Eragear Web Copilot",
		status: "PUBLISHED · CHROME + FIREFOX",
		statusTone: "published",
		proof:
			"A privacy-first browser extension that connects verified browsing context to an AI workspace through a client-side bridge and BYOM workflow.",
		type: "Published browser extension / AI workflow",
		stack: ["WXT", "React", "Tailwind CSS", "Browser APIs"],
		highlights: [
			"Built Google Search overlay, tab discovery and opening, provider messaging, AI-site settings, auto-submit controls, copy helpers, and streaming response UI.",
			"Designed a research flow where users verify pages before clipped content becomes clean Markdown and returns to the AI context.",
			"Kept prompt and response handling in the local browser and direct provider session, without an extra middleman server.",
		],
		href: "https://github.com/TongDucThanhNam/eragear-web-extension",
		linkLabel: "View repository",
		cursor: "WEB COPILOT",
		visual: "extension",
		featured: true,
	},
	{
		name: "Eragear AI Workspace",
		status: "LIVE PRODUCT",
		statusTone: "live",
		proof:
			"An AI workspace for long-running conversations, artifacts, model and tool selection, research flows, and human-in-the-loop interaction.",
		type: "AI-native web app / full-stack product",
		stack: [
			"React / TanStack",
			"Hono",
			"Cloudflare Workers / D1",
			"Drizzle",
			"Better Auth",
			"AI SDK",
		],
		highlights: [
			"Implemented streaming chat, selectable model, tool, and search controls, usage metadata, persistence, and credit-accounting architecture.",
			"Separated chat UX, artifact sidecar, research input, local knowledge, and browser-assisted workflows as distinct context surfaces.",
			"Built authentication, database schema, backend routes, frontend state, and deployable Cloudflare infrastructure as one SaaS-style system.",
		],
		href: "https://eragear-web-terasumi.terasumi.workers.dev",
		linkLabel: "Open live product",
		cursor: "AI WORKSPACE",
		visual: "workspace",
		featured: true,
	},
	{
		name: "Link Saver",
		status: "LIVE DEMO",
		statusTone: "live",
		proof:
			"A knowledge inbox spanning a web app and extension: save, extract, archive, read, search, recall, and export.",
		type: "Web app + extension / product prototype",
		stack: [
			"TanStack Start",
			"React",
			"WXT",
			"tRPC",
			"Better Auth",
			"Cloudflare D1 / R2",
		],
		highlights: [
			"Designed a monorepo with web app, extension, API, auth, database, shared UI, typed environment access, and deployment packages.",
			"Separated relational metadata in D1 / SQLite from archived snapshots in R2.",
			"Grounded AI summaries with citations and supported Markdown, JSON, and llms.md export targets.",
		],
		href: "https://link-saver-web-terasumi.terasumi.workers.dev",
		linkLabel: "Open live demo",
		cursor: "LINK SAVER",
		visual: "inbox",
		featured: true,
	},
	{
		name: "Private Operations Discord Bot",
		status: "PRIVATE · SHIPPED",
		statusTone: "private",
		proof:
			"An internal operations bot covering HR, finance notifications, vehicle records, invoice ingestion, and receipt drafting without exposing company data.",
		type: "Internal company automation",
		stack: [
			"Bun",
			"TypeScript",
			"discord.js",
			"Google Sheets API",
			"RBAC",
			"OCR fallback",
		],
		highlights: [
			"Implemented leave, overtime, late and early requests, personal statistics, and admin registration and editing flows.",
			"Added banking notifications, route and fuel records, XML invoice parsing, Gemini OCR fallback, and PO receipt drafts.",
			"Separated Discord handlers from business logic with role permissions, validation, tests, and deployment runbooks.",
		],
		cursor: "PRIVATE OPS",
		visual: "automation",
		featured: false,
	},
	{
		name: "Eragear Code Copilot",
		status: "IN PROGRESS",
		statusTone: "progress",
		proof:
			"A desktop-first AI coding assistant built around Electron, Agent Client Protocol, shared runtime packages, and explicit permission boundaries.",
		type: "Desktop-first AI coding assistant",
		stack: [
			"Electron",
			"Agent Client Protocol",
			"TypeScript",
			"tRPC",
			"Bun / Turborepo",
		],
		highlights: [
			"Kept Electron main and preload thin while runtime packages own session lifecycle, tool calls, persistence, settings, and background tasks.",
			"Modeled a private local path from renderer through preload, IPC, runtime host, stdio NDJSON service, use cases, and ACP agent process.",
		],
		cursor: "CODE COPILOT",
		visual: "desktop",
		featured: false,
	},
	{
		name: "AI Chatbot Tree",
		status: "LIVE DEMO",
		statusTone: "live",
		proof:
			"A tree-based chat interface where the conversation tree is the source of truth and model context is projected from an explicit recipe.",
		type: "Branching conversation / AI UX prototype",
		stack: [
			"Next.js",
			"AI SDK",
			"Zustand",
			"D3.js",
			"React Flow",
			"Tailwind CSS",
		],
		highlights: [
			"Implemented branching, regeneration, manual insertion, context preview, export, import, reset, and local persistence.",
			"Used D3 and React Flow to make alternate conversations and context choices inspectable.",
		],
		href: "https://ai-chatbot-tree.vercel.app",
		linkLabel: "Open live demo",
		cursor: "CHATBOT TREE",
		visual: "tree",
		featured: false,
	},
	{
		name: "Seller Keyboard",
		status: "PUBLISHED · 100+ DOWNLOADS",
		statusTone: "published",
		proof:
			"A published Android keyboard that helps online sellers insert reusable text and image snippets while chatting with customers.",
		type: "Published Android utility",
		stack: ["Kotlin", "Android IME", "Jetpack Compose", "Google Play"],
		highlights: [
			"Focused the product on repeated seller tasks: introductions, prices, promotions, replies, and reusable chat content.",
			"Published the utility to Google Play and reached more than 100 downloads.",
		],
		href: "https://play.google.com/store/apps/details?id=com.terasumi.sellerkeyboard",
		linkLabel: "Open Google Play",
		cursor: "KEYBOARD",
		visual: "mobile",
		featured: false,
	},
	{
		name: "rem-viet",
		status: "LIVE DEMO",
		statusTone: "live",
		proof:
			"A deployed full-stack e-commerce site for curtains and blinds with separate frontend and backend services.",
		type: "Full-stack e-commerce website",
		stack: [
			"React / Next.js",
			"Node.js",
			"Express.js",
			"MongoDB",
			"Docker",
			"Bun / Turborepo",
		],
		highlights: [
			"Implemented Express routing and middleware, MongoDB CRUD, and controller, service, and repository boundaries.",
			"Added Swagger API documentation, Next.js routing, fetching and SSR, and a dashboard-oriented roadmap.",
		],
		href: "https://rem-viet-web-terasumi.terasumi.workers.dev",
		linkLabel: "Open live demo",
		cursor: "REM VIET",
		visual: "commerce",
		featured: false,
	},
	{
		name: "FashionAI",
		status: "ACADEMIC PROTOTYPE",
		statusTone: "prototype",
		proof:
			"A personalized e-commerce prototype with a separate AI service layer for recommendation workflows.",
		type: "AI recommendation / e-commerce",
		stack: [
			"Next.js",
			"Shadcn/UI",
			"Node.js / Express.js",
			"MongoDB",
			"Python / FastAPI",
			"Scikit-learn / TensorFlow",
		],
		highlights: [
			"Separated frontend, backend, and AI service setup with a Docker Compose deployment path.",
			"Used Pandas, NumPy, Scikit-learn, and TensorFlow for recommendation-oriented exploration.",
		],
		cursor: "FASHION AI",
		visual: "recommendation",
		featured: false,
	},
];
