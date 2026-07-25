import { createFileRoute } from "@tanstack/react-router";

import NamPortfolio from "@/components/NamPortfolio";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title:
					"Tong Duc Thanh Nam - AI Product Builder / Full-stack TypeScript Developer",
			},
			{
				name: "description",
				content:
					"Tong Duc Thanh Nam turns vague workflows into working AI products, browser extensions, automation tools, web apps, and mobile utilities.",
			},
		],
	}),
	component: HomePage,
});

function HomePage() {
	return <NamPortfolio />;
}
