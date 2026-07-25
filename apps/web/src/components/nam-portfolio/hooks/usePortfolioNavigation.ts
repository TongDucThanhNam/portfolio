import { type RefObject, useEffect } from "react";

import { chapters } from "../data";

export function usePortfolioNavigation({
	progressRef,
	setActiveSection,
}: {
	progressRef: RefObject<HTMLDivElement>;
	setActiveSection: (section: string) => void;
}) {
	useEffect(() => {
		const sections = chapters
			.map((chapter) => document.getElementById(chapter.id))
			.filter((section): section is HTMLElement => section !== null);

		if (sections.length === 0) return;

		let frame = 0;
		let currentSection = "";

		const update = () => {
			frame = 0;

			const pageHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
			progressRef.current?.style.setProperty(
				"transform",
				`scaleX(${Math.min(1, Math.max(0, progress))})`,
			);

			const marker = window.innerHeight * 0.42;
			let nextSection = sections[0].id;

			for (const section of sections) {
				const bounds = section.getBoundingClientRect();
				if (bounds.top <= marker && bounds.bottom > marker) {
					nextSection = section.id;
					break;
				}

				if (bounds.top <= marker) nextSection = section.id;
			}

			if (nextSection !== currentSection) {
				currentSection = nextSection;
				setActiveSection(nextSection);
			}
		};

		const requestUpdate = () => {
			if (frame !== 0) return;
			frame = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);

		return () => {
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			if (frame !== 0) window.cancelAnimationFrame(frame);
		};
	}, [progressRef, setActiveSection]);
}
