import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

import { chapters, storyBeats } from "../data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SplitInstance = {
	words: Element[];
	revert: () => void;
};

export function usePortfolioMotion({
	rootRef,
	setActiveSection,
	setActiveStory,
}: {
	rootRef: RefObject<HTMLDivElement>;
	setActiveSection: (value: string) => void;
	setActiveStory: (value: number) => void;
}) {
	useGSAP(
		() => {
			const root = rootRef.current;
			if (!root) return;
			root.classList.add("motion-enabled");

			const scrollProgressElement = root.querySelector<HTMLElement>(
				"[data-scroll-progress]",
			);
			const storyProgressElement =
				root.querySelector<HTMLElement>(".story-progress");
			const header = root.querySelector<HTMLElement>(".site-header");
			const preloader = root.querySelector<HTMLElement>(".preloader");
			const progressSetter = scrollProgressElement
				? (gsap.quickSetter(scrollProgressElement, "scaleX") as (
						value: number,
					) => void)
				: null;
			const storyProgressSetter = storyProgressElement
				? (gsap.quickSetter(storyProgressElement, "scaleX") as (
						value: number,
					) => void)
				: null;

			progressSetter?.(0);
			storyProgressSetter?.(0);

			ScrollTrigger.create({
				start: 0,
				end: "max",
				onUpdate: (self) => progressSetter?.(self.progress),
			});

			for (const chapter of chapters) {
				ScrollTrigger.create({
					trigger: `#${chapter.id}`,
					start: "top 42%",
					end: "bottom 42%",
					onToggle: (self) => {
						if (!self.isActive) return;
						setActiveSection(chapter.id);
						header?.classList.toggle("is-on-dark", chapter.id === "contact");
					},
				});
			}

			let refreshTimer: number | undefined;
			const refresh = () => {
				if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
				refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
			};
			window.addEventListener("resize", refresh, { passive: true });
			void document.fonts.ready.then(() => ScrollTrigger.refresh());

			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: reduce)", () => {
				gsap.set(preloader, { display: "none" });
				gsap.set(
					[
						".hero-title-line",
						".hero-intro",
						".hero-meta",
						".hero-workstation",
						".site-header",
						".reveal",
						"[data-motion-title]",
						".experience-item",
						".skill-card",
						".project-row",
					],
					{
						autoAlpha: 1,
						clearProps: "transform,clipPath",
					},
				);
				gsap.set(".skill-fill", {
					scaleX: (_index, element) =>
						Number.parseFloat(
							window
								.getComputedStyle(
									(element as HTMLElement).parentElement ?? element,
								)
								.getPropertyValue("--lvl"),
						) || 1,
				});
				setActiveStory(0);
			});

			media.add("(prefers-reduced-motion: no-preference)", () => {
				const bodyOverflow = document.body.style.overflow;
				const htmlOverflow = document.documentElement.style.overflow;
				let introLocked = true;
				document.body.style.overflow = "hidden";
				document.documentElement.style.overflow = "hidden";

				const unlockIntro = () => {
					if (!introLocked) return;
					introLocked = false;
					document.body.style.overflow = bodyOverflow;
					document.documentElement.style.overflow = htmlOverflow;
				};

				const prompt = root.querySelector<HTMLElement>(".preloader-prompt");
				const result = root.querySelector<HTMLElement>(
					".preloader-result-inner",
				);
				const scanFill = root.querySelector<HTMLElement>(
					".preloader-scan-fill",
				);
				const preloaderContent =
					root.querySelector<HTMLElement>(".preloader-content");
				const shutters = gsap.utils.toArray<HTMLElement>(
					".preloader-shutter",
					root,
				);
				const heroLines = gsap.utils.toArray<HTMLElement>(
					".hero-title-line",
					root,
				);
				const heroIntro = gsap.utils.toArray<HTMLElement>(".hero-intro", root);
				const heroMeta = gsap.utils.toArray<HTMLElement>(".hero-meta", root);
				const workstation =
					root.querySelector<HTMLElement>(".hero-workstation");

				gsap.set(prompt, { yPercent: 112 });
				gsap.set(result, { yPercent: 118 });
				gsap.set(scanFill, { scaleX: 0, transformOrigin: "left" });
				gsap.set(heroLines, { yPercent: 112 });
				gsap.set(heroIntro, { autoAlpha: 0, y: 28 });
				gsap.set(heroMeta, { autoAlpha: 0, y: 12 });
				gsap.set(header, { autoAlpha: 0, yPercent: -55 });
				gsap.set(workstation, {
					autoAlpha: 0,
					y: 38,
					rotation: 1.5,
				});

				const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
				intro
					.to(prompt, { yPercent: 0, duration: 0.65 })
					.to(scanFill, { scaleX: 1, duration: 0.68 }, 0.2)
					.to(result, { yPercent: 0, duration: 0.7 }, 0.48)
					.to(
						preloaderContent,
						{ autoAlpha: 0, yPercent: -12, duration: 0.38, ease: "power3.in" },
						1.23,
					)
					.to(
						shutters,
						{
							yPercent: -102,
							duration: 0.8,
							stagger: { each: 0.06, from: "end" },
							ease: "expo.inOut",
						},
						1.35,
					)
					.to(header, { autoAlpha: 1, yPercent: 0, duration: 0.72 }, 1.58)
					.to(heroLines, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 1.58)
					.to(
						heroIntro,
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.82,
							stagger: 0.09,
							ease: "power3.out",
						},
						1.78,
					)
					.to(
						workstation,
						{
							autoAlpha: 1,
							y: 0,
							rotation: 0,
							duration: 1.05,
						},
						1.82,
					)
					.to(
						heroMeta,
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.65,
							stagger: 0.05,
							ease: "power3.out",
						},
						1.95,
					)
					.set(preloader, { display: "none" }, 2.16)
					.call(unlockIntro, [], 2.16);

				const reveals = gsap.utils
					.toArray<HTMLElement>(".reveal", root)
					.filter((element) => !element.closest("#hero"));
				for (const element of reveals) {
					gsap.fromTo(
						element,
						{ autoAlpha: 0, y: 30 },
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.9,
							ease: "power3.out",
							clearProps: "transform",
							scrollTrigger: {
								trigger: element,
								start: "top 84%",
								once: true,
							},
						},
					);
				}

				for (const sectionHead of gsap.utils.toArray<HTMLElement>(
					".section-head",
					root,
				)) {
					gsap.from(sectionHead.children, {
						autoAlpha: 0,
						x: (index) => (index === 0 ? -24 : 24),
						duration: 0.72,
						stagger: 0.08,
						ease: "power3.out",
						scrollTrigger: {
							trigger: sectionHead,
							start: "top 88%",
							once: true,
						},
					});
				}

				for (const title of gsap.utils.toArray<HTMLElement>(
					"[data-motion-title]",
					root,
				)) {
					gsap.fromTo(
						title,
						{ autoAlpha: 0, y: 42, clipPath: "inset(0 0 100% 0)" },
						{
							autoAlpha: 1,
							y: 0,
							clipPath: "inset(0 0 0% 0)",
							duration: 1.15,
							ease: "expo.out",
							scrollTrigger: {
								trigger: title,
								start: "top 84%",
								once: true,
							},
						},
					);
				}

				const experienceItems = gsap.utils.toArray<HTMLElement>(
					".experience-item",
					root,
				);
				gsap.fromTo(
					experienceItems,
					{ autoAlpha: 0, x: 36 },
					{
						autoAlpha: 1,
						x: 0,
						duration: 0.9,
						stagger: 0.12,
						ease: "power3.out",
						clearProps: "transform",
						scrollTrigger: {
							trigger: "#experience",
							start: "top 72%",
							once: true,
						},
					},
				);

				const skillCards = gsap.utils.toArray<HTMLElement>(".skill-card", root);
				gsap.fromTo(
					skillCards,
					{
						autoAlpha: 0,
						y: (index) => (index % 2 === 0 ? 42 : -34),
						rotation: (index) => (index % 2 === 0 ? 1.4 : -1.4),
					},
					{
						autoAlpha: 1,
						y: 0,
						rotation: 0,
						duration: 0.95,
						stagger: { amount: 0.42, from: "center" },
						ease: "expo.out",
						clearProps: "transform",
						scrollTrigger: {
							trigger: "#skills",
							start: "top 58%",
							once: true,
						},
					},
				);

				for (const fill of gsap.utils.toArray<HTMLElement>(
					".skill-fill",
					root,
				)) {
					const level =
						Number.parseFloat(
							window
								.getComputedStyle(fill.parentElement ?? fill)
								.getPropertyValue("--lvl"),
						) || 1;
					gsap.fromTo(
						fill,
						{ scaleX: 0 },
						{
							scaleX: level,
							duration: 1.15,
							ease: "expo.out",
							scrollTrigger: {
								trigger: fill,
								start: "top 88%",
								once: true,
							},
						},
					);
				}

				const projectRows = gsap.utils.toArray<HTMLElement>(
					".project-row",
					root,
				);
				gsap.fromTo(
					projectRows,
					{ autoAlpha: 0, y: 34 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.85,
						stagger: 0.09,
						ease: "power3.out",
						clearProps: "transform",
						scrollTrigger: {
							trigger: "#projects",
							start: "top 70%",
							once: true,
						},
					},
				);

				for (const valueElement of gsap.utils.toArray<HTMLElement>(
					"[data-kpi-value]",
					root,
				)) {
					const finalValue = Number(valueElement.dataset.kpiValue ?? "0");
					const counter = { value: 0 };
					valueElement.textContent = "0";
					gsap.to(counter, {
						value: finalValue,
						duration: 1.35,
						ease: "power2.out",
						snap: { value: 1 },
						onUpdate: () => {
							valueElement.textContent = String(counter.value);
						},
						onComplete: () => {
							valueElement.textContent = String(finalValue);
						},
						scrollTrigger: {
							trigger: valueElement,
							start: "top 88%",
							once: true,
						},
					});
				}

				gsap.to(".hero-disc", {
					y: -36,
					x: -18,
					scrollTrigger: {
						trigger: "#hero",
						start: "top top",
						end: "bottom top",
						scrub: 0.8,
					},
				});

				gsap.to(".hero-ghost", {
					y: 58,
					x: 18,
					scrollTrigger: {
						trigger: "#hero",
						start: "top top",
						end: "bottom top",
						scrub: 1,
					},
				});

				gsap.to(".contact-ghost", {
					x: 42,
					y: -28,
					scrollTrigger: {
						trigger: "#contact",
						start: "top bottom",
						end: "bottom bottom",
						scrub: 1,
					},
				});

				gsap.to(".contact-glow", {
					x: -32,
					y: 44,
					scrollTrigger: {
						trigger: "#contact",
						start: "top bottom",
						end: "bottom bottom",
						scrub: 1.2,
					},
				});

				if (header) {
					let headerHidden = false;
					ScrollTrigger.create({
						start: 140,
						end: "max",
						onUpdate: (self) => {
							const shouldHide = self.direction === 1 && self.scroll() > 160;
							if (shouldHide === headerHidden) return;
							headerHidden = shouldHide;
							gsap.to(header, {
								yPercent: shouldHide ? -120 : 0,
								duration: 0.48,
								ease: "power3.out",
								overwrite: "auto",
							});
						},
					});
				}

				let activeStoryIndex = -1;
				ScrollTrigger.create({
					trigger: "#why",
					start: "top top",
					end: "bottom bottom",
					scrub: true,
					onUpdate: (self) => {
						storyProgressSetter?.(self.progress);
						const nextStory = Math.min(
							storyBeats.length - 1,
							Math.floor(self.progress * storyBeats.length),
						);
						if (nextStory === activeStoryIndex) return;
						activeStoryIndex = nextStory;
						setActiveStory(nextStory);
					},
				});

				let splitCancelled = false;
				let splitInstance: SplitInstance | null = null;
				let splitTween: gsap.core.Tween | null = null;
				const aboutStatement = root.querySelector<HTMLElement>(
					"[data-about-statement]",
				);

				if (aboutStatement) {
					void document.fonts.ready.then(async () => {
						const { SplitText } = await import("gsap/SplitText");
						if (splitCancelled || !aboutStatement.isConnected) return;
						gsap.registerPlugin(SplitText);
						splitInstance = SplitText.create(aboutStatement, {
							type: "words",
							wordsClass: "about-word",
							aria: "auto",
							deepSlice: true,
						});
						splitTween = gsap.fromTo(
							splitInstance.words,
							{ autoAlpha: 0.14, yPercent: 28, rotation: 2.2 },
							{
								autoAlpha: 1,
								yPercent: 0,
								rotation: 0,
								stagger: 0.035,
								ease: "none",
								scrollTrigger: {
									trigger: aboutStatement,
									start: "top 84%",
									end: "bottom 52%",
									scrub: 0.85,
								},
							},
						);
						ScrollTrigger.refresh();
					});
				}

				return () => {
					splitCancelled = true;
					splitTween?.kill();
					splitInstance?.revert();
					unlockIntro();
				};
			});

			media.add(
				"(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
				() => {
					const cleanup: Array<() => void> = [];
					const hero = root.querySelector<HTMLElement>("#hero");
					const workstation =
						root.querySelector<HTMLElement>(".hero-workstation");

					if (hero && workstation) {
						const moveX = gsap.quickTo(workstation, "x", {
							duration: 0.9,
							ease: "power3.out",
						});
						const rotate = gsap.quickTo(workstation, "rotation", {
							duration: 1,
							ease: "power3.out",
						});
						const onHeroMove = (event: PointerEvent) => {
							const bounds = hero.getBoundingClientRect();
							const normalized =
								(event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
							moveX(normalized * 22);
							rotate(normalized * 1.8);
						};
						const resetHero = () => {
							moveX(0);
							rotate(0);
						};
						hero.addEventListener("pointermove", onHeroMove, { passive: true });
						hero.addEventListener("pointerleave", resetHero);
						cleanup.push(() => {
							hero.removeEventListener("pointermove", onHeroMove);
							hero.removeEventListener("pointerleave", resetHero);
							gsap.killTweensOf(workstation);
						});
					}

					for (const target of gsap.utils.toArray<HTMLElement>(
						"[data-magnetic]",
						root,
					)) {
						const inner = target.querySelector<HTMLElement>(
							"[data-magnetic-inner]",
						);
						if (!inner) continue;

						const moveX = gsap.quickTo(inner, "x", {
							duration: 0.5,
							ease: "power3.out",
						});
						const moveY = gsap.quickTo(inner, "y", {
							duration: 0.5,
							ease: "power3.out",
						});
						const strength = target.classList.contains("contact-orb")
							? 0.28
							: 0.2;
						const onMove = (event: PointerEvent) => {
							const bounds = target.getBoundingClientRect();
							moveX(
								(event.clientX - bounds.left - bounds.width / 2) * strength,
							);
							moveY(
								(event.clientY - bounds.top - bounds.height / 2) * strength,
							);
						};
						const reset = () => {
							moveX(0);
							moveY(0);
						};
						target.addEventListener("pointermove", onMove, { passive: true });
						target.addEventListener("pointerleave", reset);
						cleanup.push(() => {
							target.removeEventListener("pointermove", onMove);
							target.removeEventListener("pointerleave", reset);
							gsap.killTweensOf(inner);
						});
					}

					return () => {
						for (const dispose of cleanup) dispose();
					};
				},
			);

			return () => {
				media.revert();
				window.removeEventListener("resize", refresh);
				if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
				header?.classList.remove("is-on-dark");
				root.classList.remove("motion-enabled");
			};
		},
		{ scope: rootRef },
	);
}
