import { useEffect, useRef, useState } from "react";

import { projects } from "../data";
import {
	labelAccentClass,
	labelRuleClass,
	magneticTargetClass,
	projectTextLinkClass,
	sectionPadClass,
} from "../styles";
import { TechBadgeList } from "../TechBadge";
import { cx } from "../utils";
import { DirectionalHoverText } from "../visuals/DirectionalHoverText";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectCanvas } from "./ProjectCanvas";

const featuredProjects = projects.filter((project) => project.featured);
const archiveProjects = projects.filter((project) => !project.featured);
const featuredProjectIds = [
	"project-web-copilot",
	"project-ai-workspace",
	"project-link-saver",
];
const stackTopClasses = [
	"lg:top-[104px]",
	"lg:top-[120px]",
	"lg:top-[136px]",
] as const;
const stackHeightClasses = [
	"lg:min-h-[calc(100svh-116px)]",
	"lg:min-h-[calc(100svh-132px)]",
	"lg:min-h-[calc(100svh-148px)]",
] as const;
const stackLayerClasses = ["z-1", "z-2", "z-3"] as const;
const stackGroundClasses = [
	"bg-[#1b1814]",
	"bg-[#14191d]",
	"bg-[#201713]",
] as const;
export function ProjectsSection() {
	const deckRef = useRef<HTMLDivElement>(null);
	const chapterRefs = useRef<Array<HTMLElement | null>>([]);
	const surfaceRefs = useRef<Array<HTMLDivElement | null>>([]);
	const activeRef = useRef(0);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const deck = deckRef.current;
		const chapters = chapterRefs.current.filter(
			(chapter): chapter is HTMLElement => chapter !== null,
		);
		const surfaces = surfaceRefs.current.filter(
			(surface): surface is HTMLDivElement => surface !== null,
		);

		if (!deck || chapters.length === 0 || surfaces.length === 0) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let frame = 0;
		let visible = false;

		const activate = (index: number) => {
			if (index === activeRef.current || index < 0) return;
			activeRef.current = index;
			setActiveIndex(index);
		};

		const paintDeck = () => {
			frame = 0;
			if (!visible) return;

			const desktop = window.innerWidth >= 1024;
			if (!desktop || reducedMotion) {
				for (const surface of surfaces) {
					surface.style.removeProperty("--stack-scale");
				}
				return;
			}

			const deckBounds = deck.getBoundingClientRect();
			const travel = Math.max(1, deck.offsetHeight - window.innerHeight);
			const progress = Math.max(
				0,
				Math.min(1, (window.innerHeight * 0.12 - deckBounds.top) / travel),
			);

			for (const [index, surface] of surfaces.entries()) {
				const rangeStart = index / surfaces.length;
				const localProgress = Math.max(
					0,
					Math.min(1, (progress - rangeStart) / (1 - rangeStart)),
				);
				const scaleTo = 1 - (surfaces.length - index - 1) * 0.025;
				const scale = 1 + (scaleTo - 1) * localProgress;
				surface.style.setProperty("--stack-scale", scale.toFixed(4));
			}

			let nextActive = 0;
			for (const [index, chapter] of chapters.entries()) {
				if (chapter.getBoundingClientRect().top <= window.innerHeight * 0.46) {
					nextActive = index;
				}
			}
			activate(nextActive);
		};

		const schedulePaint = () => {
			if (!frame) frame = window.requestAnimationFrame(paintDeck);
		};

		const chapterObserver = new IntersectionObserver(
			(entries) => {
				if (window.innerWidth >= 1024 && !reducedMotion) return;
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activate(chapters.indexOf(entry.target as HTMLElement));
					}
				}
			},
			{ rootMargin: "-28% 0px -48% 0px", threshold: 0.06 },
		);
		for (const chapter of chapters) chapterObserver.observe(chapter);

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) schedulePaint();
		});
		visibilityObserver.observe(deck);
		window.addEventListener("scroll", schedulePaint, { passive: true });
		window.addEventListener("resize", schedulePaint);

		return () => {
			chapterObserver.disconnect();
			visibilityObserver.disconnect();
			window.removeEventListener("scroll", schedulePaint);
			window.removeEventListener("resize", schedulePaint);
			if (frame) window.cancelAnimationFrame(frame);
			for (const surface of surfaces) {
				surface.style.removeProperty("--stack-scale");
			}
		};
	}, []);

	return (
		<section id="projects" className="relative isolate bg-ink">
			<header className="relative min-h-[78svh] overflow-hidden border-b border-[rgba(246,242,233,0.14)] px-pad-x pt-[clamp(86px,13vh,144px)] pb-[clamp(62px,9vh,104px)] text-paper">
				<span
					className="pointer-events-none absolute -right-[0.04em] -bottom-[0.31em] font-serif text-[clamp(18rem,44vw,46rem)] leading-none tracking-[-0.1em] text-[rgba(246,242,233,0.035)]"
					aria-hidden="true"
				>
					01
				</span>
				<div className="relative z-10 flex items-center justify-between gap-6 border-t border-[rgba(246,242,233,0.18)] pt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/48">
					<span className="text-rebar">01 / Selected work</span>
					<span>Three shipped systems / one field study</span>
				</div>
				<div className="relative z-10 mt-[clamp(72px,12vh,132px)] grid items-end gap-[clamp(42px,9vw,142px)] lg:grid-cols-[minmax(0,1.22fr)_minmax(280px,0.42fr)]">
					<h2 className="m-0 max-w-[9em] font-serif text-[clamp(4rem,9.4vw,10rem)] font-normal leading-[0.79] tracking-[-0.065em]">
						Work you can
						<br />
						<em className="font-light text-rebar">enter.</em>
					</h2>
					<div className="max-w-[430px] border-t border-[rgba(246,242,233,0.24)] pt-6 lg:pb-3">
						<p className="m-0 text-[0.96rem] leading-[1.75] text-paper/66">
							Three shipped systems, treated as working artifacts rather than
							portfolio thumbnails. Follow each surface from interface to proof.
						</p>
						<p className="mt-7 font-mono text-[0.56rem] uppercase tracking-[0.13em] text-rebar">
							Scroll to assemble the deck ↓
						</p>
					</div>
				</div>
			</header>

			<nav
				className="sticky top-0 z-[18] grid grid-cols-3 border-b border-[rgba(246,242,233,0.14)] bg-ink/90 px-pad-x backdrop-blur-md md:top-12"
				aria-label="Featured project chapters"
			>
				{featuredProjects.map((project, index) => (
					<a
						key={project.name}
						href={`#${featuredProjectIds[index]}`}
						className={cx(
							"group relative flex min-h-12 items-center justify-center gap-2 border-x border-transparent font-mono text-[0.54rem] uppercase tracking-[0.1em] text-paper/42 transition-colors duration-300 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-rebar after:transition-transform after:duration-500 hover:text-paper max-sm:[&_strong]:hidden",
							activeIndex === index &&
								"border-[rgba(246,242,233,0.08)] text-rebar after:scale-x-100",
						)}
						aria-current={activeIndex === index ? "location" : undefined}
					>
						<span>{String(index + 1).padStart(2, "0")}</span>
						<strong className="font-normal">
							{index === 0
								? "Web Copilot"
								: index === 1
									? "AI Workspace"
									: "Link Saver"}
						</strong>
					</a>
				))}
			</nav>

			<div
				ref={deckRef}
				className="relative bg-ink px-[clamp(10px,2vw,28px)] pt-5 pb-[18svh]"
			>
				{featuredProjects.map((project, index) => (
					<article
						key={project.name}
						id={featuredProjectIds[index]}
						ref={(chapter) => {
							chapterRefs.current[index] = chapter;
						}}
						className={cx(
							"relative mb-[10svh] scroll-mt-12 last:mb-0 lg:sticky lg:scroll-mt-0",
							stackTopClasses[index],
							stackHeightClasses[index],
							stackLayerClasses[index],
						)}
					>
						<div
							ref={(surface) => {
								surfaceRefs.current[index] = surface;
							}}
							className={cx(
								"relative isolate flex origin-top flex-col overflow-hidden border border-[rgba(246,242,233,0.16)] px-[clamp(18px,3vw,46px)] py-[clamp(20px,3vh,34px)] text-paper shadow-[0_-18px_60px_rgba(0,0,0,0.22)] will-change-transform [transform:scale(var(--stack-scale,1))]",
								stackHeightClasses[index],
								stackGroundClasses[index],
							)}
						>
							<span
								className="pointer-events-none absolute -right-[0.02em] -bottom-[0.27em] -z-10 font-serif text-[clamp(16rem,34vw,37rem)] leading-none tracking-[-0.1em] text-[rgba(246,242,233,0.035)]"
								aria-hidden="true"
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							<header className="flex items-start justify-between gap-6 border-b border-[rgba(246,242,233,0.16)] pb-4 font-mono text-[0.54rem] uppercase tracking-[0.11em] text-paper/46">
								<span>
									<strong className="mr-2 font-normal text-rebar">
										{String(index + 1).padStart(2, "0")} /
									</strong>
									{project.type}
								</span>
								<ProjectBadge project={project} inverse />
							</header>

							<div className="grid flex-1 items-center gap-[clamp(30px,5vw,82px)] py-[clamp(28px,4vh,54px)] lg:grid-cols-[minmax(230px,0.46fr)_minmax(0,1.2fr)]">
								<div className="relative z-10 max-w-[520px]">
									<p className="mb-5 font-mono text-[0.56rem] uppercase tracking-[0.13em] text-rebar">
										Working artifact / {String(index + 1).padStart(2, "0")}
									</p>
									<h3 className="m-0 max-w-[8em] font-serif text-[clamp(3rem,5.4vw,6.4rem)] font-normal leading-[0.84] tracking-[-0.055em]">
										{project.name}
									</h3>
									<p className="mt-7 max-w-[41em] text-[0.88rem] leading-[1.68] text-paper/64">
										{project.proof}
									</p>
									<div className="mt-7 flex flex-wrap gap-2 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-paper/52">
										{project.stack.slice(0, 4).map((item) => (
											<span key={item} className="border-l border-rebar pl-2">
												{item}
											</span>
										))}
									</div>
									{project.href && (
										<a
											href={project.href}
											target="_blank"
											rel="noreferrer"
											className={cx(
												magneticTargetClass,
												"mt-8 inline-flex min-h-12 items-center justify-between gap-8 bg-rebar px-5 py-3 font-mono text-[0.58rem] uppercase tracking-[0.11em] text-paper transition-colors duration-300 [clip-path:polygon(10px_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%,0_10px)] hover:bg-paper hover:text-ink",
											)}
											data-magnetic
										>
											{project.linkLabel}
											<span aria-hidden="true">↗</span>
										</a>
									)}
								</div>

								<div className="min-w-0">
									<ProjectCanvas
										project={project}
										active={activeIndex === index}
									/>
								</div>
							</div>

							<ol className="m-0 grid list-none border-t border-[rgba(246,242,233,0.16)] p-0 md:grid-cols-3 max-md:[&>li:nth-child(n+2)]:hidden">
								{project.highlights.map((highlight, highlightIndex) => (
									<li
										key={highlight}
										className="grid grid-cols-[24px_1fr] gap-3 border-[rgba(246,242,233,0.12)] py-4 text-[0.66rem] leading-[1.5] text-paper/48 md:border-r md:px-4 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
									>
										<span className="font-mono text-[0.5rem] text-rebar">
											{String(highlightIndex + 1).padStart(2, "0")}
										</span>
										{highlight}
									</li>
								))}
							</ol>
						</div>
					</article>
				))}
			</div>

			<div
				id="project-archive"
				className={cx(
					sectionPadClass,
					"scroll-mt-12 bg-paper text-ink max-md:px-5 lg:scroll-mt-0",
				)}
			>
				<div
					className="grid grid-cols-[1.2fr_0.6fr] items-end gap-[clamp(36px,8vw,120px)] pb-[clamp(48px,7vw,82px)] max-lg:grid-cols-1 max-md:gap-[30px]"
					data-reveal="line"
				>
					<div>
						<p className={labelAccentClass}>
							<span className={labelRuleClass} />
							Complete archive / 06
						</p>
						<h2 className="mt-6 mb-0 font-serif text-[clamp(3.3rem,7vw,7.2rem)] font-normal leading-[0.86] tracking-[-0.05em]">
							The rest of the
							<br />
							<em className="font-light text-rebar">system map</em>.
						</h2>
					</div>
					<p className="m-0 max-w-[430px] leading-[1.7] text-ink-soft">
						Six more systems, indexed quietly until you want scope, stack, and
						delivery evidence.
					</p>
				</div>

				<div className="border-t border-line">
					{archiveProjects.map((project, index) => (
						<details key={project.name} className="group border-b border-line">
							<summary className="group/summary grid cursor-pointer list-none grid-cols-[46px_1fr_auto_28px] items-center gap-[clamp(14px,3vw,48px)] py-[26px] transition-[padding,background-color] duration-300 hover:bg-bone hover:px-[14px] max-md:grid-cols-[34px_1fr_24px] max-md:[&>div]:hidden [&::-webkit-details-marker]:hidden">
								<span className="font-mono text-[0.58rem] text-rebar">
									{String(index + featuredProjects.length + 1).padStart(2, "0")}
								</span>
								<span>
									<DirectionalHoverText
										text={project.name}
										className="font-serif text-[clamp(1.5rem,2.7vw,2.8rem)] leading-none tracking-[-0.025em]"
									/>
									<small className="mt-2 block font-mono text-[0.52rem] uppercase tracking-[0.08em] text-muted">
										{project.type}
									</small>
								</span>
								<div>
									<ProjectBadge project={project} />
								</div>
								<span className="relative h-5 w-5" aria-hidden="true">
									<span className="absolute top-1/2 left-0 block h-px w-full bg-ink" />
									<span className="absolute top-1/2 left-0 block h-px w-full rotate-90 bg-ink transition-transform duration-300 group-open:rotate-0" />
								</span>
							</summary>

							<div className="grid grid-cols-[0.78fr_1.22fr] gap-[clamp(34px,7vw,110px)] pt-2 pr-[7vw] pb-11 pl-20 group-open:motion-safe:animate-detail-in max-md:grid-cols-1 max-md:gap-7 max-md:pt-0.5 max-md:pr-[14px] max-md:pb-[38px] max-md:pl-12">
								<div>
									<p className="m-0 text-[0.86rem] leading-[1.65] text-ink-soft">
										{project.proof}
									</p>
									<div className="mt-5">
										<TechBadgeList items={project.stack} />
									</div>
								</div>
								<div>
									<ul className="m-0 grid list-none gap-3 p-0">
										{project.highlights.map((highlight) => (
											<li
												key={highlight}
												className="grid grid-cols-[10px_1fr] gap-3 text-[0.78rem] leading-[1.55] text-ink-soft"
											>
												<span
													className="mt-[0.62em] h-[3px] w-[3px] bg-rebar"
													aria-hidden="true"
												/>
												{highlight}
											</li>
										))}
									</ul>
									{project.href ? (
										<a
											href={project.href}
											target="_blank"
											rel="noreferrer"
											className={projectTextLinkClass}
										>
											{project.linkLabel}
											<span aria-hidden="true">↗</span>
										</a>
									) : (
										<p className="mt-6 font-mono text-[0.56rem] uppercase tracking-[0.08em] text-muted">
											Private system / evidence summarized from the CV
										</p>
									)}
								</div>
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
