import { ScrollWordReveal } from "../visuals/ScrollWordReveal";

const principles = [
	{
		num: "01",
		title: "Start with people.",
		copy: "Understand the task, the context, and the decisions a person needs to make. The interface follows from there.",
		note: "Context before code",
	},
	{
		num: "02",
		title: "Connect the whole thing.",
		copy: "Interface, API, data, AI, and deployment. I take responsibility for how the pieces work together.",
		note: "End-to-end ownership",
	},
	{
		num: "03",
		title: "Make it tangible.",
		copy: "A working product is the best way to test an idea. Ship it, put it in someone's hands, and learn from what happens.",
		note: "Build. Ship. Learn.",
	},
];

export function WhySection() {
	return (
		<section
			id="why"
			className="relative scroll-mt-12 overflow-hidden bg-ink px-pad-x py-[clamp(72px,10vw,150px)] text-paper"
		>
			<header
				className="flex items-center justify-between gap-5 border-t border-paper/25 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
				data-reveal="line"
			>
				<p>
					<span className="mr-4 text-[#db8066]">02 /</span>The approach
				</p>
				<p className="text-paper/60">Human in the loop. Always.</p>
			</header>
			<div className="grid gap-12 pb-[clamp(56px,7vw,110px)] pt-[clamp(48px,7vw,110px)] lg:grid-cols-[0.34fr_1fr] lg:gap-20">
				<div className="flex items-start gap-5" data-reveal="rise">
					<span
						className="font-serif text-[6rem] leading-[0.7] text-[#db8066]"
						aria-hidden="true"
					>
						“
					</span>
					<p className="max-w-[18ch] font-mono text-[0.6rem] uppercase leading-6 tracking-[0.1em] text-paper/60">
						Technology is the amplifier.
						<br />
						Judgment is the compass.
					</p>
				</div>
				<ScrollWordReveal
					as="h2"
					className="max-w-[13em] font-serif text-[clamp(2.75rem,6.1vw,6.9rem)] leading-[1.02] tracking-[-0.045em] [&>em]:text-[#db8066]"
					segments={[
						{ text: "The best thing I bring to AI is" },
						{ text: "a human point of view.", accent: true },
					]}
				/>
			</div>
			<div className="grid border-t border-paper/25 md:grid-cols-3">
				{principles.map((principle) => (
					<article
						key={principle.num}
						className="border-b border-paper/20 py-8 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
						data-reveal="rise"
					>
						<p className="mb-10 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.1em] text-paper/55">
							<span>{principle.num}</span>
							<span aria-hidden="true">↗</span>
						</p>
						<h3 className="font-['Archivo_Variable'] text-[clamp(1.5rem,2.4vw,2.6rem)] font-normal leading-[1.05] tracking-[-0.035em]">
							{principle.title}
						</h3>
						<p className="mt-5 max-w-[39ch] text-[0.88rem] leading-7 text-paper/65">
							{principle.copy}
						</p>
						<p className="mt-8 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#db8066]">
							{principle.note}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}
