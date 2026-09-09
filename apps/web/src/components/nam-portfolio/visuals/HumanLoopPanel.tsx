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
const deliverySteps = ["DEFINE", "BUILD", "SHIP"] as const;
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
		<div className="flex h-4.5 w-4.5 items-center justify-center text-ink-soft [&_svg]:h-4 [&_svg]:w-4">
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
		<>
			<div
				className="pointer-events-auto absolute top-[15%] right-pad-x z-4 hidden w-[clamp(270px,22vw,340px)] flex-col border-y border-[rgba(22,20,15,0.24)] bg-transparent font-mono text-[0.78rem] text-ink-soft before:absolute before:-top-2 before:-left-1 before:text-[0.75rem] before:leading-none before:text-[rgba(22,20,15,0.45)] before:content-['+'] after:absolute after:-top-2 after:-right-1 after:text-[0.75rem] after:leading-none after:text-[rgba(22,20,15,0.45)] after:content-['+'] md:flex"
				role="img"
				aria-label="Portfolio capabilities and delivery status"
				data-system-panel
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

				<div className={cx(hudSectionClass, "relative flex flex-col gap-2")}>
					<span
						className="absolute top-[61%] -left-[13px] h-1.5 w-1.5 rounded-full bg-rebar opacity-100 transition-[opacity,transform] delay-[900ms] duration-700 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:scale-0 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 [@media(max-width:1024px)]:hidden motion-reduce:scale-100"
						aria-hidden="true"
					/>
					<span className={hudTitleClass}>BUILD MODE</span>
					<div className="flex items-center justify-between">
						<span className="text-[0.7rem] tracking-[0.04em] text-[rgba(22,20,15,0.65)]">
							END-TO-END DELIVERY
						</span>
						<span className="inline-flex items-center gap-[5px] rounded-[14px] border border-[rgba(184,66,46,0.4)] bg-[rgba(184,66,46,0.08)] px-[11px] py-[3px] text-[0.68rem] font-semibold text-rebar">
							<span className="inline-block h-1.5 w-1.5 rounded-full bg-rebar" />
							ACTIVE
						</span>
					</div>
				</div>

				<div className={cx(hudSectionClass, "flex flex-col gap-2")}>
					<span className={hudTitleClass}>DELIVERY FLOW</span>
					<ol className="relative m-0 mt-1 grid list-none grid-cols-3 p-0 before:absolute before:top-1 before:right-[16.5%] before:left-[16.5%] before:h-px before:bg-[rgba(22,20,15,0.24)]">
						{deliverySteps.map((step, index) => (
							<li
								key={step}
								className="relative flex flex-col items-center gap-2 text-[0.62rem] tracking-[0.06em] text-[rgba(22,20,15,0.65)]"
							>
								<span
									className={cx(
										"z-1 h-2.5 w-2.5 rounded-full border bg-bone",
										index === deliverySteps.length - 1
											? "border-rebar bg-rebar"
											: "border-[rgba(22,20,15,0.48)]",
									)}
									aria-hidden="true"
								/>
								<span>{step}</span>
							</li>
						))}
					</ol>
				</div>

				<div
					className="relative flex items-center justify-between border-t border-[rgba(22,20,15,0.16)] pt-2 pb-1.5 text-[0.62rem] uppercase tracking-[0.08em] text-[rgba(22,20,15,0.45)] before:absolute before:-bottom-3.5 before:-left-1 before:text-[0.75rem] before:leading-none before:content-['+'] after:absolute after:-right-1 after:-bottom-[14px] after:text-[0.75rem] after:leading-none after:content-['+']"
					aria-hidden="true"
				>
					<span>{"NODE // 02-PROD"}</span>
					<span>SYSTEM READY ↵</span>
				</div>
			</div>

			<div
				className="pointer-events-auto absolute right-5 bottom-[5.25rem] left-5 z-8 flex items-center justify-between gap-3 whitespace-nowrap border-y border-[rgba(22,20,15,0.24)] py-2 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-[rgba(22,20,15,0.65)] md:hidden"
				role="status"
				data-mobile-status
			>
				<span>AVAILABLE FOR THOUGHTFUL WORK</span>
				<span className="inline-flex items-center gap-1.25 rounded-[14px] border border-[rgba(184,66,46,0.4)] bg-[rgba(184,66,46,0.08)] px-2.75 py-0.75 text-[0.68rem] font-semibold text-rebar">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-rebar" />
					OPEN
				</span>
			</div>
		</>
	);
}
