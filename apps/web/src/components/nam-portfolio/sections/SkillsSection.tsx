import type { CSSProperties } from "react";
import { SectionHead } from "../common";
import { skills } from "../data";

export function SkillsSection() {
	return (
		<section id="skills" className="section-pad bg-paper">
			<SectionHead num="04" title="Skills" detail="The toolchain" />
			<h2
				className="motion-title mb-12 max-w-[840px] font-serif text-[clamp(3.3rem,8vw,8rem)] leading-[0.95] tracking-[-0.04em]"
				data-motion-title
			>
				What I <em className="font-light italic text-rebar">build</em> with
			</h2>
			<div className="grid border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
				{skills.map((group) => (
					<div
						key={group.label}
						className="skill-card group bg-paper p-7 transition hover:-translate-y-0.5 hover:bg-bone"
					>
						<span className="mb-6 block h-px w-full origin-left scale-x-0 bg-rebar transition group-hover:scale-x-100" />
						<h3 className="mb-5 font-serif text-[1.3rem] tracking-[-0.01em]">
							<span className="mr-2 font-mono text-[0.7rem] tracking-[0.08em] text-rebar">
								{group.num}
							</span>
							{group.label}
						</h3>
						<ul className="flex flex-col gap-2">
							{group.items.map((item) => (
								<li
									key={item.name}
									className="border-b border-line pb-2 last:border-b-0 last:pb-0"
									style={{ "--lvl": item.value } as CSSProperties}
								>
									<div className="mb-2 flex items-baseline justify-between gap-3">
										<span className="text-[0.95rem] text-ink">{item.name}</span>
										<span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-soft">
											{item.level}
										</span>
									</div>
									<span className="block h-px bg-line">
										<span className="skill-fill block h-px bg-rebar" />
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
