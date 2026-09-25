import { SectionHead } from "../common";

export function AboutSection() {
	return (
		<section
			id="about"
			className="relative scroll-mt-12 bg-paper px-pad-x py-[clamp(72px,10vw,150px)]"
		>
			<SectionHead
				num="03"
				title="Behind the work"
				detail="Thanh Nam / Ho Chi Minh City"
			/>
			<div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-[clamp(64px,9vw,140px)]">
				<figure className="group/project m-0">
					<div
						className="relative aspect-[4/5] overflow-hidden bg-bone-deep"
						data-image-frame
					>
						<div className="absolute inset-0" data-image-layer>
							<img
								src="/images/avatar.webp"
								alt="Thanh Nam"
								width={800}
								height={800}
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover object-[50%_30%] grayscale transition-[filter,transform] duration-1000 group-hover/project:scale-[1.025] group-hover/project:grayscale-0"
							/>
						</div>
						<span className="absolute bottom-5 left-5 bg-paper px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink">
							The human behind the loop ↗
						</span>
					</div>
					<figcaption className="mt-4 flex items-center justify-between gap-3 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-soft">
						<span>Tong Duc Thanh Nam</span>
						<span>HCMC, Vietnam</span>
					</figcaption>
				</figure>
				<div className="md:pt-4">
					<h2
						className="font-['Archivo_Variable'] text-[clamp(3rem,5.9vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.065em]"
						data-reveal="mask"
					>
						Curious by nature.
						<br />
						<span className="font-serif font-normal italic text-rebar">
							Builder by choice.
						</span>
					</h2>
					<div
						className="mt-8 max-w-[50ch] space-y-5 text-[clamp(0.92rem,1.2vw,1.05rem)] leading-8 text-ink-soft"
						data-reveal="rise"
					>
						<p>
							I'm Nam, a software engineer in Ho Chi Minh City. I build AI
							products, browser extensions, and web applications that make
							everyday work a little easier.
						</p>
						<p>
							I enjoy the space between an unclear problem and a useful product:
							figuring out what matters, connecting the systems, and refining
							the details until it feels right.
						</p>
					</div>
					<dl className="mt-10 border-t border-ink/25 text-sm [&>div]:grid [&>div]:grid-cols-[100px_1fr] [&>div]:gap-5 [&>div]:border-b [&>div]:border-ink/15 [&>div]:py-4 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:uppercase [&_dt]:tracking-[0.08em] [&_dt]:text-ink-soft [&_dd]:leading-6">
						<div>
							<dt>Focus</dt>
							<dd>AI products & full-stack TypeScript</dd>
						</div>
						<div>
							<dt>Education</dt>
							<dd>
								Software Engineering
								<br />
								Ton Duc Thang University
							</dd>
						</div>
						<div>
							<dt>Languages</dt>
							<dd>Vietnamese / English · Aptis B2</dd>
						</div>
					</dl>
					<a
						href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
						target="_blank"
						rel="noreferrer"
						className="group mt-8 inline-flex min-h-12 items-center gap-12 border-b border-ink font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors hover:border-rebar hover:text-rebar"
					>
						A little more about me{" "}
						<span
							className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
				</div>
			</div>
		</section>
	);
}
