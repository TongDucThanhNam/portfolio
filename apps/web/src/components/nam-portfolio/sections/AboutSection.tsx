import { SectionHead } from "../common";
import { projectTextLinkClass, sectionPadClass } from "../styles";
import { cx } from "../utils";
import { DirectionalHoverText } from "../visuals/DirectionalHoverText";
import { ScrollWordReveal } from "../visuals/ScrollWordReveal";

const operatingPrinciples = [
	[
		"01",
		"Context",
		"Understand the real workflow before choosing the interface.",
	],
	[
		"02",
		"System",
		"Connect product, data, automation, and deployment as one loop.",
	],
	["03", "Proof", "Leave behind a working surface people can inspect and use."],
] as const;

export function AboutSection() {
	return (
		<section
			id="about"
			className={cx(sectionPadClass, "relative overflow-clip bg-paper")}
		>
			<span
				className="pointer-events-none absolute -right-[0.04em] top-[0.1em] font-serif text-[clamp(15rem,36vw,39rem)] leading-none tracking-[-0.1em] text-bone"
				aria-hidden="true"
			>
				03
			</span>
			<SectionHead num="03" title="About" detail="Profile / 03" />

			<div className="relative z-10 grid items-start gap-[clamp(56px,8vw,132px)] lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.58fr)]">
				<div>
					<p
						className="mb-7 flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.12em] text-muted"
						data-reveal="rise"
					>
						<span className="h-px w-8 bg-rebar" aria-hidden="true" />
						Product builder / system thinker
					</p>
					<ScrollWordReveal
						className="m-0 max-w-[9.4em] text-balance font-serif text-[clamp(3.15rem,5.2vw,6.65rem)] leading-[0.9] tracking-[-0.055em]"
						segments={[
							{ text: "From vague workflows to" },
							{ text: "working products.", accent: true },
						]}
					/>
					<p
						className="mt-9 max-w-[42rem] text-[clamp(0.95rem,1.15vw,1.12rem)] leading-8 text-ink-soft"
						data-reveal="rise"
					>
						I build AI products, browser extensions, automation, and web
						applications—connecting product thinking, interface design, backend
						systems, and deployment into one accountable loop.
					</p>

					<div
						className="mt-[clamp(52px,7vw,92px)] border-y border-line"
						data-reveal="line"
					>
						{operatingPrinciples.map(([num, label, copy]) => (
							<div
								key={num}
								className="group/principle relative grid grid-cols-[44px_minmax(0,1fr)] items-center gap-4 overflow-hidden border-b border-line py-6 last:border-b-0 sm:grid-cols-[52px_minmax(150px,0.48fr)_minmax(0,1fr)_24px] sm:gap-6 sm:py-7"
							>
								<span className="font-mono text-[0.58rem] tracking-[0.1em] text-rebar">
									{num}
								</span>
								<DirectionalHoverText
									text={label}
									className="font-serif text-[clamp(1.9rem,3vw,3.2rem)] tracking-[-0.035em]"
								/>
								<span className="max-w-[32em] text-[0.86rem] leading-6 text-ink-soft transition-transform duration-500 ease-fluid group-hover/principle:translate-x-2 max-sm:col-span-2 max-sm:col-start-1">
									{copy}
								</span>
								<span
									className="font-serif text-xl text-muted transition-[color,transform] duration-500 group-hover/principle:translate-x-1 group-hover/principle:text-rebar max-sm:absolute max-sm:top-6 max-sm:right-0"
									aria-hidden="true"
								>
									↗
								</span>
							</div>
						))}
					</div>
				</div>

				<aside
					className="relative isolate overflow-hidden bg-ink p-[clamp(24px,3vw,42px)] text-paper lg:sticky lg:top-28"
					data-reveal="rise"
				>
					<span
						className="pointer-events-none absolute -right-[0.08em] -bottom-[0.24em] -z-10 font-serif text-[clamp(10rem,17vw,18rem)] leading-none tracking-[-0.08em] text-[rgba(246,242,233,0.045)]"
						aria-hidden="true"
					>
						TN
					</span>
					<div className="flex items-end justify-between gap-6 border-t border-[rgba(246,242,233,0.2)] py-7">
						<div>
							<p className="font-mono text-[0.58rem] tracking-[0.12em] text-rebar">
								03 / Profile
							</p>
							<p className="mt-3 font-serif text-[clamp(2rem,3vw,3.2rem)] leading-none tracking-[-0.04em] text-paper">
								Thanh Nam
							</p>
						</div>
						<span className="font-mono text-[0.58rem] tracking-[0.1em] text-paper/40">
							HCMC / VN
						</span>
					</div>
					<dl className="m-0 border-t border-[rgba(246,242,233,0.16)] [&>div]:grid [&>div]:grid-cols-[92px_1fr] [&>div]:gap-5 [&>div]:border-b [&>div]:border-[rgba(246,242,233,0.16)] [&>div]:py-5 [&_dd]:m-0 [&_dd]:text-[0.86rem] [&_dd]:leading-6 [&_dd]:text-paper/62 [&_dt]:font-mono [&_dt]:text-[0.54rem] [&_dt]:tracking-[0.1em] [&_dt]:text-rebar">
						<div>
							<dt>Based</dt>
							<dd>Ho Chi Minh City, Vietnam</dd>
						</div>
						<div>
							<dt>Education</dt>
							<dd>
								Software Engineering, Ton Duc Thang University (09/2020 -
								04/2025)
							</dd>
						</div>
						<div>
							<dt>Languages</dt>
							<dd>Vietnamese (native) / English (Aptis B2)</dd>
						</div>
						<div>
							<dt>Focus</dt>
							<dd>AI Product Builder / Full-stack TypeScript Developer</dd>
						</div>
					</dl>
					<a
						href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
						target="_blank"
						rel="noreferrer"
						className={cx(
							projectTextLinkClass,
							"relative mt-8 border-paper/28 text-paper hover:text-rebar",
						)}
					>
						Read the full CV <span aria-hidden="true">↗</span>
					</a>
				</aside>
			</div>
		</section>
	);
}
