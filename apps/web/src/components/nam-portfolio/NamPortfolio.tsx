import { useRef, useState } from "react";

import { usePortfolioMotionDirector, usePortfolioNavigation } from "./hooks";
import { ChapterNav, Footer } from "./layout";
import { AboutSection } from "./sections/AboutSection";
import { CapabilityRibbon } from "./sections/CapabilityRibbon";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { WhySection } from "./sections/WhySection";

export default function NamPortfolio() {
	const shellRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const [activeSection, setActiveSection] = useState("hero");
	usePortfolioNavigation({
		progressRef,
		setActiveSection,
	});
	usePortfolioMotionDirector(shellRef);

	return (
		<div
			ref={shellRef}
			className="relative min-h-screen overflow-x-clip bg-bone text-ink
				[&_:is(a,button,summary):focus-visible]:outline-2
				[&_:is(a,button,summary):focus-visible]:outline-offset-4
				[&_:is(a,button,summary):focus-visible]:outline-rebar
				[&_[data-reveal]]:transition-[clip-path,opacity,transform]
				[&_[data-reveal]]:duration-[900ms]
				[&_[data-reveal]]:ease-fluid
				[&_[data-reveal]]:[transition-delay:var(--reveal-delay,0ms)]
				[&_[data-reveal][data-reveal-state=hidden]]:translate-y-7
				[&_[data-reveal][data-reveal-state=hidden]]:opacity-0
				[&_[data-reveal=line][data-reveal-state=hidden]]:origin-left
				[&_[data-reveal=line][data-reveal-state=hidden]]:translate-y-4
				[&_[data-reveal=line][data-reveal-state=hidden]]:scale-x-[0.96]
				[&_[data-reveal=mask][data-reveal-state=hidden]]:translate-y-6
				[&_[data-reveal=mask][data-reveal-state=hidden]]:[clip-path:inset(0_0_18%_0)]
				[&_[data-reveal][data-reveal-state=visible]]:translate-y-0
				[&_[data-reveal][data-reveal-state=visible]]:scale-x-100
				[&_[data-reveal][data-reveal-state=visible]]:opacity-100
				[&_[data-reveal][data-reveal-state=visible]]:[clip-path:inset(0)]
				motion-reduce:[&_*]:!animate-none
				motion-reduce:[&_*]:!transition-none"
			data-motion="idle"
			data-motion-ready="false"
		>
			<a
				className="fixed left-pad-x top-3 z-[120] -translate-y-[160%] rounded-pill bg-ink px-[18px] py-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper transition-transform duration-250 ease-fluid focus:translate-y-0"
				href="#portfolio-main"
			>
				Skip to content
			</a>
			<div
				className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_1px_1px,var(--color-ink)_1px,transparent_0)] bg-[length:14px_14px] opacity-[0.018] mix-blend-multiply"
				aria-hidden="true"
			/>

			<div
				ref={progressRef}
				className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-rebar"
				aria-hidden="true"
			/>

			<ChapterNav activeSection={activeSection} />

			<main id="portfolio-main" tabIndex={-1}>
				<HeroSection />
				<CapabilityRibbon />
				<ProjectsSection />
				<WhySection />
				<AboutSection />
				<ExperienceSection />
				<SkillsSection />
				<ContactSection />
			</main>

			<Footer />
		</div>
	);
}
