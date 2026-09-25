export function ExperienceItem({
	index,
	period,
	location,
	jobTitle,
	note,
	org,
	orgHref,
	points,
	stack,
}: {
	index: string;
	period: string;
	location: string;
	jobTitle: string;
	note?: string;
	org: string;
	orgHref?: string;
	points: string[];
	stack: string[];
}) {
	return (
		<article
			className="group/record grid gap-6 border-b border-ink/20 py-9 md:grid-cols-[0.38fr_1fr_0.8fr] md:gap-10 md:py-12"
			data-reveal="rise"
		>
			<div className="font-mono text-[0.62rem] uppercase leading-6 tracking-[0.06em]">
				<p className="text-rebar">{period}</p>
				<p className="mt-2 text-ink-soft">
					{note ?? "Professional experience"}
				</p>
				<p className="mt-6 hidden text-ink/35 md:block" aria-hidden="true">
					({index})
				</p>
			</div>
			<div>
				<h3 className="font-['Archivo_Variable'] text-[clamp(1.65rem,2.6vw,2.8rem)] font-normal leading-[1.05] tracking-[-0.045em] transition-colors duration-300 group-hover/record:text-rebar">
					{jobTitle}
				</h3>
				<p className="mt-4 text-[0.9rem] leading-6 text-ink-soft">
					{orgHref ? (
						<a
							href={orgHref}
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4"
						>
							{org}
						</a>
					) : (
						org
					)}
				</p>
				<p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-soft">
					{location}
				</p>
			</div>
			<div>
				<ul className="space-y-3 text-[0.85rem] leading-7 text-ink-soft">
					{points.map((point) => (
						<li key={point}>{point}</li>
					))}
				</ul>
				<p className="mt-5 font-mono text-[0.56rem] uppercase leading-6 tracking-[0.06em] text-rebar">
					{stack.join(" / ")}
				</p>
			</div>
		</article>
	);
}
