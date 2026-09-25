import { SectionHead } from "../common";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceSection() {
	return (
		<section
			id="experience"
			className="relative scroll-mt-20 bg-paper px-pad-x pb-[clamp(72px,9vw,136px)] pt-8"
		>
			<SectionHead
				num="04"
				title="Experience & education"
				detail="The path so far"
			/>
			<div
				className="mb-10 flex flex-wrap items-end justify-between gap-6"
				data-reveal="rise"
			>
				<h2 className="font-serif text-[clamp(2.7rem,5vw,5.5rem)] font-normal leading-none tracking-[-0.045em]">
					Learning. Building. <em className="text-rebar">Growing.</em>
				</h2>
				<a
					href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
					target="_blank"
					rel="noreferrer"
					className="inline-flex min-h-11 items-center gap-6 border-b border-ink font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors hover:text-rebar"
				>
					Full résumé <span aria-hidden="true">↗</span>
				</a>
			</div>
			<div className="border-t border-ink/30">
				<ExperienceItem
					index="01"
					period="05/2024 — 07/2024"
					location="Ho Chi Minh City"
					jobTitle="Backend Developer"
					org="Amazing Technology Solutions Co., Ltd."
					points={[
						"Contributed to an enterprise interview-workflow management project, delivering backend features and APIs within a focused project timeline.",
					]}
					stack={["Node.js", "Express.js", "REST APIs"]}
				/>
				<ExperienceItem
					index="02"
					period="09/2020 — 04/2025"
					location="Ho Chi Minh City"
					jobTitle="Software Engineering"
					note="Education"
					org="Ton Duc Thang University"
					points={[
						"Completed Software Engineering studies while building independent projects across web, AI, browser extensions, automation, and Android.",
					]}
					stack={["Software Engineering", "Aptis B2"]}
				/>
			</div>
		</section>
	);
}
