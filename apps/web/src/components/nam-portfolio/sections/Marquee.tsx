export function Marquee() {
	const items = [
		"TypeScript",
		"React",
		"Hono",
		"Cloudflare Workers",
		"AI SDK",
		"Drizzle",
	];

	return (
		<div
			className="marquee-shell overflow-hidden border-y border-line bg-paper py-7"
			aria-hidden="true"
		>
			<div className="marquee-track flex w-max animate-marquee font-serif text-[clamp(2.4rem,6vw,6rem)] italic leading-none tracking-[-0.03em]">
				{[0, 1].map((cycle) => (
					<div key={cycle} className="marquee-group flex shrink-0 gap-6 pr-6">
						{items.map((item) => (
							<span
								key={`${cycle}-${item}`}
								className="flex items-center gap-6"
							>
								{item}
								<span className="text-rebar">.</span>
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
