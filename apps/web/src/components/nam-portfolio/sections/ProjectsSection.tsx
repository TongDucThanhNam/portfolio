import { useEffect, useRef, useState } from "react";

import { projects } from "../data";
import {
	buttonBaseClass,
	buttonGhostClass,
	buttonPrimaryClass,
	chipClass,
	labelAccentClass,
	labelRuleClass,
	projectTextLinkClass,
	sectionPadClass,
} from "../styles";
import { cx } from "../utils";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectCanvas } from "./ProjectCanvas";

const featuredProjects = projects.filter((project) => project.featured);
const archiveProjects = projects.filter((project) => !project.featured);
const featuredProjectIds = [
	"project-web-copilot",
	"project-ai-workspace",
	"project-link-saver",
];
const railProgressClasses = [
	"scale-y-[0.333333]",
	"scale-y-[0.666667]",
	"scale-y-100",
];

export function ProjectsSection() {
	const chapterRefs = useRef<Array<HTMLElement | null>>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const observers = chapterRefs.current
			.filter((chapter): chapter is HTMLElement => chapter !== null)
			.map((chapter, index) => {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting) setActiveIndex(index);
					},
					{
						rootMargin: "-24% 0px -46% 0px",
						threshold: 0.08,
					},
				);
				observer.observe(chapter);
				return observer;
			});

		return () => {
			for (const observer of observers) observer.disconnect();
		};
	}, []);

	return (
		<section id="projects" className="relative isolate bg-bone">
			<header className="grid min-h-[44svh] grid-cols-[1.25fr_0.45fr] items-end gap-[clamp(36px,8vw,120px)] border-b border-line bg-paper pt-[clamp(80px,11vh,132px)] pr-[calc(var(--spacing-pad-x)+12vw)] pb-[72px] pl-pad-x max-lg:pr-pad-x max-md:min-h-[50svh] max-md:grid-cols-1 max-md:content-end max-md:gap-8 max-md:px-5 max-md:pt-[72px] max-md:pb-[52px]">
				<div>
					<p className={labelAccentClass}>
						<span className={labelRuleClass} />
						01 / Selected work
					</p>
					<h2 className="mt-6 mb-0 font-serif text-[clamp(3.7rem,8.5vw,9rem)] font-normal leading-[0.84] tracking-[-0.055em] max-md:text-[clamp(3.4rem,17vw,5.4rem)]">
						Three systems.
						<br />
						One <em className="font-light text-rebar">working</em> loop.
					</h2>
				</div>
				<div className="max-w-[430px] pb-8 max-md:pb-0">
					<p className="m-0 leading-[1.7] text-ink-soft">
						Follow the signal through three shipped product surfaces. The
						interface is the evidence; technical detail opens only when you need
						it.
					</p>
					<span className="mt-6 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-rebar">
						03 featured / 06 archive
					</span>
				</div>
			</header>

			<nav
				className="sticky top-[calc(50vh-118px)] z-[18] mt-7 mr-pad-x mb-[-260px] ml-auto grid w-[172px] gap-0 pl-[30px] max-xl:w-[54px] max-lg:hidden"
				aria-label="Featured project chapters"
			>
				<span
					className="absolute top-2 bottom-2 left-[7px] w-px bg-line"
					aria-hidden="true"
				>
					<i
						className={cx(
							"block h-full w-full origin-top bg-rebar transition-transform duration-700 ease-fluid",
							railProgressClasses[activeIndex],
						)}
					/>
				</span>
				{featuredProjects.map((project, index) => (
					<a
						key={project.name}
						href={`#${featuredProjectIds[index]}`}
						className={cx(
							"group relative grid grid-cols-[24px_1fr] gap-2 py-[13px] font-mono text-[0.56rem] uppercase tracking-[0.08em] text-muted transition-colors duration-300 before:absolute before:top-1/2 before:-left-[27px] before:h-[7px] before:w-[7px] before:-translate-y-1/2 before:rounded-full before:border before:border-line before:bg-bone before:transition-[background-color,border-color,box-shadow] before:duration-300 max-xl:grid-cols-[24px] max-xl:[&_strong]:hidden",
							activeIndex === index &&
								"text-rebar before:border-rebar before:bg-rebar before:shadow-[0_0_0_4px_var(--color-bone)]",
						)}
						aria-current={activeIndex === index ? "location" : undefined}
					>
						<span>{String(index + 1).padStart(2, "0")}</span>
						<strong>
							{index === 0
								? "Web Copilot"
								: index === 1
									? "AI Workspace"
									: "Link Saver"}
						</strong>
					</a>
				))}
			</nav>

			<div>
				{featuredProjects.map((project, index) => (
					<article
						key={project.name}
						id={featuredProjectIds[index]}
						ref={(chapter) => {
							chapterRefs.current[index] = chapter;
						}}
						className="relative grid min-h-[100svh] scroll-mt-0 grid-cols-[minmax(230px,0.34fr)_minmax(0,1fr)] grid-rows-[auto_1fr_auto] gap-x-[clamp(36px,5vw,88px)] overflow-hidden border-b border-line px-pad-x pt-[clamp(94px,12vh,138px)] pr-[calc(var(--spacing-pad-x)+13vw)] pb-[30px] odd:bg-bone even:bg-paper [grid-template-areas:'heading_canvas'_'story_canvas'_'footer_footer'] max-xl:pr-[calc(var(--spacing-pad-x)+5vw)] max-lg:min-h-0 max-lg:grid-cols-1 max-lg:grid-rows-[auto_auto_auto_auto] max-lg:gap-[34px] max-lg:px-pad-x max-lg:pt-[92px] max-lg:pb-[30px] max-lg:[grid-template-areas:'heading'_'canvas'_'story'_'footer'] max-md:gap-[26px] max-md:px-5 max-md:pt-[76px] max-md:pb-6"
					>
						<div
							className="absolute top-[2%] -left-[0.05em] -z-10 font-serif text-[clamp(12rem,30vw,32rem)] leading-[0.72] tracking-[-0.08em] text-bone-deep opacity-[0.42] [writing-mode:vertical-rl]"
							aria-hidden="true"
						>
							{index === 0 ? "VAGUE" : index === 2 ? "WORKING" : "BUILD"}
						</div>

						<header
							className="min-w-0 [grid-area:heading] max-lg:grid max-lg:grid-cols-[1fr_auto] max-lg:items-start max-lg:gap-x-6 max-md:block"
							data-reveal="rise"
						>
							<p className="mb-[18px] font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted max-lg:col-start-1">
								<span className="mr-2 text-rebar">
									{String(index + 1).padStart(2, "0")} /
								</span>
								{project.type}
							</p>
							<h3 className="m-0 max-w-[8em] font-serif text-[clamp(3rem,5.8vw,6.6rem)] font-normal leading-[0.88] tracking-[-0.05em] max-lg:col-start-1 max-md:text-[clamp(2.8rem,14vw,4.6rem)]">
								{project.name}
							</h3>
							<div className="mt-[22px] max-lg:col-start-2 max-lg:row-span-2 max-lg:row-start-1 max-lg:mt-0 max-md:mt-5">
								<ProjectBadge project={project} />
							</div>
						</header>

						<div
							className="min-w-0 self-center [grid-area:canvas]"
							data-reveal="rise"
						>
							<ProjectCanvas project={project} active={activeIndex === index} />
						</div>

						<div
							className="max-w-[470px] self-end [grid-area:story] max-lg:max-w-[720px]"
							data-reveal="rise"
						>
							<p className="m-0 text-[0.94rem] leading-[1.68] text-ink-soft">
								{project.proof}
							</p>

							<div className="mt-[26px] grid gap-2 [&_a]:justify-between [&_a]:py-3">
								{project.href && (
									<a
										href={project.href}
										target="_blank"
										rel="noreferrer"
										className={cx(buttonBaseClass, buttonPrimaryClass)}
									>
										{project.linkLabel}
										<span aria-hidden="true">↗</span>
									</a>
								)}
								{index < featuredProjects.length - 1 && (
									<a
										href={`#${featuredProjectIds[index + 1]}`}
										className={cx(buttonBaseClass, buttonGhostClass)}
									>
										Next system
										<span aria-hidden="true">↓</span>
									</a>
								)}
							</div>

							<details className="group mt-[26px] border-t border-line">
								<summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted [&::-webkit-details-marker]:hidden">
									<span>Technical evidence</span>
									<span
										className="transition-transform duration-300 group-open:rotate-45"
										aria-hidden="true"
									>
										＋
									</span>
								</summary>
								<div className="grid gap-6 border-t border-line pt-5 pb-2">
									<ul className="m-0 grid list-none gap-[14px] p-0">
										{project.highlights.map((highlight, highlightIndex) => (
											<li
												key={highlight}
												className="grid grid-cols-[28px_1fr] gap-3"
											>
												<span className="pt-[0.2em] font-mono text-[0.52rem] text-rebar">
													{String(highlightIndex + 1).padStart(2, "0")}
												</span>
												<p className="m-0 text-[0.78rem] leading-[1.55] text-ink-soft">
													{highlight}
												</p>
											</li>
										))}
									</ul>
									<div>
										<span className="font-mono text-[0.54rem] uppercase tracking-[0.1em] text-muted">
											System stack
										</span>
										<ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
											{project.stack.map((item) => (
												<li key={item} className={chipClass}>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>
							</details>
						</div>

						<footer className="mt-7 flex justify-between gap-5 border-t border-line pt-[18px] font-mono text-[0.54rem] uppercase tracking-[0.08em] text-muted [grid-area:footer]">
							<span>Project {String(index + 1).padStart(2, "0")} of 03</span>
							<span>{project.cursor}</span>
						</footer>
					</article>
				))}
			</div>

			<div className={cx(sectionPadClass, "bg-paper max-md:px-5")}>
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
						Six more product systems, kept quiet until you want scope, stack,
						and delivery evidence.
					</p>
				</div>

				<div className="border-t border-line">
					{archiveProjects.map((project, index) => (
						<details key={project.name} className="group border-b border-line">
							<summary className="grid cursor-pointer list-none grid-cols-[46px_1fr_auto_28px] items-center gap-[clamp(14px,3vw,48px)] py-[26px] transition-[padding,background-color] duration-300 hover:bg-bone hover:px-[14px] max-md:grid-cols-[34px_1fr_24px] max-md:[&>div]:hidden [&::-webkit-details-marker]:hidden">
								<span className="font-mono text-[0.58rem] text-rebar">
									{String(index + featuredProjects.length + 1).padStart(2, "0")}
								</span>
								<span>
									<strong className="block font-serif text-[clamp(1.5rem,2.7vw,2.8rem)] font-normal leading-none tracking-[-0.025em]">
										{project.name}
									</strong>
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

							<div className="grid grid-cols-[0.78fr_1.22fr] gap-[clamp(34px,7vw,110px)] pt-2 pr-[7vw] pb-11 pl-20 max-md:grid-cols-1 max-md:gap-7 max-md:pt-0.5 max-md:pr-[14px] max-md:pb-[38px] max-md:pl-12">
								<div>
									<p className="m-0 text-[0.86rem] leading-[1.65] text-ink-soft">
										{project.proof}
									</p>
									<ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
										{project.stack.map((item) => (
											<li key={item} className={chipClass}>
												{item}
											</li>
										))}
									</ul>
								</div>
								<div>
									<ul className="m-0 grid list-none gap-3 p-0">
										{project.highlights.map((highlight) => (
											<li
												key={highlight}
												className="grid grid-cols-[10px_1fr] gap-3 text-[0.78rem] leading-[1.55] text-ink-soft"
											>
												<span
													className="mt-[0.62em] h-[3px] w-[3px] rounded-full bg-rebar"
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
											No public link / details available in the CV
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
