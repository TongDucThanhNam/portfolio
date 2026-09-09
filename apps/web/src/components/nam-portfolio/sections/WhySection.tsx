import { useEffect, useRef } from "react";

import { storyBeats } from "../data";
import { cx } from "../utils";

const overlapCount = 3;
const storyWordBlocks = storyBeats.map((story) =>
	story.title.split(" ").map((word, index) => ({
		id: `${story.step}-${String(index).padStart(2, "0")}-${word}`,
		word,
	})),
);

function getWordProgress(
	phaseProgress: number,
	wordIndex: number,
	totalWords: number,
) {
	const totalLength = 1 + overlapCount / totalWords;
	const scale =
		1 /
		Math.min(
			totalLength,
			1 + (totalWords - 1) / totalWords + overlapCount / totalWords,
		);
	const start = (wordIndex / totalWords) * scale;
	const end = start + (overlapCount / totalWords) * scale;

	if (phaseProgress <= start) return 0;
	if (phaseProgress >= end) return 1;
	return (phaseProgress - start) / (end - start);
}

export function WhySection() {
	const sectionRef = useRef<HTMLElement>(null);
	const wordRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
	const detailRefs = useRef<Array<HTMLDivElement | null>>([]);
	const progressRef = useRef<HTMLSpanElement>(null);
	const progressLabelRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const progressBar = progressRef.current;
		const progressLabel = progressLabelRef.current;
		if (!section || !progressBar || !progressLabel) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let frame = 0;
		let visible = false;

		const setBlockWords = (
			blockIndex: number,
			progress: number,
			direction: "in" | "out",
		) => {
			const words = wordRefs.current[blockIndex] ?? [];
			const total = Math.max(1, words.length);

			for (const [wordIndex, word] of words.entries()) {
				if (!word) continue;
				const local = getWordProgress(progress, wordIndex, total);
				const amount = direction === "out" ? local : 1 - local;
				word.style.transform = `translate3d(0, ${amount * 112}%, 0)`;
				word.style.opacity = (1 - amount * 0.88).toFixed(3);
			}
		};

		const setDetails = (opacities: number[]) => {
			for (const [index, detail] of detailRefs.current.entries()) {
				if (!detail) continue;
				const opacity = opacities[index] ?? 0;
				detail.style.opacity = opacity.toFixed(3);
				detail.style.transform = `translate3d(0, ${(1 - opacity) * 18}px, 0)`;
			}
		};

		const resetStatic = () => {
			for (const words of wordRefs.current) {
				for (const word of words) {
					word?.style.removeProperty("transform");
					word?.style.removeProperty("opacity");
				}
			}
			for (const detail of detailRefs.current) {
				detail?.style.removeProperty("transform");
				detail?.style.removeProperty("opacity");
			}
			progressBar.style.transform = "scaleX(1)";
			progressLabel.textContent = "03 / 03";
		};

		const paint = () => {
			frame = 0;
			if (!visible) return;

			if (reducedMotion || window.innerWidth < 1024) {
				resetStatic();
				return;
			}

			const bounds = section.getBoundingClientRect();
			const travel = Math.max(1, section.offsetHeight - window.innerHeight);
			const progress = Math.max(0, Math.min(1, -bounds.top / travel));
			progressBar.style.transform = `scaleX(${progress})`;
			progressLabel.textContent = `${String(
				Math.min(3, Math.floor(progress * 3) + 1),
			).padStart(2, "0")} / 03`;

			if (progress <= 0.5) {
				const phase = progress / 0.5;
				setBlockWords(0, phase, "out");
				setBlockWords(1, phase, "in");
				setBlockWords(2, 0, "in");
				setDetails([1 - phase, phase, 0]);
			} else {
				const phase = (progress - 0.5) / 0.5;
				setBlockWords(0, 1, "out");
				setBlockWords(1, phase, "out");
				setBlockWords(2, phase, "in");
				setDetails([0, 1 - phase, phase]);
			}
		};

		const schedulePaint = () => {
			if (!frame) frame = window.requestAnimationFrame(paint);
		};

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) schedulePaint();
		});
		visibilityObserver.observe(section);
		window.addEventListener("scroll", schedulePaint, { passive: true });
		window.addEventListener("resize", schedulePaint);

		return () => {
			visibilityObserver.disconnect();
			window.removeEventListener("scroll", schedulePaint);
			window.removeEventListener("resize", schedulePaint);
			if (frame) window.cancelAnimationFrame(frame);
			resetStatic();
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id="why"
			className="relative bg-bone text-ink lg:h-[280svh]"
		>
			<div className="relative overflow-hidden px-pad-x py-pad-y lg:sticky lg:top-0 lg:h-screen lg:py-[clamp(68px,9vh,104px)]">
				<span
					className="pointer-events-none absolute -right-[0.05em] -bottom-[0.3em] font-serif text-[clamp(16rem,39vw,42rem)] leading-none tracking-[-0.11em] text-[rgba(22,20,15,0.035)]"
					aria-hidden="true"
				>
					02
				</span>
				<header className="relative z-10 flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-muted">
					<span>
						<strong className="mr-2 font-normal text-rebar">02</strong>
						Why Nam
					</span>
					<span className="flex items-center gap-3">
						Progress
						<strong ref={progressLabelRef} className="font-normal text-rebar">
							01 / 03
						</strong>
					</span>
					<span className="absolute right-0 -bottom-px left-0 h-px bg-line">
						<i
							ref={progressRef}
							className="block h-full w-full origin-left scale-x-0 bg-rebar will-change-transform"
						/>
					</span>
				</header>

				<div className="relative z-10 mt-[clamp(48px,8vh,92px)] lg:h-[calc(100%-132px)]">
					{storyBeats.map((story, blockIndex) => (
						<article
							key={story.step}
							className="relative grid gap-10 border-b border-line py-12 last:border-b-0 lg:absolute lg:inset-0 lg:grid-cols-[minmax(0,1.18fr)_minmax(270px,0.42fr)] lg:items-center lg:gap-[clamp(52px,10vw,154px)] lg:border-0 lg:py-0"
						>
							<h3 className="m-0 max-w-[10em] font-serif text-[clamp(3.5rem,7.6vw,8.7rem)] font-normal leading-[0.84] tracking-[-0.06em]">
								{storyWordBlocks[blockIndex].map((token, wordIndex) => (
									<span
										key={token.id}
										className="mr-[0.18em] inline-block overflow-hidden align-top"
									>
										<span
											ref={(node) => {
												wordRefs.current[blockIndex] ??= [];
												wordRefs.current[blockIndex][wordIndex] = node;
											}}
											className={cx(
												"inline-block will-change-transform motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
												blockIndex > 0 && "lg:translate-y-full lg:opacity-0",
											)}
										>
											{token.word}
										</span>
									</span>
								))}
							</h3>

							<div
								ref={(node) => {
									detailRefs.current[blockIndex] = node;
								}}
								className={cx(
									"self-end border-t border-ink pt-6 will-change-transform lg:self-center motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
									blockIndex > 0 && "lg:opacity-0",
								)}
							>
								<div className="flex items-center justify-between gap-6 font-mono text-[0.58rem] uppercase tracking-[0.12em]">
									<span className="text-rebar">{story.kicker}</span>
									<span className="text-muted">Signal / {story.step}</span>
								</div>
								<p className="mt-7 text-[clamp(0.95rem,1.1vw,1.08rem)] leading-8 text-ink-soft">
									{story.copy}
								</p>
								<div className="mt-9 grid grid-cols-[0.42fr_1fr] border-y border-line py-5">
									<span className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-muted">
										{story.proofLabel}
									</span>
									<strong className="font-serif text-[clamp(1.7rem,2.7vw,3rem)] font-normal leading-none tracking-[-0.03em] text-rebar">
										{story.proof}
									</strong>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
