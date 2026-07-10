import { SectionHead } from "../common";
import { Kpi } from "./Kpi";

export function AboutSection() {
	return (
		<section id="about" className="section-pad bg-paper">
			<SectionHead num="02" title="About" detail="Chapter - 02 / 05" />
			<div className="reveal grid border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
				<Kpi value="5" unit="yrs" label="Building software" />
				<Kpi value="1" label="Live AI product" />
				<Kpi value="3" label="Open-source repos" />
				<Kpi value="1" label="Published Android app" />
			</div>
			<div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
				<p
					className="about-statement max-w-[15em] font-serif text-[clamp(2.5rem,6vw,5.6rem)] leading-[1.02] tracking-[-0.035em]"
					data-about-statement
				>
					Software Engineering graduate focused on full-stack{" "}
					<em className="font-light italic text-rebar">TypeScript</em> and AI
					application products. I build{" "}
					<em className="font-light italic text-rebar">the whole loop</em> -
					backend APIs, data models, streaming UX, and the interface - with{" "}
					<em className="font-light italic text-rebar">durable state</em>.
				</p>
				<aside className="reveal self-start border border-line bg-bone p-7">
					<p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
						Quick facts
					</p>
					<ul className="mt-5 flex flex-col gap-3 text-ink-soft">
						<li className="flex flex-col gap-1">
							<span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft">
								Based
							</span>
							Ho Chi Minh City, Vietnam
						</li>
						<li className="flex flex-col gap-1">
							<span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft">
								Education
							</span>
							Software Engineering, Ton Duc Thang University (2020-2025)
						</li>
						<li className="flex flex-col gap-1">
							<span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft">
								Languages
							</span>
							Vietnamese (native) / English (Aptis B2)
						</li>
						<li className="flex flex-col gap-1">
							<span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft">
								Status
							</span>
							Open to opportunities
						</li>
					</ul>
					<div className="my-5 h-px w-10 bg-rebar" aria-hidden="true" />
					<p className="text-sm leading-6 text-ink-soft">
						I have shipped a live AI workspace, a branching chat UI, a desktop
						coding copilot, and a published Android keyboard.
					</p>
				</aside>
			</div>
		</section>
	);
}
