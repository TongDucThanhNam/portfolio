import { type KeyboardEvent, useRef, useState } from "react";
import { SectionHead } from "../common";
import { storyBeats } from "../data";
import { sectionPadClass } from "../styles";
import { cx } from "../utils";

export function WhySection() {
	const [activeStory, setActiveStory] = useState(0);
	const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

	const chooseStory = (index: number) => {
		setActiveStory(index);
		tabsRef.current[index]?.focus();
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLButtonElement>,
		index: number,
	) => {
		let nextIndex = index;

		if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			nextIndex = (index + 1) % storyBeats.length;
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			nextIndex = (index - 1 + storyBeats.length) % storyBeats.length;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = storyBeats.length - 1;
		} else {
			return;
		}

		event.preventDefault();
		chooseStory(nextIndex);
	};

	return (
		<section id="why" className={cx(sectionPadClass, "bg-paper text-ink")}>
			<SectionHead num="02" title="Why Nam" detail="Product / system / proof" />

			<div className="grid gap-[clamp(34px,7vw,100px)] md:grid-cols-[minmax(180px,0.32fr)_minmax(0,1fr)]">
				<div
					role="tablist"
					aria-label="Reasons to work with Nam"
					className="grid self-start border-t border-line max-md:grid-cols-3 md:flex md:flex-col"
					data-reveal="rise"
				>
					{storyBeats.map((story, index) => (
						<button
							key={story.step}
							ref={(button) => {
								tabsRef.current[index] = button;
							}}
							id={`story-tab-${index}`}
							type="button"
							role="tab"
							aria-selected={index === activeStory}
							aria-controls={`story-panel-${index}`}
							tabIndex={index === activeStory ? 0 : -1}
							className={cx(
								"group relative flex justify-between gap-3 border-0 border-b border-line bg-transparent px-0 py-5 text-left font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors hover:text-rebar max-md:block max-md:border-r max-md:px-2 max-md:py-4 max-md:text-center max-md:last:border-r-0",
								index === activeStory && "text-rebar",
							)}
							onClick={() => setActiveStory(index)}
							onKeyDown={(event) => handleKeyDown(event, index)}
						>
							<span>{story.step}</span>
							<span className="text-muted max-md:hidden">{story.count}</span>
							<span
								className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-rebar transition-transform duration-[450ms] ease-fluid group-aria-selected:scale-x-100"
								aria-hidden="true"
							/>
						</button>
					))}
				</div>

				<div
					className="relative border border-line bg-bone p-[clamp(20px,4vw,46px)] shadow-sheet"
					data-reveal="rise"
				>
					<div className="mb-8 flex items-center gap-4">
						<span className="h-px flex-1 overflow-hidden bg-line">
							<span
								className={cx(
									"block h-full origin-left bg-rebar transition-transform duration-500",
									activeStory === 0 && "scale-x-[0.333333]",
									activeStory === 1 && "scale-x-[0.666667]",
									activeStory === 2 && "scale-x-100",
								)}
							/>
						</span>
						<span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-rebar">
							{String(activeStory + 1).padStart(2, "0")} /{" "}
							{String(storyBeats.length).padStart(2, "0")}
						</span>
					</div>
					{storyBeats.map((story, index) => (
						<div
							key={story.step}
							id={`story-panel-${index}`}
							role="tabpanel"
							aria-labelledby={`story-tab-${index}`}
							hidden={index !== activeStory}
							className="grid min-h-[370px] items-end gap-[clamp(32px,6vw,82px)] [&:not([hidden])]:animate-why-panel lg:grid-cols-[minmax(0,1fr)_minmax(170px,0.3fr)] motion-reduce:animate-none"
						>
							<div>
								<p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-rebar">
									{story.kicker}
								</p>
								<h3 className="max-w-[9em] font-serif text-[clamp(3.15rem,7vw,7.2rem)] leading-[0.92] tracking-[-0.04em]">
									{story.title}
								</h3>
								<p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-ink-soft">
									{story.copy}
								</p>
							</div>

							<div className="border-t border-line pt-6">
								<span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-soft">
									{story.proofLabel}
								</span>
								<strong className="mt-2 block font-serif text-[clamp(1.8rem,3vw,3rem)] font-normal leading-none tracking-[-0.03em]">
									{story.proof}
								</strong>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
