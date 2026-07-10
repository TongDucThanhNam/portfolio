import { createFileRoute } from "@tanstack/react-router";

import NamPortfolio from "@/components/NamPortfolio";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title:
					"Tong Duc Thanh Nam - Full-stack TypeScript / AI Application Engineer",
			},
			{
				name: "description",
				content:
					"Tong Duc Thanh Nam builds full-stack TypeScript and AI application products, from backend APIs and durable state to streaming UX.",
			},
		],
	}),
	component: HomePage,
});

function HomePage() {
	return <NamPortfolio />;
}
