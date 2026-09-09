import { SectionHead } from "../common";
import { skills } from "../data";
import { sectionPadClass } from "../styles";
import { cx } from "../utils";
import { VariableWeightText } from "../visuals/VariableWeightText";

export function SkillsSection() {
	return (
		<section
			id="skills"
			className={cx(
				sectionPadClass,
				"relative overflow-hidden bg-paper text-ink",
			)}
		>
			<span
				className="pointer-events-none absolute -right-[0.04em] top-[0.05em] font-serif text-[clamp(15rem,35vw,38rem)] leading-none tracking-[-0.1em] text-bone"
				aria-hidden="true"
			>
				05
			</span>
			<SectionHead num="05" title="Skills" detail="Capability matrix / 08" />

			<div className="relative z-10 mb-[clamp(58px,9vw,118px)] grid items-end gap-10 lg:grid-cols-[1.2fr_0.45fr]">
				<p
					className="max-w-[8.7em] font-serif text-[clamp(3.5rem,8.4vw,8.6rem)] leading-[0.84] tracking-[-0.06em]"
					data-reveal="rise"
				>
					A working
					<br />
					<span className="text-rebar">capability field.</span>
				</p>
				<div
					className="max-w-[390px] border-t border-ink pt-6 lg:justify-self-end"
					data-reveal="rise"
				>
					<p className="text-[0.95rem] leading-7 text-ink-soft">
						Eight capability zones. Each maps to a product surface, a system
						responsibility, or a shipped workflow—not a decorative logo wall.
					</p>
					<p className="mt-6 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-rebar">
						Move through the field
					</p>
				</div>
			</div>

			<div
				className="group/field relative border-t border-l border-line"
				data-spotlight-grid
			>
				<div
					className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_420px_at_var(--spotlight-x,50%)_var(--spotlight-y,50%),rgba(184,66,46,0.105),transparent_72%)] opacity-0 transition-opacity duration-500 group-hover/field:opacity-100"
					aria-hidden="true"
				/>
				<div className="relative grid lg:grid-cols-2">
					{skills.map((group) => (
						<article
							key={group.label}
							className="group/cell relative isolate min-h-[300px] overflow-hidden border-r border-b border-line px-[clamp(22px,3.4vw,54px)] py-[clamp(28px,4vw,58px)] transition-colors duration-500 hover:bg-bone/65"
							data-reveal="rise"
						>
							<span
								className="pointer-events-none absolute -right-[0.03em] -bottom-[0.32em] -z-10 font-serif text-[clamp(10rem,18vw,19rem)] leading-none tracking-[-0.09em] text-bone transition-[color,transform] duration-700 group-hover/cell:-translate-x-3 group-hover/cell:text-[rgba(184,66,46,0.09)]"
								aria-hidden="true"
							>
								{group.num}
							</span>
							<header className="flex items-start justify-between gap-8">
								<span className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-rebar">
									Field / {group.num}
								</span>
								<span className="h-px w-10 origin-right bg-line transition-all duration-500 group-hover/cell:w-20 group-hover/cell:bg-rebar" />
							</header>

							<h3 className="mt-12 font-['Archivo_Variable'] text-[clamp(2.5rem,4.2vw,5rem)] leading-[0.88] tracking-[-0.06em] transition-colors duration-500 group-hover/cell:text-rebar">
								<VariableWeightText text={group.label} />
							</h3>
							<p className="mt-6 max-w-[38em] text-[0.88rem] leading-7 text-ink-soft">
								{group.description}
							</p>
							<ul className="mt-9 flex list-none flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5 font-mono text-[0.54rem] uppercase tracking-[0.09em] text-muted">
								{group.items.map((item) => (
									<li
										key={item}
										className="flex items-center gap-2 transition-colors duration-300 group-hover/cell:text-ink-soft"
									>
										<span className="h-1 w-1 bg-rebar" aria-hidden="true" />
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
