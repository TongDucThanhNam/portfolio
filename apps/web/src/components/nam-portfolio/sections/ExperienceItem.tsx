import { TechBadgeList } from "../TechBadge";
import { cx } from "../utils";

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
	const inverse = index === "01";

	return (
		<article
			className={cx(
				"group/record relative grid gap-8 overflow-hidden border-t px-[clamp(22px,3vw,42px)] py-[clamp(38px,5.5vw,72px)] transition-colors duration-500 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:origin-top before:scale-y-0 before:bg-rebar before:transition-transform before:duration-700 hover:before:scale-y-100 md:grid-cols-[minmax(150px,0.28fr)_minmax(0,1fr)]",
				inverse
					? "border-[rgba(246,242,233,0.14)] bg-ink text-paper"
					: "border-line bg-paper text-ink hover:bg-bone",
			)}
			data-reveal="line"
		>
			<span
				className={cx(
					"pointer-events-none absolute -right-[0.04em] -bottom-[0.22em] font-serif text-[clamp(8rem,17vw,18rem)] leading-none tracking-[-0.08em] transition-[color,transform] duration-700 group-hover/record:-translate-x-2 group-hover/record:text-[rgba(184,66,46,0.09)]",
					inverse ? "text-[rgba(246,242,233,0.045)]" : "text-bone-deep",
				)}
				aria-hidden="true"
			>
				{index}
			</span>
			<div className="relative z-10 flex flex-col justify-between gap-10">
				<span
					className={cx(
						"font-serif text-[clamp(4.8rem,8vw,8.2rem)] leading-[0.72] tracking-[-0.07em] transition-colors duration-500 group-hover/record:text-rebar",
						inverse ? "text-paper/10" : "text-bone-deep",
					)}
				>
					{index}
				</span>
				<div className="flex flex-col gap-2 font-mono uppercase tracking-[0.1em]">
					<span
						className={cx(
							"text-[0.56rem]",
							inverse ? "text-paper/40" : "text-muted",
						)}
					>
						Record / {index}
					</span>
					<span className="text-[0.72rem] text-rebar">{period}</span>
					<span
						className={cx(
							"text-[0.66rem]",
							inverse ? "text-paper/62" : "text-ink-soft",
						)}
					>
						{location}
					</span>
				</div>
			</div>
			<div className="relative z-10">
				<div
					className={cx(
						"mb-6 flex items-center gap-3 font-mono text-[0.54rem] uppercase tracking-[0.12em]",
						inverse ? "text-paper/40" : "text-muted",
					)}
				>
					<span className="h-px w-8 bg-rebar" aria-hidden="true" />
					Professional chronology
				</div>
				<h3 className="max-w-[11em] font-serif text-[clamp(2.2rem,4.8vw,5.2rem)] leading-[0.94] tracking-[-0.04em]">
					{jobTitle}{" "}
					{note && (
						<span className="ml-2 align-middle font-mono text-[0.6rem] uppercase tracking-[0.1em] text-rebar">
							/ {note}
						</span>
					)}
				</h3>
				<p
					className={cx(
						"mt-4 text-[1.05rem]",
						inverse ? "text-paper/64" : "text-ink-soft",
					)}
				>
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
				<ul className="mt-9 grid max-w-[800px] gap-5 sm:grid-cols-2">
					{points.map((point, pointIndex) => (
						<li
							key={point}
							className={cx(
								"grid grid-cols-[24px_1fr] gap-3 border-t pt-4 text-[0.88rem] leading-6",
								inverse
									? "border-[rgba(246,242,233,0.15)] text-paper/62"
									: "border-line text-ink-soft",
							)}
						>
							<span className="font-mono text-[0.52rem] text-rebar">
								{String(pointIndex + 1).padStart(2, "0")}
							</span>
							{point}
						</li>
					))}
				</ul>
				<div className="mt-7">
					<TechBadgeList
						items={stack}
						className={
							inverse
								? "[&>span]:border-[rgba(246,242,233,0.2)] [&>span]:bg-transparent [&>span]:text-paper"
								: undefined
						}
					/>
				</div>
			</div>
		</article>
	);
}
