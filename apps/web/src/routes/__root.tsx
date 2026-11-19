import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import AppShell from "@/components/AppShell";
import appCss from "@/styles/global.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "description",
				content:
					"Tong Duc Thanh Nam is a full-stack TypeScript and AI application engineer based in Ho Chi Minh City, Vietnam.",
			},
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Tong Duc Thanh Nam - Software Engineer Portfolio",
			},
			{
				property: "og:description",
				content:
					"A hybrid editorial portfolio for a full-stack TypeScript and AI application engineer.",
			},
			{ property: "og:url", content: "https://tongducthanhnam.id.vn" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:site", content: "@tongducthanhnam" },
			{ name: "twitter:creator", content: "@tongducthanhnam" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Manrope:wght@200;300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<AppShell>
			<Outlet />
		</AppShell>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className="scroll-smooth bg-bone text-ink [scrollbar-color:var(--color-rebar)_var(--color-bone)] motion-reduce:scroll-auto"
		>
			<head>
				<HeadContent />
			</head>
			<body className="m-0 min-w-[320px] bg-bone font-sans text-ink antialiased selection:bg-rebar selection:text-paper">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
