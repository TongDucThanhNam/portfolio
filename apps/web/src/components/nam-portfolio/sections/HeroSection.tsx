import { Workstation } from "../visuals/Workstation";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex min-h-[100dvh] overflow-hidden px-pad-x pb-[clamp(48px,8dvh,76px)] pt-[clamp(96px,13dvh,132px)]"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="hero-disc absolute right-[-8vw] top-[18vh] h-[clamp(180px,26vw,420px)] w-[clamp(180px,26vw,420px)] rounded-full bg-rebar-soft opacity-70" />
				<div className="hero-ghost absolute bottom-[8vh] left-[4vw] font-serif text-[clamp(7rem,18vw,20rem)] italic leading-none tracking-[-0.05em] text-bone-deep opacity-70">
					eragear
				</div>
			</div>

			<div className="hero-meta absolute left-pad-x top-[90px] hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft md:block">
				AI / WEB / EDGE
			</div>
			<div className="hero-meta absolute right-pad-x top-[90px] hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft md:block">
				HO CHI MINH CITY
			</div>
			<div className="hero-meta absolute bottom-9 right-pad-x hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft md:block">
				UTC +7
			</div>

			<div className="relative z-10 flex max-w-[1020px] flex-col justify-center">
				<p className="hero-intro label-accent mb-[clamp(18px,3dvh,28px)]">
					<span className="label-rule" />
					Full-stack TypeScript / AI application engineering
				</p>
				<h1 className="font-serif text-[clamp(5.3rem,17vw,12rem)] font-normal leading-[0.86] tracking-[-0.04em]">
					<span className="block overflow-hidden">
						<span className="hero-title-line block">Thanh</span>
					</span>
					<span className="block overflow-hidden pl-[clamp(42px,12vw,180px)]">
						<span className="hero-title-line block">
							<em className="font-light italic text-rebar">Nam</em>
						</span>
					</span>
				</h1>
				<p className="hero-intro mt-[clamp(18px,3dvh,30px)] max-w-[16em] font-serif text-[clamp(1.45rem,3.4vw,3.1rem)] leading-[1.06] tracking-[-0.025em]">
					The engineer to call when an AI idea needs to become a product people
					actually use.
				</p>
				<div className="hero-intro mt-[clamp(28px,4dvh,44px)] flex flex-wrap gap-4">
					<a
						href="#projects"
						className="btn-primary magnetic-target"
						data-cursor-label="WORK"
						data-cursor-stick
						data-magnetic
					>
						<span data-magnetic-inner>See my work</span>
					</a>
					<a
						href="#contact"
						className="btn-ghost magnetic-target"
						data-cursor-label="REACH"
						data-magnetic
					>
						<span data-magnetic-inner>Get in touch</span>
					</a>
				</div>
			</div>

			<Workstation />

			<div
				className="absolute bottom-9 left-pad-x hidden items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted md:flex"
				aria-hidden="true"
			>
				<span>Scroll</span>
				<span className="h-12 w-px overflow-hidden bg-line">
					<span className="block h-full w-px origin-top animate-scroll-cue bg-rebar" />
				</span>
			</div>
		</section>
	);
}
