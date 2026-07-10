import type { Chapter, Project, SkillGroup, StoryBeat } from "./types";

export const chapters: Chapter[] = [
	{ id: "hero", num: "00", label: "Intro", short: "Intro" },
	{ id: "why", num: "01", label: "Why", short: "Why" },
	{ id: "about", num: "02", label: "About", short: "About" },
	{ id: "experience", num: "03", label: "Experience", short: "Exp" },
	{ id: "skills", num: "04", label: "Skills", short: "Skills" },
	{ id: "projects", num: "05", label: "Work", short: "Work" },
	{ id: "contact", num: "06", label: "Contact", short: "Contact" },
];

export const storyBeats: StoryBeat[] = [
	{
		count: "01",
		kicker: "01 - Product proof",
		title: "He ships the thing, not the pitch.",
		copy: "Eragear is the signal: an AI workspace with account state, streaming UX, model/tool/search controls, and usage metering.",
		proofLabel: "Evidence",
		proof: "Live product",
		step: "Product",
	},
	{
		count: "02",
		kicker: "02 - Full-stack loop",
		title: "He can hold the whole product loop in his head.",
		copy: "Frontend, backend APIs, D1 data models, auth boundaries, streaming responses, and the interface all connect into one product surface.",
		proofLabel: "Signal",
		proof: "System ownership",
		step: "System",
	},
	{
		count: "03",
		kicker: "03 - Verifiable output",
		title: "The work is public enough to inspect.",
		copy: "Live product, open-source experiments, a desktop AI coder shell, and a published Android app give you more than a resume claim.",
		proofLabel: "Proof",
		proof: "Shipped artifacts",
		step: "Proof",
	},
];

export const skills: SkillGroup[] = [
	{
		num: "01",
		label: "Languages",
		items: [
			{ name: "TypeScript", level: "primary", value: 1 },
			{ name: "JavaScript", level: "primary", value: 1 },
			{ name: "Kotlin", level: "mobile", value: 0.6 },
		],
	},
	{
		num: "02",
		label: "Frontend",
		items: [
			{ name: "React", level: "expert", value: 0.88 },
			{ name: "Next.js", level: "expert", value: 0.88 },
			{ name: "TanStack", level: "expert", value: 0.88 },
			{ name: "Tailwind", level: "expert", value: 0.88 },
			{ name: "Zustand", level: "expert", value: 0.88 },
		],
	},
	{
		num: "03",
		label: "Backend",
		items: [
			{ name: "Node.js", level: "expert", value: 0.88 },
			{ name: "Hono", level: "expert", value: 0.88 },
			{ name: "Express.js", level: "advanced", value: 0.7 },
			{ name: "REST / tRPC", level: "expert", value: 0.88 },
		],
	},
	{
		num: "04",
		label: "Data / Auth / Infra",
		items: [
			{ name: "Drizzle", level: "expert", value: 0.88 },
			{ name: "Cloudflare Workers / D1", level: "expert", value: 0.88 },
			{ name: "SQLite", level: "advanced", value: 0.7 },
			{ name: "Better Auth", level: "expert", value: 0.88 },
			{ name: "Bun / Turborepo", level: "expert", value: 0.88 },
		],
	},
	{
		num: "05",
		label: "AI Application",
		items: [
			{ name: "AI SDK", level: "expert", value: 0.88 },
			{ name: "Streaming chat", level: "expert", value: 0.88 },
			{ name: "Model / tool routing", level: "expert", value: 0.88 },
			{ name: "Context control", level: "expert", value: 0.88 },
		],
	},
	{
		num: "06",
		label: "Mobile",
		items: [
			{ name: "Android", level: "advanced", value: 0.7 },
			{ name: "Jetpack Compose", level: "advanced", value: 0.7 },
		],
	},
];

export const projects: Project[] = [
	{
		name: "Eragear AI - AI-native workspace",
		status: "LIVE",
		statusTone: "live",
		proof:
			"Streaming workspace with model/tool/search controls, durable state, and usage metering.",
		type: "Full-stack / AI",
		stack: ["TanStack / React", "Hono", "CF Workers / D1", "AI SDK"],
		year: "2025-now",
		href: "https://eragear.app",
		cursor: "ERAGEAR",
	},
	{
		name: "AI Chatbot Tree - branching chat UI",
		status: "OPEN SOURCE",
		statusTone: "oss",
		proof:
			"Branch-aware chat interface for exploring alternate AI conversations without losing context.",
		type: "Next.js / AI SDK",
		stack: ["AI SDK v6", "Zustand", "D3 / React Flow"],
		year: "personal",
		href: "https://github.com/TongDucThanhNam/ai-chatbot-tree",
		cursor: "CHATBOT TREE",
	},
	{
		name: "Eragear Code Copilot - desktop AI coder",
		status: "OPEN SOURCE",
		statusTone: "oss",
		proof:
			"Desktop agent shell experimenting with coding workflows, protocol boundaries, and local tools.",
		type: "Electron / ACP",
		stack: ["Electron", "Agent Client Protocol", "Hono / tRPC", "Turborepo"],
		year: "personal",
		href: "https://github.com/TongDucThanhNam/eragear-code-copilot",
		cursor: "COPILOT",
	},
	{
		name: "Seller Keyboard - published Android app",
		status: "PUBLISHED - 100+ INSTALLS",
		statusTone: "published",
		proof:
			"A shipped Android keyboard utility for sellers, published to Google Play with real users.",
		type: "Kotlin / Compose",
		stack: ["Android", "Jetpack Compose", "Google Play"],
		year: "2024",
		href: "https://play.google.com/store/apps/details?id=com.terasumi.sellerkeyboard",
		cursor: "KEYBOARD",
	},
];
