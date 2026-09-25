import { projects } from "../data";
import type { Project } from "../types";
import { cx } from "../utils";
import { ProjectCanvas } from "./ProjectCanvas";

const featuredProjects = projects.filter((project) => project.featured);
const archiveProjects = projects.filter((project) => !project.featured);
const projectNotes = [
	{
		id: "project-web-copilot",
		category: "Browser extension",
		summary:
			"Your browser, connected to AI. Verified context, private by design.",
	},
	{
		id: "project-ai-workspace",
		category: "AI workspace",
		summary:
			"A place to think, research, and build with AI. From conversation to working output.",
	},
	{
		id: "project-link-saver",
		category: "Web app + extension",
		summary: "Save something worth keeping. Find it again when it matters.",
	},
];

function BuildDetails({ project }: { project: Project }) {
	return (
		<details className="group/build mt-5 border-t border-ink/15">
			<summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-rebar [&::-webkit-details-marker]:hidden">
				Inside the build
				<span
					className="text-lg transition-transform duration-300 group-open/build:rotate-45"
					aria-hidden="true"
				>
					+
				</span>
			</summary>
			<div className="pb-6 pt-2">
				<p className="max-w-[64ch] text-sm leading-7 text-ink-soft">
					{project.proof}
				</p>
				<ul className="mt-5 grid gap-3">
					{project.highlights.map((highlight) => (
						<li
							key={highlight}
							className="flex gap-3 text-[0.8rem] leading-6 text-ink-soft"
						>
							<span
								className="mt-2.5 h-1 w-1 shrink-0 bg-rebar"
								aria-hidden="true"
							/>
							{highlight}
						</li>
					))}
				</ul>
				<p className="mt-5 font-mono text-[0.6rem] leading-6 text-ink-soft">
					{project.stack.join(" / ")}
				</p>
			</div>
		</details>
	);
}

export function ProjectsSection() {
	return (
		<section
			id="projects"
			className="relative scroll-mt-12 bg-bone px-pad-x pb-[clamp(80px,10vw,150px)] pt-[clamp(64px,8vw,112px)]"
		>
			<header>
				<div
					className="flex items-center justify-between gap-4 border-t border-ink/30 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
					data-reveal="line"
				>
					<p className="shrink-0 whitespace-nowrap">
						<span className="mr-4 text-rebar">01 /</span>Selected work
					</p>
					<p className="hidden text-ink-soft sm:block">
						A selection of things I've built
					</p>
					<p className="text-ink-soft sm:hidden">03 projects</p>
				</div>
				<div className="grid items-end gap-8 pb-[clamp(40px,5vw,72px)] pt-[clamp(40px,5vw,72px)] lg:grid-cols-[1fr_300px]">
					<h2
						className="font-['Archivo_Variable'] text-[clamp(3.7rem,9.7vw,10rem)] font-medium leading-[0.88] tracking-[-0.075em]"
						data-reveal="mask"
					>
						Ideas made
						<br />
						<span className="font-serif font-normal italic text-rebar">
							real.
						</span>
						<sup className="ml-5 align-top font-mono text-[0.7rem] leading-[3] tracking-normal text-ink-soft">
							(03)
						</sup>
					</h2>
					<p
						className="max-w-[30ch] text-[0.92rem] leading-7 text-ink-soft lg:pb-2"
						data-reveal="rise"
					>
						AI products, browser tools, and useful software.
						<br />
						Built end to end. Ready to explore.
					</p>
				</div>
			</header>

			<div className="grid grid-cols-1 items-start gap-x-[clamp(32px,5vw,80px)] gap-y-[clamp(56px,7vw,110px)] md:grid-cols-12">
				{featuredProjects.map((project, index) => {
					const note = projectNotes[index];
					return (
						<article
							key={project.name}
							id={note.id}
							className={cx(
								"group/project min-w-0 scroll-mt-20",
								index === 0
									? "md:col-span-12"
									: index === 1
										? "md:col-span-7"
										: "md:col-span-5 md:pt-[clamp(90px,12vw,190px)]",
							)}
						>
							<a
								href={project.href}
								target="_blank"
								rel="noreferrer"
								aria-label={`Explore ${project.name}`}
								className={cx(
									"relative block overflow-hidden",
									index === 0 && "[&_[data-image-frame]]:aspect-[16/9]",
								)}
							>
								<ProjectCanvas project={project} />
								<span
									className="absolute left-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.13em] text-ink/70 md:left-7 md:top-7"
									aria-hidden="true"
								>
									{String(index + 1).padStart(2, "0")} / {note.category}
								</span>
								<span
									className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-paper text-xl text-ink transition-[background-color,color,transform] duration-500 ease-fluid group-hover/project:-rotate-45 group-hover/project:bg-ink group-hover/project:text-paper md:bottom-7 md:right-7 md:h-16 md:w-16 md:text-2xl"
									aria-hidden="true"
								>
									↗
								</span>
							</a>
							<div
								className={cx(
									"pt-5 md:pt-7",
									index === 0 && "lg:grid lg:grid-cols-[1fr_0.7fr] lg:gap-x-16",
								)}
							>
								<div>
									<p className="mb-3 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-ink-soft">
										{project.status}
									</p>
									<h3 className="font-['Archivo_Variable'] text-[clamp(1.8rem,3.15vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.05em]">
										<a
											href={project.href}
											target="_blank"
											rel="noreferrer"
											className="transition-colors hover:text-rebar"
										>
											{project.name}
										</a>
									</h3>
								</div>
								<div>
									<p className="mt-4 max-w-[43ch] text-[0.88rem] leading-7 text-ink-soft lg:mt-0">
										{note.summary}
									</p>
									<BuildDetails project={project} />
								</div>
							</div>
						</article>
					);
				})}
			</div>

			<div
				id="project-archive"
				className="mt-[clamp(80px,11vw,170px)] scroll-mt-20"
			>
				<header
					className="mb-8 flex items-end justify-between gap-5"
					data-reveal="line"
				>
					<h3 className="font-serif text-[clamp(2.2rem,4vw,4rem)] leading-none tracking-[-0.04em]">
						Also on the desk<span className="text-rebar">.</span>
					</h3>
					<p className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-soft">
						06 more projects
					</p>
				</header>
				<div className="border-t border-ink/30">
					{archiveProjects.map((project, index) => (
						<details
							key={project.name}
							id={`archive-${project.visual}`}
							className="group/archive scroll-mt-20 border-b border-ink/20"
						>
							<summary className="grid min-h-[92px] cursor-pointer list-none grid-cols-[24px_1fr_24px] items-center gap-4 py-5 transition-colors hover:text-rebar md:grid-cols-[44px_1fr_210px_24px] md:gap-6 [&::-webkit-details-marker]:hidden">
								<span className="font-mono text-[0.58rem] text-rebar">
									{String(index + 4).padStart(2, "0")}
								</span>
								<span className="font-['Archivo_Variable'] text-[clamp(1.25rem,2vw,2.1rem)] font-normal leading-tight tracking-[-0.035em] transition-transform duration-500 ease-fluid group-hover/archive:translate-x-2">
									{project.name}
								</span>
								<span className="hidden font-mono text-[0.55rem] uppercase leading-5 tracking-[0.07em] text-ink-soft md:block">
									{project.status}
								</span>
								<span
									className="text-xl transition-transform duration-300 group-open/archive:rotate-45"
									aria-hidden="true"
								>
									+
								</span>
							</summary>
							<div className="grid gap-8 pb-9 pl-10 md:grid-cols-2 md:gap-16 md:pl-[68px]">
								<div>
									<p className="mb-4 font-mono text-[0.57rem] uppercase tracking-[0.08em] text-rebar">
										{project.type}
									</p>
									<p className="max-w-[54ch] text-sm leading-7 text-ink-soft">
										{project.proof}
									</p>
									<p className="mt-4 font-mono text-[0.6rem] leading-6 text-ink-soft">
										{project.stack.join(" / ")}
									</p>
								</div>
								<div>
									<ul className="grid gap-3 text-[0.8rem] leading-6 text-ink-soft">
										{project.highlights.map((point) => (
											<li key={point}>{point}</li>
										))}
									</ul>
									{project.href ? (
										<a
											href={project.href}
											target="_blank"
											rel="noreferrer"
											className="mt-5 inline-flex min-h-11 items-center gap-5 border-b border-rebar font-mono text-[0.62rem] uppercase tracking-[0.08em] transition-colors hover:text-rebar"
										>
											{project.linkLabel}
											<span aria-hidden="true">↗</span>
										</a>
									) : (
										<p className="mt-5 font-mono text-[0.6rem] text-ink-soft">
											{project.status}
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
