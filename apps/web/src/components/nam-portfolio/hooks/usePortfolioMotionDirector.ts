import { type RefObject, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? useEffect : useLayoutEffect;

export function usePortfolioMotionDirector(rootRef: RefObject<HTMLElement>) {
	useIsomorphicLayoutEffect(() => {
		const root = rootRef.current;

		if (!root) {
			return;
		}

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const revealTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-reveal]"),
		);
		const tiltTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-tilt]"),
		);
		const signalHero = root.querySelector<HTMLElement>("[data-signal-hero]");
		const signalPaths = Array.from(
			root.querySelectorAll<SVGPathElement>("[data-signal-bend]"),
		);

		root.dataset.motion = reducedMotion ? "reduced" : "full";
		root.dataset.motionReady = "false";

		let revealObserver: IntersectionObserver | undefined;
		let entranceFrame = 0;
		let readyFrame = 0;

		if (reducedMotion) {
			root.dataset.motionReady = "true";
			for (const target of revealTargets) {
				target.dataset.revealState = "visible";
			}
		} else {
			for (const target of revealTargets) {
				target.dataset.revealState = "hidden";
			}

			revealObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (!entry.isIntersecting) {
							continue;
						}

						(entry.target as HTMLElement).dataset.revealState = "visible";
						revealObserver?.unobserve(entry.target);
					}
				},
				{
					rootMargin: "0px 0px -10% 0px",
					threshold: 0.08,
				},
			);

			for (const target of revealTargets) {
				revealObserver.observe(target);
			}

			entranceFrame = window.requestAnimationFrame(() => {
				readyFrame = window.requestAnimationFrame(() => {
					root.dataset.motionReady = "true";
				});
			});
		}

		const finePointer = window.matchMedia("(pointer: fine)").matches;
		const tiltCleanups: Array<() => void> = [];
		const signalCleanups: Array<() => void> = [];

		if (!reducedMotion && finePointer) {
			for (const target of tiltTargets) {
				let pointerFrame = 0;
				let pointerX = 0;
				let pointerY = 0;

				const paintTilt = () => {
					pointerFrame = 0;
					const rect = target.getBoundingClientRect();
					const normalizedX = (pointerX - rect.left) / rect.width - 0.5;
					const normalizedY = (pointerY - rect.top) / rect.height - 0.5;

					target.style.setProperty("--tilt-x", `${normalizedY * -3.4}deg`);
					target.style.setProperty("--tilt-y", `${normalizedX * 4.2}deg`);
					target.style.setProperty("--glow-x", `${(normalizedX + 0.5) * 100}%`);
					target.style.setProperty("--glow-y", `${(normalizedY + 0.5) * 100}%`);
				};

				const handlePointerMove = (event: PointerEvent) => {
					pointerX = event.clientX;
					pointerY = event.clientY;

					if (!pointerFrame) {
						pointerFrame = window.requestAnimationFrame(paintTilt);
					}
				};

				const resetTilt = () => {
					if (pointerFrame) {
						window.cancelAnimationFrame(pointerFrame);
						pointerFrame = 0;
					}

					target.style.setProperty("--tilt-x", "0deg");
					target.style.setProperty("--tilt-y", "0deg");
					target.style.setProperty("--glow-x", "50%");
					target.style.setProperty("--glow-y", "50%");
				};

				target.addEventListener("pointermove", handlePointerMove);
				target.addEventListener("pointerleave", resetTilt);
				tiltCleanups.push(() => {
					target.removeEventListener("pointermove", handlePointerMove);
					target.removeEventListener("pointerleave", resetTilt);
					resetTilt();
				});
			}

			if (signalHero && signalPaths.length > 0) {
				let signalFrame = 0;
				let pointerX = 0;
				let pointerY = 0;

				const paintSignal = () => {
					signalFrame = 0;
					const rect = signalHero.getBoundingClientRect();
					const normalizedX = Math.min(
						1,
						Math.max(0, (pointerX - rect.left) / rect.width),
					);
					const normalizedY = Math.min(
						1,
						Math.max(0, (pointerY - rect.top) / rect.height),
					);
					const bendX = (normalizedX - 0.5) * 54;
					const bendY = (normalizedY - 0.5) * 46;
					const route = `M88 580 C250 580 250 460 420 460 C565 460 ${540 + bendX} ${610 + bendY} 675 610 C790 610 ${760 + bendX} ${320 + bendY} 930 320 C1050 320 995 560 1120 560 C1240 560 1240 580 1365 580`;

					signalHero.style.setProperty("--signal-x", `${normalizedX * 100}%`);
					signalHero.style.setProperty("--signal-y", `${normalizedY * 100}%`);
					for (const path of signalPaths) path.setAttribute("d", route);
				};

				const handleSignalMove = (event: PointerEvent) => {
					pointerX = event.clientX;
					pointerY = event.clientY;
					if (!signalFrame) {
						signalFrame = window.requestAnimationFrame(paintSignal);
					}
				};

				const resetSignal = () => {
					if (signalFrame) window.cancelAnimationFrame(signalFrame);
					signalFrame = 0;
					signalHero.style.setProperty("--signal-x", "50%");
					signalHero.style.setProperty("--signal-y", "50%");
					const route =
						"M88 580 C250 580 250 460 420 460 C565 460 540 610 675 610 C790 610 760 320 930 320 C1050 320 995 560 1120 560 C1240 560 1240 580 1365 580";
					for (const path of signalPaths) path.setAttribute("d", route);
				};

				signalHero.addEventListener("pointermove", handleSignalMove);
				signalHero.addEventListener("pointerleave", resetSignal);
				signalCleanups.push(() => {
					signalHero.removeEventListener("pointermove", handleSignalMove);
					signalHero.removeEventListener("pointerleave", resetSignal);
					resetSignal();
				});
			}
		}

		let scrollFrame = 0;
		const paintScroll = () => {
			scrollFrame = 0;
			if (!signalHero) return;
			const rect = signalHero.getBoundingClientRect();
			const exitProgress = Math.min(
				1,
				Math.max(0, -rect.top / Math.max(1, window.innerHeight)),
			);
			root.style.setProperty("--hero-exit", exitProgress.toFixed(4));
		};
		const requestScrollPaint = () => {
			if (!scrollFrame) {
				scrollFrame = window.requestAnimationFrame(paintScroll);
			}
		};

		paintScroll();
		window.addEventListener("scroll", requestScrollPaint, { passive: true });
		window.addEventListener("resize", requestScrollPaint);

		return () => {
			revealObserver?.disconnect();
			window.cancelAnimationFrame(entranceFrame);
			window.cancelAnimationFrame(readyFrame);
			window.cancelAnimationFrame(scrollFrame);
			window.removeEventListener("scroll", requestScrollPaint);
			window.removeEventListener("resize", requestScrollPaint);
			for (const cleanup of tiltCleanups) {
				cleanup();
			}
			for (const cleanup of signalCleanups) {
				cleanup();
			}
			delete root.dataset.motion;
			delete root.dataset.motionReady;
		};
	}, [rootRef]);
}
