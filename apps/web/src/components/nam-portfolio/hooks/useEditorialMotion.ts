import { type RefObject, useEffect } from "react";

/** Vault: scroll-driven-parallax-image-masks + animated-footer.
 * Separate image/mask transforms and a center-out closing reveal, adapted to
 * native scrolling. The hero keeps its existing motion director.
 */
export function useEditorialMotion(rootRef: RefObject<HTMLElement>) {
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;
		let disposed = false;
		let revert: (() => void) | undefined;

		void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
			([{ gsap }, { ScrollTrigger }]) => {
				if (disposed) return;
				gsap.registerPlugin(ScrollTrigger);
				const media = gsap.matchMedia();
				media.add("(prefers-reduced-motion: no-preference)", () => {
					const context = gsap.context(() => {
						for (const frame of root.querySelectorAll<HTMLElement>(
							"[data-image-frame]",
						)) {
							const layer = frame.querySelector("[data-image-layer]");
							if (!layer) continue;
							gsap
								.timeline({
									scrollTrigger: {
										trigger: frame,
										start: "top 92%",
										end: "top 25%",
										scrub: 0.6,
									},
								})
								.fromTo(
									frame,
									{ clipPath: "inset(7% 3% 7% 3%)" },
									{ clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
									0,
								)
								.fromTo(
									layer,
									{ scale: 1.12, yPercent: 3 },
									{ scale: 1, yPercent: 0, ease: "none" },
									0,
								);
						}

						const closing = root.querySelector("[data-closing-title]");
						if (closing) {
							gsap.from(closing.querySelectorAll("[data-closing-letter]"), {
								yPercent: 110,
								rotate: 4,
								duration: 1.15,
								ease: "power3.out",
								stagger: { each: 0.045, from: "center" },
								scrollTrigger: {
									trigger: closing,
									start: "top 88%",
									toggleActions: "play none none reverse",
								},
							});
						}
					}, root);
					return () => context.revert();
				});
				let resizeFrame = 0;
				const resizeObserver = new ResizeObserver(() => {
					cancelAnimationFrame(resizeFrame);
					resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
				});
				resizeObserver.observe(root);
				revert = () => {
					resizeObserver.disconnect();
					cancelAnimationFrame(resizeFrame);
					media.revert();
				};
			},
			() => {
				/* Content remains visible if the optional motion chunk fails. */
			},
		);
		return () => {
			disposed = true;
			revert?.();
		};
	}, [rootRef]);
}
