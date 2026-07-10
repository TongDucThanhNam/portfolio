import { storyBeats } from "../data";
import { cx } from "../utils";

export function WhySection({ activeStory }: { activeStory: number }) {
	return (
		<section id="why" className="min-h-[300vh] bg-paper text-ink">
			<div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden px-pad-x py-[clamp(88px,12dvh,120px)]">
				<div className="relative w-full">
					<div
						className="story-ghost absolute -right-10 -top-20 hidden font-serif text-[clamp(10rem,20vw,19rem)] italic leading-none tracking-[-0.06em] text-bone-deep opacity-50 md:block"
						aria-hidden="true"
					>
						why
					</div>

					<ol className="story-stage relative min-h-[clamp(430px,62dvh,620px)]">
						{storyBeats.map((story, index) => (
							<li
								key={story.step}
								className={cx(
									"story-beat grid content-center gap-10 lg:grid-cols-[170px_1fr_230px] lg:gap-12",
									index === activeStory && "is-active",
								)}
								aria-current={index === activeStory ? "step" : undefined}
							>
								<div className="story-beat-meta flex justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-rebar lg:block lg:pt-12">
									<p>Why choose Nam</p>
									<span>{story.count} / 03</span>
								</div>

								<div className="story-beat-copy max-w-[780px]">
									<p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-rebar">
										{story.kicker}
									</p>
									<h2 className="font-serif text-[clamp(3.2rem,9vw,7.8rem)] leading-[0.92] tracking-[-0.04em]">
										{story.title}
									</h2>
									<p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
										{story.copy}
									</p>
								</div>

								<div className="story-beat-proof border-t border-line pt-6 lg:self-end">
									<span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft">
										{story.proofLabel}
									</span>
									<strong className="mt-2 block font-serif text-[clamp(1.8rem,3vw,3rem)] font-normal leading-none tracking-[-0.03em]">
										{story.proof}
									</strong>
								</div>

								<span
									className="story-beat-index pointer-events-none absolute -bottom-10 right-0 font-serif text-[clamp(7rem,16vw,15rem)] leading-none tracking-[-0.06em] text-bone-deep opacity-60"
									aria-hidden="true"
								>
									0{index + 1}
								</span>
							</li>
						))}
					</ol>

					<div className="mt-8 h-px bg-line">
						<span className="story-progress block h-px origin-left bg-rebar" />
					</div>
					<ol className="mt-5 flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
						{storyBeats.map((beat, index) => (
							<li
								key={beat.step}
								className={cx(
									"story-step transition-colors",
									index === activeStory && "is-active text-rebar",
								)}
							>
								{beat.step}
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
