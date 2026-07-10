import { useRef, useState } from "react";

import { useCustomCursor, useLenisScroll, usePortfolioMotion } from "./hooks";
import { Footer, Header, IntroLoader, MobileMenu, SectionRail } from "./layout";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { Marquee } from "./sections/Marquee";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { WhySection } from "./sections/WhySection";

export default function NamPortfolio() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [activeSection, setActiveSection] = useState("hero");
	const [activeStory, setActiveStory] = useState(0);
	const cursor = useCustomCursor();
	const [menuOpen, setMenuOpen] = useState(false);
	useLenisScroll();
	usePortfolioMotion({
		rootRef,
		setActiveSection,
		setActiveStory,
	});

	return (
		<div ref={rootRef} className="portfolio-shell">
			<a className="skip-link" href="#portfolio-main">
				Skip to content
			</a>
			<div className="grain" aria-hidden="true" />
			<div ref={cursor.ringRef} className="cursor-ring" aria-hidden="true">
				<span className="cursor-ring-core" />
			</div>
			<div ref={cursor.dotRef} className="cursor-dot" aria-hidden="true" />
			<div ref={cursor.labelRef} className="cursor-label" aria-hidden="true" />

			<IntroLoader />

			<div
				data-scroll-progress
				className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-rebar"
			/>

			<Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
			<SectionRail activeSection={activeSection} />

			<main id="portfolio-main" tabIndex={-1}>
				<HeroSection />
				<WhySection activeStory={activeStory} />
				<Marquee />
				<AboutSection />
				<ExperienceSection />
				<SkillsSection />
				<ProjectsSection />
				<ContactSection />
			</main>

			<Footer />
		</div>
	);
}
