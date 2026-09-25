import { magneticTargetClass } from "../styles";
import { cx } from "../utils";
import { HumanLoopPanel } from "../visuals/HumanLoopPanel";
import { HumanQuoteBox } from "../visuals/HumanPrinciplesPanel";
import { KineticDisplayText } from "../visuals/KineticDisplayText";
import { PixelTrailField } from "../visuals/PixelTrailField";
import { SystemSignal } from "../visuals/SystemSignal";

const pipelineSteps = [
	{
		code: "01",
		title: "AI drafts",
		copy: "Explores options and surfaces trade-offs.",
		tag: "Input",
		micro: "System expands the field",
		kind: "draft",
	},
	{
		code: "02",
		title: "Human decides",
		copy: "Context, values, and judgment set direction.",
		tag: "Decide",
		micro: "Judgment sets direction",
		kind: "decision",
	},
	{
		code: "03",
		title: "Real impact",
		copy: "Ships with clarity, ownership, and intent.",
		tag: "Output",
		micro: "Impact returns as signal",
		kind: "impact",
	},
] as const;

function PipelineGlyph({
	kind,
}: {
	kind: (typeof pipelineSteps)[number]["kind"];
}) {
	return (
		<svg
			className="h-5 w-5"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.15"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{kind === "draft" && (
				<g fill="currentColor" stroke="none">
					{[4, 8, 12].flatMap((y) =>
						[4, 8, 12].map((x) => (
							<circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" />
						)),
					)}
				</g>
			)}
			{kind === "decision" && (
				<>
					<circle cx="8" cy="5.25" r="2.1" />
					<path d="M4.25 13c.25-2.35 1.5-3.55 3.75-3.55S11.5 10.65 11.75 13" />
				</>
			)}
			{kind === "impact" && (
				<>
					<path d="m8 2.25 5 2.8v5.9l-5 2.8-5-2.8v-5.9l5-2.8Z" />
					<path d="m3.3 5.25 4.7 2.7 4.7-2.7M8 7.95v5.35" />
				</>
			)}
		</svg>
	);
}

function DecisionPipeline() {
	return (
		<aside
			className="relative hidden w-full opacity-100 transition-[opacity,transform] delay-[820ms] duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-3 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 min-[1180px]:block motion-reduce:translate-y-0"
			aria-label="Decision pipeline"
			data-decision-pipeline
		>
			<div className="flex justify-start">
				<span className="inline-flex rounded-xs border border-rebar/40 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-rebar/80">
					[ Decision pipeline ]
				</span>
			</div>

			<div
				className="pointer-events-none absolute top-[77px] bottom-[37px] -left-3 w-11 text-ink/30"
				aria-hidden="true"
			>
				<svg
					className="absolute inset-0 h-full w-full overflow-visible"
					viewBox="0 0 44 210"
					preserveAspectRatio="none"
					fill="none"
				>
					<title>Feedback loop</title>
					<path
						d="M 39 4 H 31 C 15 4 10 18 10 34 V 176 C 10 192 15 206 31 206 H 39"
						stroke="currentColor"
						strokeWidth="1"
						strokeDasharray="3 4"
						vectorEffect="non-scaling-stroke"
					/>
					<path d="m35 0 4 4-4 4M35 202l4 4-4 4" stroke="currentColor" />
				</svg>
				<span className="absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[0.42rem] uppercase leading-[1.35] tracking-[0.08em] [writing-mode:vertical-rl]">
					Feedback loop
				</span>
			</div>

			<ol className="relative mt-4 grid list-none gap-3 p-0 pr-7 pl-12 before:absolute before:top-[34px] before:bottom-[34px] before:left-[82px] before:border-l before:border-dashed before:border-ink/24 after:absolute after:top-[41px] after:right-[77px] after:bottom-[41px] after:border-l after:border-dashed after:border-ink/22">
				{pipelineSteps.map((step) => (
					<li
						key={step.code}
						className="relative grid min-h-[82px] grid-cols-[68px_minmax(0,1fr)_112px] items-center gap-x-5"
					>
						<span
							className={cx(
								"relative z-1 grid h-[68px] w-[68px] place-items-center rounded-full border border-ink/24 bg-bone before:absolute before:-inset-[6px] before:rounded-full before:border before:border-ink/10 after:absolute after:inset-[5px] after:rounded-full after:border after:border-dashed after:border-ink/18",
								step.kind === "draft" ? "text-rebar/85" : "text-ink/72",
							)}
						>
							<span className="relative z-1 grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-bone">
								<PipelineGlyph kind={step.kind} />
							</span>

							<span className="absolute -top-[9px] left-1/2 h-2 w-px -translate-x-1/2 bg-ink/28" />
							<span className="absolute top-1/2 -right-[9px] h-px w-2 bg-ink/28" />
							<span className="absolute -bottom-[9px] left-1/2 h-2 w-px -translate-x-1/2 bg-ink/28" />
							<span className="absolute top-1/2 -left-[9px] h-px w-2 bg-ink/28" />
						</span>

						<div className="min-w-0 text-left">
							<div className="flex items-center justify-start gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-ink/70" />
								<span className="font-mono text-[0.56rem] font-semibold tracking-[0.08em] text-rebar/80">
									{step.code}
								</span>
								<strong className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink/82">
									{step.title}
								</strong>
							</div>
							<p className="mt-1.5 mb-0 max-w-[42ch] text-[0.74rem] leading-[1.4] text-ink">
								{step.copy}
							</p>
							<small className="mt-1.5 block font-mono text-[0.42rem] uppercase tracking-[0.11em] text-ink/28">
								{step.micro}
							</small>
						</div>

						<div className="relative h-full min-h-[82px] -translate-x-12">
							<span
								className="absolute top-1/2 -left-5 right-0 border-t border-dashed border-ink/22"
								aria-hidden="true"
							/>
							<span
								className={cx(
									"absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 rounded-xs border bg-bone px-3 py-1 font-mono text-[0.50rem] uppercase tracking-[0.09em]",
									step.kind === "decision"
										? "border-rebar/45 text-rebar/85"
										: "border-ink/20 text-ink/45",
								)}
							>
								{step.tag}
							</span>

							{step.kind === "decision" && (
								<span
									className="absolute top-1/2 left-full h-px w-[calc(var(--reticle-left)-var(--left-rail-left,var(--spacing-pad-x))-var(--left-rail-w)+58px)] -translate-y-1/2 bg-[repeating-linear-gradient(to_right,rgba(22,20,15,0.24)_0_3px,transparent_3px_6px)] [mask-image:linear-gradient(to_right,#000_0%,transparent_100%)]"
									aria-hidden="true"
								/>
							)}
						</div>
					</li>
				))}
			</ol>
		</aside>
	);
}

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative isolate h-dvh min-h-dvh overflow-hidden bg-bone px-pad-x pt-6 pb-4.5
				[--display-fs:clamp(5.5rem,12vw,12.5rem)]
				[--human-left:2.3%]
				[--left-rail-w:min(570px,42vw)]
				[--left-rail-left:clamp(14px,2vw,32px)]
				[--loop-bottom:clamp(18px,2.5vh,28px)]
				[--loop-fs:clamp(3.2rem,7.5vw,7.8rem)]
				[--connector-end:calc(var(--panel-left)-10px)]
				[--panel-left:calc(100%-var(--spacing-pad-x)-clamp(270px,22vw,340px))]
				[--portrait-brightness:0.62]
				[--portrait-contrast:1.30]
				[--portrait-dot:3px]
				[--portrait-h:clamp(420px,58vh,560px)]
				[--portrait-top:16%]
				[--portrait-w:clamp(300px,24vw,400px)]
				[--reticle-left:calc(54%-(var(--portrait-w)*0.29))]
				[--reticle-right:calc(54%+(var(--portrait-w)*0.29))]
				[--signal-x:50%]
				[--signal-y:50%]
				before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(rgba(22,20,15,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(22,20,15,0.035)_1px,transparent_1px)] before:bg-size-[48px_48px] before:opacity-[0.3] before:mask-[radial-gradient(circle_at_var(--signal-x)_var(--signal-y),black,transparent_62%)]
				after:pointer-events-none after:absolute after:inset-0 after:z-1 after:bg-[radial-gradient(circle_150px_at_var(--signal-x)_var(--signal-y),rgba(240,224,214,0.44),transparent_68%)]
				max-lg:[--display-fs:clamp(5rem,14vw,9rem)]
				max-lg:[--portrait-dot:2.5px]
				max-lg:[--portrait-h:clamp(400px,60vh,540px)]
				max-lg:[--portrait-w:clamp(270px,36vw,370px)]
				max-md:px-5 max-md:pt-5
				max-md:[--display-fs:clamp(3.5rem,17.75vw,5.25rem)]
				max-md:[--human-left:-1.5%]
				max-md:[--loop-bottom:clamp(10.75rem,24vh,13.5rem)]
				max-md:[--loop-fs:clamp(2rem,8.6vw,3.25rem)]
				max-md:[--portrait-dot:2.25px]
				max-md:[--portrait-h:clamp(340px,50vh,440px)]
				max-md:[--portrait-top:24%]
				max-md:[--portrait-w:clamp(230px,66vw,290px)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--display-fs:clamp(5rem,10vw,8rem)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--loop-bottom:clamp(14px,2vh,22px)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--loop-fs:clamp(2.6rem,5.1vw,5.2rem)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-h:clamp(410px,66vh,510px)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-top:15%]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-w:clamp(300px,28vw,400px)]
				[@media(min-width:769px)_and_(max-width:1024px)]:[--loop-bottom:clamp(18px,2.5vh,28px)]
				motion-reduce:after:hidden"
			data-signal-hero
		>
			<PixelTrailField />
			<div className="absolute inset-x-pad-x top-7 z-8 grid grid-cols-[1fr_auto_1fr] items-start gap-8 font-mono text-[0.6rem] leading-[1.55] uppercase tracking-[0.12em] max-lg:grid-cols-[1fr_auto] max-md:inset-x-5 max-md:top-[22px] max-md:gap-4 max-md:text-left [&_p]:m-0 [&_p>small]:block [&_p>small]:text-[0.52rem] [&_p>small]:text-muted [&_p>span]:block max-md:[&_p:last-child]:hidden max-md:[&_p>small]:hidden [@media(min-width:900px)_and_(max-height:760px)]:top-6">
				<p>
					<span>Tong Duc Thanh Nam</span>
					<small>AI Product Builder / Full-stack TypeScript</small>
				</p>
				<p className="flex items-center gap-3 whitespace-nowrap text-ink-soft max-md:justify-end max-md:gap-1.5 max-md:text-[0.52rem] max-[359px]:hidden [&_span]:text-rebar">
					<span>AI drafts</span>
					<i
						className="font-serif text-xl not-italic text-muted"
						aria-hidden="true"
					>
						→
					</i>
					<span>Human decides</span>
				</p>
				<p className="justify-self-end text-right">
					<span>Ho Chi Minh City, Vietnam</span>
					<small>
						<span
							className="mr-1.25 inline-block h-1.5 w-1.5 animate-green-pulse rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"
							aria-hidden="true"
						/>{" "}
						Available for thoughtful work
					</small>
				</p>
			</div>
			<h1 className="pointer-events-none absolute inset-0 z-0 m-0 max-md:z-4">
				<span className="sr-only">
					Tong Duc Thanh Nam — The Human-in-the-Loop for AI Products &
					Full-stack TypeScript
				</span>
				<span
					className="absolute top-[11%] left-24 inline-flex whitespace-nowrap font-serif text-9xl leading-[0.72] font-normal max-md:right-5 max-md:left-5 max-md:justify-center max-md:text-[length:var(--display-fs)]"
					aria-hidden="true"
				>
					<KineticDisplayText text="HUMAN" direction="down" />
				</span>
				<span
					className="absolute right-pad-x bottom-(--loop-bottom) inline-flex whitespace-nowrap font-serif text-[length:var(--loop-fs)] leading-[0.72] font-normal tracking-[-0.03em] text-ink-soft max-md:right-5 max-md:left-5 max-md:justify-center max-md:text-center max-md:leading-[0.78]"
					aria-hidden="true"
					data-display-loop
				>
					<KineticDisplayText text="IN THE LOOP" delayOffset={2} />
				</span>
			</h1>

			{/* Left Rail */}
			<div className="absolute top-[28.5%] left-(--left-rail-left) z-7 flex w-(--left-rail-w) flex-col gap-3.5 opacity-100 transition-opacity delay-[220ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:top-[23%] max-md:left-5 max-md:w-[min(68vw,280px)] [@media(min-width:900px)_and_(max-height:760px)]:top-[26%]">
				<DecisionPipeline />

				{/* Hero Actions */}
				<div
					className="flex flex-wrap items-center gap-3.5 pl-16 opacity-100 transition-opacity delay-[580ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:fixed max-md:bottom-5 max-md:right-5 max-md:left-5 max-md:z-20 max-md:flex max-md:w-auto max-md:max-w-none max-md:pl-0 max-md:[&>*]:basis-0 max-md:[&_a]:min-w-0 max-md:[&_a]:flex-1"
					data-actions
				>
					<a
						href="#projects"
						className={cx(
							magneticTargetClass,
							"group relative inline-flex min-h-12 min-w-[200px] items-center justify-between gap-4 overflow-hidden rounded-xs border border-ink bg-ink px-6 py-3 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-bone shadow-sm transition-all duration-300 ease-fluid hover:border-rebar hover:bg-rebar hover:shadow-md hover:shadow-rebar/20 max-md:min-w-0 max-md:px-3.5 max-md:text-[0.54rem] max-md:tracking-[0.08em]",
						)}
						data-magnetic
					>
						<span
							className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							aria-hidden="true"
						/>
						<span className="flex items-center gap-2">
							<span
								className="h-1.5 w-1.5 rounded-full bg-rebar transition-colors duration-300 group-hover:bg-bone"
								aria-hidden="true"
							/>
							<span className="font-semibold whitespace-nowrap">
								Enter the system
							</span>
						</span>
						<span
							className="inline-flex h-5.5 w-5.5 items-center justify-center rounded-xs border border-white/20 bg-white/10 text-[0.65rem] transition-transform duration-300 ease-fluid group-hover:translate-y-[2px] group-hover:border-white/40"
							aria-hidden="true"
						>
							↓
						</span>
					</a>
					<a
						href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
						target="_blank"
						rel="noreferrer"
						className={cx(
							magneticTargetClass,
							"group relative inline-flex min-h-12 min-w-[180px] items-center justify-between gap-4 rounded-xs border border-ink/30 bg-bone/90 px-7 py-3 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink backdrop-blur-xs transition-all duration-300 ease-fluid hover:border-ink hover:bg-ink hover:text-bone max-md:min-w-0 max-md:px-3.5 max-md:text-[0.54rem] max-md:tracking-[0.08em]",
						)}
						data-magnetic
					>
						<span className="font-semibold whitespace-nowrap">Open CV</span>
						<span
							className="inline-flex h-5.5 w-5.5 items-center justify-center rounded-xs border border-ink/16 bg-ink/5 text-[0.65rem] transition-all duration-300 ease-fluid group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-bone group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
				</div>
			</div>

			{/* Portrait */}
			<div
				className="group absolute top-[var(--portrait-top)] left-[54%] z-3 h-[var(--portrait-h)] w-[var(--portrait-w)] translate-x-[-50%] translate-y-0 opacity-100 transition-[opacity,transform] delay-160 duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-[10%] [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:left-1/2"
				data-figure
			>
				<span className="pointer-events-none absolute inset-0 z-2 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_0_88%,transparent_100%)]">
					<span className="absolute inset-0 [clip-path:inset(0)] transition-[clip-path] duration-[1700ms] ease-[cubic-bezier(0.45,0,0.2,1)] will-change-[clip-path] group-hover:[clip-path:inset(100%_0_0_0)] motion-reduce:[clip-path:inset(0)] motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-0 motion-reduce:group-hover:[clip-path:inset(0)]">
						<img
							className="absolute -top-[3%] left-1/2 h-auto w-[136%] max-w-none -translate-x-1/2 mix-blend-multiply opacity-90 max-md:w-[146%]"
							src="/images/avatar-ascii.svg"
							alt="Tong Duc Thanh Nam"
							width="720"
							height="1080"
							loading="eager"
							decoding="async"
							data-portrait-ascii
						/>
					</span>
					<span className="absolute inset-0 [clip-path:inset(0_0_100%_0)] transition-[clip-path] duration-[1700ms] ease-[cubic-bezier(0.45,0,0.2,1)] will-change-[clip-path] group-hover:[clip-path:inset(0)] motion-reduce:opacity-0 motion-reduce:[clip-path:inset(0)] motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:group-hover:opacity-100">
						<img
							className="absolute -top-[3%] left-1/2 h-auto w-[136%] max-w-none -translate-x-1/2 max-md:w-[146%]"
							src="/images/avatar-cutout.webp"
							alt=""
							width="1024"
							height="1536"
							loading="eager"
							decoding="async"
							aria-hidden="true"
							data-portrait-photo
						/>
					</span>
				</span>
				{/* Scan the full portrait bounds; the face reticle only anchors
				the callouts and no longer clips the beam's vertical travel. */}
				<span
					className="pointer-events-none absolute inset-0 z-[3] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_6%,#000_94%,transparent_100%)]"
					aria-hidden="true"
					data-scan-viewport
				>
					<span className="absolute -top-8 inset-x-[-10%] h-8 animate-portrait-scan border-b border-rebar/80 bg-[linear-gradient(180deg,transparent_0%,rgba(184,66,46,0.04)_42%,rgba(184,66,46,0.18)_100%)] opacity-0 shadow-[0_7px_14px_-7px_rgba(184,66,46,0.8)] motion-reduce:hidden" />
					<span
						className="absolute -top-8 inset-x-[-10%] h-8 border-b border-rebar/80 bg-[linear-gradient(180deg,transparent_0%,rgba(184,66,46,0.04)_42%,rgba(184,66,46,0.18)_100%)] opacity-100 shadow-[0_7px_14px_-7px_rgba(184,66,46,0.8)] transition-[top] duration-[1800ms] ease-[cubic-bezier(0.45,0,0.2,1)] will-change-[top] group-hover:top-[calc(100%_-_2rem)] motion-reduce:hidden"
						data-scan-beam
					/>
				</span>
				<div
					className="pointer-events-none absolute inset-x-[20%] top-[8.5%] z-[4] h-[33%] opacity-100 transition-[opacity,transform] delay-[700ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-2 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:hidden motion-reduce:translate-y-0"
					aria-hidden="true"
					data-figure-reticle
				>
					<span className="absolute top-0 left-0 h-5 w-5 border-t border-l border-[rgba(22,20,15,0.45)] transition-colors duration-300 group-hover:border-rebar" />
					<span className="absolute top-0 right-0 h-5 w-5 border-t border-r border-[rgba(22,20,15,0.45)] transition-colors duration-300 group-hover:border-rebar" />
					<span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[rgba(22,20,15,0.45)] transition-colors duration-300 group-hover:border-rebar" />
					<span className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-[rgba(22,20,15,0.45)] transition-colors duration-300 group-hover:border-rebar" />

					{/* Callout anchors sit near the portrait silhouette rather than
					on the reticle corners. They stay hidden until the hover scan reaches
					their position. Percentages keep them attached as it scales. */}
					<div
						className="absolute top-[115%] right-[36%] z-[6] translate-y-1 opacity-0 transition-[opacity,transform] delay-0 duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[660ms] [@media(max-width:1180px)]:hidden motion-reduce:duration-0 motion-reduce:group-hover:delay-0"
						data-callout="ai-engineer"
					>
						<svg
							className="absolute top-0 left-0 h-10 w-[20px] overflow-visible"
							viewBox="0 0 10 40"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M26 20 L50 54 H100"
								stroke="var(--color-rebar)"
								strokeWidth="1.15"
								strokeDasharray="3 2"
							/>
							<circle cx="26" cy="20" r="2" fill="var(--color-rebar)" />
						</svg>
						<div className="absolute -bottom-[68px] left-[90px] flex w-max flex-col items-start gap-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em]">
							<span className="text-[0.4rem] tracking-[0.12em] text-muted">
								{"SYS.01 // NEURAL"}
							</span>
							<span className="rounded-xs border border-rebar/60 bg-bone/95 px-1.5 py-0.5 text-rebar shadow-xs backdrop-blur-[2px]">
								[ AI ENGINEER ]
							</span>
						</div>
					</div>

					<div
						className="absolute top-[-15px] left-[62%] z-[6] translate-y-1 opacity-0 transition-[opacity,transform] delay-0 duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[400ms] [@media(max-width:1280px)]:hidden motion-reduce:duration-0 motion-reduce:group-hover:delay-0"
						data-callout="software-engineer"
					>
						<svg
							className="absolute bottom-0 left-0 h-8 w-4 overflow-visible"
							viewBox="0 0 16 32"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M-25 40 L0 11 H18"
								stroke="var(--color-rebar)"
								strokeWidth="1.15"
								strokeDasharray="3 2"
							/>
							<circle cx="-25" cy="40" r="2" fill="var(--color-rebar)" />
						</svg>
						<div className="absolute bottom-[2px] left-4 flex w-max flex-col items-start gap-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em]">
							<span className="rounded-xs border border-rebar/60 bg-bone/95 px-1.5 py-0.5 text-rebar shadow-xs backdrop-blur-[2px]">
								[ SOFTWARE ENGINEER ]
							</span>
							<span className="text-[0.4rem] tracking-[0.12em] text-muted">
								{"STACK // TS & REACT"}
							</span>
						</div>
					</div>

					<div
						className="absolute top-[160%] left-[2%] z-[6] translate-y-1 opacity-0 transition-[opacity,transform] delay-0 duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[720ms] [@media(max-width:1180px)]:hidden motion-reduce:duration-0 motion-reduce:group-hover:delay-0"
						data-callout="product-builder"
					>
						<svg
							className="absolute top-0 right-0 h-8 w-4 overflow-visible"
							viewBox="0 0 16 32"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M40 -20 L12 11 H0"
								stroke="rgba(22,20,15,0.68)"
								strokeWidth="1.15"
								strokeDasharray="3 2"
							/>
							<circle cx="40" cy="-20" r="2" fill="rgba(22,20,15,0.6)" />
						</svg>
						<div className="absolute top-[2px] right-4 flex w-max flex-col items-end gap-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em]">
							<span className="rounded-xs border border-ink/30 bg-bone/95 px-1.5 py-0.5 text-ink shadow-xs backdrop-blur-[2px]">
								[ PRODUCT BUILDER ]
							</span>
							<span className="text-[0.4rem] tracking-[0.12em] text-muted">
								{"LOOP // HUMAN DECIDES"}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Connector SVG: Avatar to Loop */}
			<svg
				className="pointer-events-none absolute top-[calc(var(--portrait-top)+(var(--portrait-h)*0.225))] left-(--reticle-right) z-[3] h-[310px] w-[calc(var(--connector-end)_-_var(--reticle-right))] overflow-visible opacity-100 transition-[opacity,transform] delay-[900ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:-translate-x-3 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 [@media(max-width:1024px)]:hidden motion-reduce:translate-x-0"
				viewBox="0 0 160 310"
				preserveAspectRatio="none"
				fill="none"
				aria-hidden="true"
				data-figure-connector
			>
				<path
					className="animate-dash motion-reduce:animate-none"
					d="M 0 0 H 118 V 310"
					stroke="rgba(22,20,15,0.52)"
					strokeWidth="1.5"
					strokeDasharray="3 3"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
			<SystemSignal />
			<HumanLoopPanel />
			<HumanQuoteBox />
		</section>
	);
}
