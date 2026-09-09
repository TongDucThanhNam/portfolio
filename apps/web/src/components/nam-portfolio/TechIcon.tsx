import Android from "@thesvg/react/android";
import BetterAuth from "@thesvg/react/better-auth";
import Bun from "@thesvg/react/bun";
import Cloudflare from "@thesvg/react/cloudflare";
import CloudflareWorkers from "@thesvg/react/cloudflare-workers";
import D3 from "@thesvg/react/d3";
import Discord from "@thesvg/react/discord";
import Docker from "@thesvg/react/docker";
import Drizzle from "@thesvg/react/drizzle";
import Electron from "@thesvg/react/electron";
import Express from "@thesvg/react/express";
import Fastapi from "@thesvg/react/fastapi";
import Firefox from "@thesvg/react/firefox";
import GeminiGoogle from "@thesvg/react/gemini-google";
import GoogleChrome from "@thesvg/react/google-chrome";
import GooglePlay from "@thesvg/react/google-play";
import GoogleSheets from "@thesvg/react/google-sheets";
import Hono from "@thesvg/react/hono";
import Javascript from "@thesvg/react/javascript";
import JetpackCompose from "@thesvg/react/jetpack-compose";
import Kotlin from "@thesvg/react/kotlin";
import Mongodb from "@thesvg/react/mongodb";
import Nextdotjs from "@thesvg/react/nextdotjs";
import Nodejs from "@thesvg/react/nodejs";
import Pwa from "@thesvg/react/pwa";
import Python from "@thesvg/react/python";
import ReactIcon from "@thesvg/react/react";
import Scikitlearn from "@thesvg/react/scikit-learn";
import ShadcnUi from "@thesvg/react/shadcn-ui";
import Sqlite from "@thesvg/react/sqlite";
import Swagger from "@thesvg/react/swagger";
import Tailwindcss from "@thesvg/react/tailwindcss";
import Tanstack from "@thesvg/react/tanstack";
import Tensorflow from "@thesvg/react/tensorflow";
import Trpc from "@thesvg/react/trpc";
import Turborepo from "@thesvg/react/turborepo";
import Typescript from "@thesvg/react/typescript";
import Vercel from "@thesvg/react/vercel";
import Wxt from "@thesvg/react/wxt";
import Xyflow from "@thesvg/react/xyflow";
import type { ComponentType, SVGProps } from "react";

function ZustandIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
			aria-label="Zustand"
			{...props}
		>
			<title>Zustand</title>
			<circle cx="8.5" cy="7" r="2.5" fill="#443E38" stroke="#443E38" />
			<circle cx="15.5" cy="7" r="2.5" fill="#443E38" stroke="#443E38" />
			<path
				d="M6 14a6 6 0 0 0 12 0c0-3.3-2.7-6-6-6s-6 2.7-6 6z"
				fill="#59524C"
				stroke="#443E38"
			/>
			<circle cx="9.5" cy="13.5" r="0.75" fill="#ffffff" />
			<circle cx="14.5" cy="13.5" r="0.75" fill="#ffffff" />
			<ellipse cx="12" cy="16" rx="1.5" ry="1" fill="#E47043" />
		</svg>
	);
}

type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, SvgIconComponent> = {
	zustand: ZustandIcon,
	// JavaScript / TypeScript runtimes & languages
	nodejs: Nodejs,
	"node.js": Nodejs,
	node: Nodejs,
	typescript: Typescript,
	ts: Typescript,
	javascript: Javascript,
	js: Javascript,
	bun: Bun,

	// Frameworks & Libraries
	express: Express,
	"express.js": Express,
	react: ReactIcon,
	nextjs: Nextdotjs,
	"next.js": Nextdotjs,
	nextdotjs: Nextdotjs,
	hono: Hono,
	tanstack: Tanstack,
	"tanstack start": Tanstack,
	trpc: Trpc,
	"shadcn/ui": ShadcnUi,
	shadcn: ShadcnUi,
	tailwindcss: Tailwindcss,
	"tailwind css": Tailwindcss,
	wxt: Wxt,
	electron: Electron,
	turborepo: Turborepo,
	"d3.js": D3,
	d3: D3,
	"react flow": Xyflow,
	xyflow: Xyflow,

	// Python & AI
	python: Python,
	fastapi: Fastapi,
	tensorflow: Tensorflow,
	"scikit-learn": Scikitlearn,
	vercel: Vercel,
	"vercel ai sdk": Vercel,
	"ai sdk": Vercel,
	"gemini ocr": GeminiGoogle,
	"ocr fallback": GeminiGoogle,
	gemini: GeminiGoogle,

	// Mobile & JVM
	kotlin: Kotlin,
	android: Android,
	"android ime": Android,
	"jetpack compose": JetpackCompose,
	"google play": GooglePlay,

	// Databases & Cloud / Infrastructure
	mongodb: Mongodb,
	sqlite: Sqlite,
	drizzle: Drizzle,
	"drizzle orm": Drizzle,
	docker: Docker,
	cloudflare: Cloudflare,
	"cloudflare workers": CloudflareWorkers,
	"cloudflare workers / d1": CloudflareWorkers,
	"cloudflare workers / d1 / r2": CloudflareWorkers,
	"cloudflare d1 / r2": Cloudflare,
	"better auth": BetterAuth,
	"google sheets api": GoogleSheets,
	"google sheets": GoogleSheets,

	// Browser / Integration / Automation
	chrome: GoogleChrome,
	"google chrome": GoogleChrome,
	"chrome extension": GoogleChrome,
	"browser apis": GoogleChrome,
	firefox: Firefox,
	"firefox extension": Firefox,
	discord: Discord,
	"discord bots": Discord,
	"discord.js": Discord,
	"slash commands": Discord,
	swagger: Swagger,
	"rest apis": Swagger,
	"rest api": Swagger,
};

export function getTechIcon(name: string): SvgIconComponent | null {
	const normalized = name.trim().toLowerCase();
	if (iconMap[normalized]) {
		return iconMap[normalized];
	}

	// Try partial matching
	if (normalized.includes("node")) return Nodejs;
	if (normalized.includes("express")) return Express;
	if (normalized.includes("typescript") || normalized === "ts")
		return Typescript;
	if (normalized.includes("javascript") || normalized === "js")
		return Javascript;
	if (normalized.includes("react flow")) return Xyflow;
	if (normalized.includes("react")) return ReactIcon;
	if (normalized.includes("next")) return Nextdotjs;
	if (normalized.includes("tanstack")) return Tanstack;
	if (normalized.includes("tailwind")) return Tailwindcss;
	if (normalized.includes("shadcn")) return ShadcnUi;
	if (normalized.includes("zustand")) return ZustandIcon;
	if (normalized.includes("hono")) return Hono;
	if (normalized.includes("bun")) return Bun;
	if (normalized.includes("wxt")) return Wxt;
	if (normalized.includes("service worker") || normalized.includes("pwa"))
		return Pwa;
	if (normalized.includes("trpc")) return Trpc;
	if (normalized.includes("drizzle")) return Drizzle;
	if (normalized.includes("sqlite")) return Sqlite;
	if (normalized.includes("mongo")) return Mongodb;
	if (normalized.includes("docker")) return Docker;
	if (normalized.includes("python")) return Python;
	if (normalized.includes("fastapi")) return Fastapi;
	if (normalized.includes("compose")) return JetpackCompose;
	if (normalized.includes("kotlin")) return Kotlin;
	if (normalized.includes("android")) return Android;
	if (normalized.includes("play")) return GooglePlay;
	if (normalized.includes("cloudflare")) return CloudflareWorkers;
	if (normalized.includes("better auth")) return BetterAuth;
	if (normalized.includes("sheets")) return GoogleSheets;
	if (normalized.includes("discord")) return Discord;
	if (normalized.includes("electron")) return Electron;
	if (normalized.includes("turborepo")) return Turborepo;
	if (normalized.includes("d3")) return D3;
	if (normalized.includes("scikit")) return Scikitlearn;
	if (normalized.includes("tensor")) return Tensorflow;
	if (normalized.includes("ai sdk") || normalized.includes("vercel"))
		return Vercel;
	if (normalized.includes("gemini") || normalized.includes("ocr"))
		return GeminiGoogle;
	if (normalized.includes("chrome") || normalized.includes("browser"))
		return GoogleChrome;
	if (normalized.includes("firefox")) return Firefox;
	if (normalized.includes("rest") || normalized.includes("api")) return Swagger;

	return null;
}

export function TechIcon({
	name,
	className = "h-3.5 w-3.5 shrink-0",
}: {
	name: string;
	className?: string;
}) {
	const Icon = getTechIcon(name);
	if (!Icon) {
		return (
			<span
				className="inline-block h-1.5 w-1.5 rounded-full bg-rebar"
				aria-hidden="true"
			/>
		);
	}
	return <Icon className={className} aria-hidden="true" />;
}
