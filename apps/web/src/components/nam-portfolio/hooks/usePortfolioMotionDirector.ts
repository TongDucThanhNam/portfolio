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
		const magneticTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-magnetic]"),
		);
		const scrollEchoTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-scroll-echo]"),
		);
		const wordRevealTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-word-reveal]"),
		);
		const spotlightTargets = Array.from(
			root.querySelectorAll<HTMLElement>("[data-spotlight-grid]"),
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
		const magneticCleanups: Array<() => void> = [];
		const spotlightCleanups: Array<() => void> = [];
		const signalCleanups: Array<() => void> = [];
		const scrollCleanups: Array<() => void> = [];

		if (!reducedMotion && wordRevealTargets.length > 0) {
			let wordFrame = 0;

			const paintWords = () => {
				wordFrame = 0;
				const viewportHeight = window.innerHeight;

				for (const target of wordRevealTargets) {
					const bounds = target.getBoundingClientRect();
					const travel = Math.max(viewportHeight * 0.5, bounds.height * 0.8);
					const progress = Math.min(
						1,
						Math.max(0, (viewportHeight * 0.82 - bounds.top) / travel),
					);
					const words = Array.from(
						target.querySelectorAll<HTMLElement>("[data-word]"),
					);
					const denominator = Math.max(1, words.length - 1);

					for (const [index, word] of words.entries()) {
						const stagger = (index / denominator) * 0.38;
						const localProgress = Math.min(
							1,
							Math.max(0, (progress - stagger) / 0.62),
						);
						const eased = 1 - (1 - localProgress) ** 3;
						word.style.opacity = (0.14 + eased * 0.86).toFixed(3);
						word.style.transform = `translate3d(0, ${(1 - eased) * 18}px, 0)`;
					}
				}
			};

			const requestWordPaint = () => {
				if (!wordFrame) {
					wordFrame = window.requestAnimationFrame(paintWords);
				}
			};

			paintWords();
			window.addEventListener("scroll", requestWordPaint, { passive: true });
			window.addEventListener("resize", requestWordPaint);
			scrollCleanups.push(() => {
				window.removeEventListener("scroll", requestWordPaint);
				window.removeEventListener("resize", requestWordPaint);
				if (wordFrame) window.cancelAnimationFrame(wordFrame);
				for (const target of wordRevealTargets) {
					for (const word of target.querySelectorAll<HTMLElement>(
						"[data-word]",
					)) {
						word.style.removeProperty("opacity");
						word.style.removeProperty("transform");
					}
				}
			});
		}

		if (!reducedMotion && scrollEchoTargets.length > 0) {
			let echoFrame = 0;

			const paintEchoes = () => {
				echoFrame = 0;
				const viewportHeight = window.innerHeight;

				for (const target of scrollEchoTargets) {
					const bounds = target.getBoundingClientRect();
					const progress = Math.min(
						1,
						Math.max(
							0,
							(viewportHeight - bounds.top) / (viewportHeight + bounds.height),
						),
					);
					const near = progress * 46;
					const far = near * 2;
					target.style.setProperty("--echo-n2", `${-far}px`);
					target.style.setProperty("--echo-n1", `${-near}px`);
					target.style.setProperty("--echo-p1", `${near}px`);
					target.style.setProperty("--echo-p2", `${far}px`);
				}
			};

			const requestEchoPaint = () => {
				if (!echoFrame) {
					echoFrame = window.requestAnimationFrame(paintEchoes);
				}
			};

			paintEchoes();
			window.addEventListener("scroll", requestEchoPaint, { passive: true });
			window.addEventListener("resize", requestEchoPaint);
			scrollCleanups.push(() => {
				window.removeEventListener("scroll", requestEchoPaint);
				window.removeEventListener("resize", requestEchoPaint);
				if (echoFrame) window.cancelAnimationFrame(echoFrame);
				for (const target of scrollEchoTargets) {
					target.style.removeProperty("--echo-n2");
					target.style.removeProperty("--echo-n1");
					target.style.removeProperty("--echo-p1");
					target.style.removeProperty("--echo-p2");
				}
			});
		}

		if (!reducedMotion && finePointer) {
			for (const target of spotlightTargets) {
				let spotlightFrame = 0;
				let pointerX = 0;
				let pointerY = 0;

				const paintSpotlight = () => {
					spotlightFrame = 0;
					const rect = target.getBoundingClientRect();
					target.style.setProperty(
						"--spotlight-x",
						`${pointerX - rect.left}px`,
					);
					target.style.setProperty("--spotlight-y", `${pointerY - rect.top}px`);
				};

				const handleSpotlightMove = (event: PointerEvent) => {
					pointerX = event.clientX;
					pointerY = event.clientY;
					if (!spotlightFrame) {
						spotlightFrame = window.requestAnimationFrame(paintSpotlight);
					}
				};

				const resetSpotlight = () => {
					target.style.setProperty("--spotlight-x", "50%");
					target.style.setProperty("--spotlight-y", "50%");
				};

				target.addEventListener("pointermove", handleSpotlightMove);
				target.addEventListener("pointerleave", resetSpotlight);
				spotlightCleanups.push(() => {
					target.removeEventListener("pointermove", handleSpotlightMove);
					target.removeEventListener("pointerleave", resetSpotlight);
					if (spotlightFrame) window.cancelAnimationFrame(spotlightFrame);
					target.style.removeProperty("--spotlight-x");
					target.style.removeProperty("--spotlight-y");
				});
			}

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

			for (const target of magneticTargets) {
				let magneticFrame = 0;
				let currentX = 0;
				let currentY = 0;
				let targetX = 0;
				let targetY = 0;

				const paintMagnetic = () => {
					currentX += (targetX - currentX) * 0.18;
					currentY += (targetY - currentY) * 0.18;
					target.style.setProperty("--magnetic-x", `${currentX.toFixed(2)}px`);
					target.style.setProperty("--magnetic-y", `${currentY.toFixed(2)}px`);

					if (
						Math.abs(targetX - currentX) < 0.02 &&
						Math.abs(targetY - currentY) < 0.02
					) {
						currentX = targetX;
						currentY = targetY;
						target.style.setProperty("--magnetic-x", `${currentX}px`);
						target.style.setProperty("--magnetic-y", `${currentY}px`);
						magneticFrame = 0;
						return;
					}

					magneticFrame = window.requestAnimationFrame(paintMagnetic);
				};

				const requestMagneticPaint = () => {
					if (!magneticFrame) {
						magneticFrame = window.requestAnimationFrame(paintMagnetic);
					}
				};

				const handleMagneticMove = (event: PointerEvent) => {
					const rect = target.getBoundingClientRect();
					const offsetX = event.clientX - (rect.left + rect.width / 2);
					const offsetY = event.clientY - (rect.top + rect.height / 2);
					targetX = Math.max(-9, Math.min(9, offsetX * 0.16));
					targetY = Math.max(-7, Math.min(7, offsetY * 0.18));
					requestMagneticPaint();
				};

				const resetMagnetic = () => {
					targetX = 0;
					targetY = 0;
					requestMagneticPaint();
				};

				target.addEventListener("pointermove", handleMagneticMove);
				target.addEventListener("pointerleave", resetMagnetic);
				target.addEventListener("blur", resetMagnetic);
				magneticCleanups.push(() => {
					target.removeEventListener("pointermove", handleMagneticMove);
					target.removeEventListener("pointerleave", resetMagnetic);
					target.removeEventListener("blur", resetMagnetic);
					if (magneticFrame) window.cancelAnimationFrame(magneticFrame);
					target.style.removeProperty("--magnetic-x");
					target.style.removeProperty("--magnetic-y");
				});
			}

			if (signalHero) {
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

		return () => {
			revealObserver?.disconnect();
			window.cancelAnimationFrame(entranceFrame);
			window.cancelAnimationFrame(readyFrame);
			for (const cleanup of tiltCleanups) {
				cleanup();
			}
			for (const cleanup of magneticCleanups) {
				cleanup();
			}
			for (const cleanup of spotlightCleanups) {
				cleanup();
			}
			for (const cleanup of signalCleanups) {
				cleanup();
			}
			for (const cleanup of scrollCleanups) {
				cleanup();
			}
			delete root.dataset.motion;
			delete root.dataset.motionReady;
		};
	}, [rootRef]);
}
