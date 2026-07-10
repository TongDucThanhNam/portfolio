import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced) return;

		const lenis = new Lenis({
			duration: 1.12,
			easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			smoothWheel: true,
		});

		const tick = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);
		lenis.on("scroll", ScrollTrigger.update);

		const handleAnchorClick = (event: MouseEvent) => {
			const target = event.target instanceof Element ? event.target : null;
			const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
			const href = anchor?.getAttribute("href");

			if (!anchor || !href || href === "#") return;

			const destination = document.querySelector<HTMLElement>(href);
			if (!destination) return;

			event.preventDefault();
			lenis.scrollTo(destination, { offset: 0 });
		};

		document.addEventListener("click", handleAnchorClick);

		return () => {
			document.removeEventListener("click", handleAnchorClick);
			lenis.off("scroll", ScrollTrigger.update);
			gsap.ticker.remove(tick);
			lenis.destroy();
		};
	}, []);
}
