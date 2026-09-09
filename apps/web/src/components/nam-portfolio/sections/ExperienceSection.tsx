import { SectionHead } from "../common";
import { sectionPadClass } from "../styles";
import { cx } from "../utils";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceSection() {
	return (
		<section
			id="experience"
			className={cx(sectionPadClass, "relative overflow-clip bg-bone")}
		>
			<span
				className="pointer-events-none absolute -right-[0.04em] top-[0.06em] font-serif text-[clamp(15rem,36vw,39rem)] leading-none tracking-[-0.1em] text-bone-deep"
				aria-hidden="true"
			>
				04
			</span>
			<SectionHead
				num="04"
				title="Experience"
				detail="Professional + education"
			/>
			<div className="relative z-10 grid items-start gap-[clamp(52px,8vw,132px)] lg:grid-cols-[minmax(230px,0.38fr)_minmax(0,1fr)]">
				<div className="lg:sticky lg:top-28" data-reveal="mask">
					<p className="max-w-[8em] font-serif text-[clamp(3.4rem,7vw,7.8rem)] leading-[0.88] tracking-[-0.055em]">
						The work <span className="text-rebar">compounds.</span>
					</p>
					<p className="mt-8 max-w-[30em] text-[0.9rem] leading-7 text-ink-soft">
						A short chronology of product delivery, backend systems, and the
						engineering foundation that keeps both accountable.
					</p>
					<div className="mt-10 grid grid-cols-2 border-y border-line font-mono text-[0.56rem] uppercase tracking-[0.12em]">
						<div className="border-r border-line py-4">
							<span className="block text-rebar">Range</span>
							<strong className="mt-2 block font-normal text-ink-soft">
								2020 — 2025
							</strong>
						</div>
						<div className="py-4 pl-5">
							<span className="block text-rebar">Records</span>
							<strong className="mt-2 block font-normal text-ink-soft">
								02 selected
							</strong>
						</div>
					</div>
				</div>

				<div className="border-b border-line shadow-[0_28px_90px_rgba(22,20,15,0.08)]">
					<ExperienceItem
						index="01"
						period="05/2024 - 07/2024"
						location="Ho Chi Minh City"
						jobTitle="Backend Developer"
						org="Amazing Technology Solutions Co., Ltd."
						points={[
							"Contributed to backend development for an enterprise interview-workflow management project.",
							"Worked on Node.js / Express.js backend tasks and API-related delivery within a short project timeline.",
						]}
						stack={["Node.js", "Express.js"]}
					/>
					<ExperienceItem
						index="02"
						period="09/2020 - 04/2025"
						location="Ho Chi Minh City"
						jobTitle="Software Engineering"
						note="Education"
						org="Ton Duc Thang University"
						points={[
							"Completed Software Engineering studies while building web, AI, browser-extension, automation, and Android product projects.",
							"English proficiency: Aptis B2.",
						]}
						stack={["Software Engineering", "TDTU", "Aptis B2"]}
					/>
				</div>
			</div>
		</section>
	);
}
