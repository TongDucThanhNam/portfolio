import { SectionHead } from "../common";
import { skills } from "../data";
import { chipClass, sectionPadClass } from "../styles";
import { cx } from "../utils";

export function SkillsSection() {
	return (
		<section id="skills" className={cx(sectionPadClass, "bg-paper")}>
			<SectionHead num="05" title="Skills" detail="The toolchain" />
			<h2
				className="mb-12 max-w-[840px] font-serif text-[clamp(3.3rem,8vw,8rem)] leading-[0.95] tracking-[-0.04em]"
				data-reveal="mask"
			>
				What I <em className="font-light italic text-rebar">build</em> with
			</h2>
			<div className="grid border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 [&>:nth-child(2)]:[--reveal-delay:70ms] [&>:nth-child(3)]:[--reveal-delay:140ms] [&>:nth-child(4)]:[--reveal-delay:210ms] [&>:nth-child(5)]:[--reveal-delay:40ms] [&>:nth-child(6)]:[--reveal-delay:110ms] [&>:nth-child(7)]:[--reveal-delay:180ms] [&>:nth-child(8)]:[--reveal-delay:250ms]">
				{skills.map((group) => (
					<div
						key={group.label}
						className="group flex min-h-[290px] flex-col bg-paper p-7 transition-colors duration-300 hover:bg-bone"
						data-reveal="rise"
					>
						<span className="mb-6 block h-px w-full origin-left scale-x-0 bg-rebar transition group-hover:scale-x-100" />
						<h3 className="font-serif text-[1.3rem] tracking-[-0.01em]">
							<span className="mr-2 font-mono text-[0.7rem] tracking-[0.08em] text-rebar">
								{group.num}
							</span>
							{group.label}
						</h3>
						<p className="mt-3 text-sm leading-6 text-ink-soft">
							{group.description}
						</p>
						<ul className="mt-auto flex flex-wrap gap-1.5 pt-8">
							{group.items.map((item) => (
								<li key={item} className={chipClass}>
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
