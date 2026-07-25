import { cx } from "../utils";

const hudSectionClass =
	"border-b border-[rgba(22,20,15,0.16)] bg-transparent py-[13px] last:border-b-0";
const hudTitleClass =
	"text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink";

const capabilityRows = [
	{
		name: "Product Thinking",
		kind: "product",
		delay: "[animation-delay:150ms]",
	},
	{ name: "AI Systems", kind: "ai", delay: "[animation-delay:300ms]" },
	{ name: "Automation", kind: "automation", delay: "[animation-delay:450ms]" },
	{ name: "Full-Stack", kind: "code", delay: "[animation-delay:600ms]" },
] as const;
const uptimeTicks = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
] as const;

function CapabilityIcon({
	kind,
}: {
	kind: (typeof capabilityRows)[number]["kind"];
}) {
	return (
		<div className="flex h-[18px] w-[18px] items-center justify-center text-ink-soft [&_svg]:h-4 [&_svg]:w-4">
			{kind === "product" ? (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<polygon points="12 2 22 20 2 20" />
					<circle cx="12" cy="13" r="3" />
				</svg>
			) : kind === "ai" ? (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<circle cx="12" cy="6" r="2" />
					<circle cx="6" cy="16" r="2" />
					<circle cx="18" cy="16" r="2" />
					<path d="M12 8v4M6 14l4-2M18 14l-4-2" />
				</svg>
			) : kind === "automation" ? (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
				</svg>
			) : (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<polyline points="16 18 22 12 16 6" />
					<polyline points="8 6 2 12 8 18" />
				</svg>
			)}
		</div>
	);
}

export function HumanLoopPanel() {
	return (
		<div
			className="pointer-events-auto absolute top-[15%] right-pad-x z-4 flex w-[clamp(270px,22vw,340px)] flex-col border-y border-[rgba(22,20,15,0.24)] bg-transparent font-mono text-[0.78rem] text-ink-soft before:absolute before:-top-2 before:-left-1 before:text-[0.75rem] before:leading-none before:text-[rgba(22,20,15,0.45)] before:content-['+'] after:absolute after:-top-2 after:-right-1 after:text-[0.75rem] after:leading-none after:text-[rgba(22,20,15,0.45)] after:content-['+']"
			role="img"
			aria-label="System status & Human-in-the-Loop HUD"
		>
			<div
				className="flex items-center justify-between border-b border-[rgba(22,20,15,0.16)] pt-1.5 pb-2 text-[0.62rem] uppercase tracking-[0.08em] text-[rgba(22,20,15,0.45)]"
				aria-hidden="true"
			>
				<span>{"SYS.01 // METRICS"}</span>
				<span className="inline-flex items-center gap-1 font-semibold text-rebar">
					<span className="inline-block h-[5px] w-[5px] animate-red-pulse rounded-full bg-rebar" />{" "}
					LIVE
				</span>
			</div>

			<div className={hudSectionClass}>
				<div className="mb-2 flex items-center justify-between">
					<span className={hudTitleClass}>SHIPPED BUILDS</span>
					<div
						className="relative flex h-4 w-4 items-center justify-center"
						aria-hidden="true"
					>
						<span className="absolute inset-0 rounded-full border border-[rgba(22,20,15,0.35)]" />
						<span className="h-1 w-1 rounded-full bg-ink" />
					</div>
				</div>
				<div className="flex items-center justify-between gap-2.5">
					<div className="flex gap-[3px]" aria-hidden="true">
						{uptimeTicks.map((tick, index) => (
							<span
								key={tick}
								className={cx(
									"h-3 w-[3px] rounded-[1px]",
									index < 9 ? "bg-ink" : "bg-[rgba(22,20,15,0.18)]",
									index === 8 && "animate-tick",
								)}
							/>
						))}
					</div>
					<span className="text-[0.76rem] font-semibold text-ink">09</span>
				</div>
			</div>

			<div className={hudSectionClass}>
				<div className="mb-2 flex items-center gap-[5px]">
					<span className={hudTitleClass}>CAPABILITIES</span>
					<span className="text-[0.9rem] text-rebar">•</span>
				</div>
				<ul className="m-0 flex list-none flex-col p-0">
					{capabilityRows.map((capability) => (
						<li
							key={capability.name}
							className="flex items-center gap-2.5 py-1.5 first:pt-0.5 last:pb-0"
						>
							<CapabilityIcon kind={capability.kind} />
							<span className="flex-1 text-[0.74rem] text-ink">
								{capability.name}
							</span>
							<span
								className={cx(
									"animate-boot text-[0.64rem] font-medium tracking-[0.08em] text-[rgba(22,20,15,0.45)]",
									capability.delay,
								)}
							>
								ONLINE
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className={cx(hudSectionClass, "flex flex-col gap-2")}>
				<span className={hudTitleClass}>DECISION LAYER</span>
				<div className="flex items-center justify-between">
					<span className="text-[0.7rem] tracking-[0.04em] text-[rgba(22,20,15,0.65)]">
						HUMAN OVERRIDE
					</span>
					<span className="inline-flex items-center gap-[5px] rounded-[14px] border border-[rgba(184,66,46,0.4)] bg-[rgba(184,66,46,0.08)] px-[11px] py-[3px] text-[0.68rem] font-semibold text-rebar">
						<span className="text-[0.58rem]">✦</span> ON
					</span>
				</div>
			</div>

			<div className={cx(hudSectionClass, "flex flex-col gap-2")}>
				<span className={hudTitleClass}>CONFIDENCE HANDOFF</span>
				<div className="mt-0.5 flex justify-between text-[0.66rem] text-[rgba(22,20,15,0.6)]">
					<span>AI → HUMAN</span>
					<span>THRESHOLD 82%</span>
				</div>
				<svg
					className="mt-1 h-9 w-full text-[rgba(22,20,15,0.45)]"
					viewBox="0 0 220 36"
					fill="none"
					aria-hidden="true"
				>
					<path
						className="animate-dash"
						d="M 10 24 L 45 28 L 85 20 L 125 25 L 165 20 L 210 26"
						stroke="currentColor"
						strokeWidth="1"
						strokeDasharray="2 2"
					/>
					<path
						d="M 10 24 Q 50 30 85 20 T 165 20 T 210 26"
						stroke="currentColor"
						strokeWidth="1.2"
					/>
					<circle cx="55" cy="26" r="2.5" fill="var(--color-rebar)" />
					<circle cx="110" cy="22" r="2.5" fill="currentColor" />
					<circle cx="170" cy="21" r="2.5" fill="var(--color-rebar)" />
					<line
						x1="55"
						y1="18"
						x2="55"
						y2="30"
						stroke="currentColor"
						strokeWidth="0.8"
					/>
					<line
						x1="110"
						y1="14"
						x2="110"
						y2="28"
						stroke="currentColor"
						strokeWidth="0.8"
					/>
				</svg>
			</div>

			<div
				className="relative flex items-center justify-between border-t border-[rgba(22,20,15,0.16)] pt-2 pb-1.5 text-[0.62rem] uppercase tracking-[0.08em] text-[rgba(22,20,15,0.45)] before:absolute before:-bottom-[14px] before:-left-1 before:text-[0.75rem] before:leading-none before:content-['+'] after:absolute after:-right-1 after:-bottom-[14px] after:text-[0.75rem] after:leading-none after:content-['+']"
				aria-hidden="true"
			>
				<span>{"NODE // 02-PROD"}</span>
				<span>SYSTEM READY ↵</span>
			</div>
		</div>
	);
}
