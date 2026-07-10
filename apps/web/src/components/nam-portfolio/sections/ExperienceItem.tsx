export function ExperienceItem({
	period,
	location,
	jobTitle,
	note,
	org,
	orgHref,
	points,
	stack,
}: {
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
		<article className="experience-item group relative grid gap-6 border-t border-line pt-7 transition hover:border-[rgba(184,66,46,0.4)] md:grid-cols-[220px_1fr] md:hover:pl-4">
			<span
				className="absolute left-0 top-7 h-[calc(100%-28px)] w-px origin-top scale-y-0 bg-rebar transition group-hover:scale-y-100"
				aria-hidden="true"
			/>
			<div className="flex flex-col gap-1 font-mono uppercase tracking-[0.1em]">
				<span className="text-[0.72rem] text-rebar">{period}</span>
				<span className="text-[0.7rem] text-ink-soft">{location}</span>
			</div>
			<div>
				<h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.1] tracking-[-0.02em]">
					{jobTitle}{" "}
					{note && (
						<span className="font-mono text-sm tracking-[0.04em] text-rebar">
							- {note}
						</span>
					)}
				</h3>
				<p className="mt-1 text-[1.05rem] text-ink-soft">
					{orgHref ? (
						<a
							href={orgHref}
							target="_blank"
							rel="noreferrer"
							className="border-b border-rebar-soft text-rebar hover:border-rebar"
						>
							{org}
						</a>
					) : (
						org
					)}
				</p>
				<ul className="mt-5 flex flex-col gap-2">
					{points.map((point) => (
						<li
							key={point}
							className="flex gap-3 text-[0.95rem] leading-6 text-ink-soft"
						>
							<span className="mt-3 h-px w-2 shrink-0 bg-rebar" />
							{point}
						</li>
					))}
				</ul>
				<div className="mt-5 flex flex-wrap gap-1.5">
					{stack.map((item) => (
						<span key={item} className="chip">
							{item}
						</span>
					))}
				</div>
			</div>
		</article>
	);
}
