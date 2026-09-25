const closingLetters = Array.from("Let's talk.", (letter, index) => ({
	id: `closing-${index}`,
	letter,
}));

export function ContactSection() {
	return (
		<section
			id="contact"
			className="relative scroll-mt-12 overflow-hidden bg-rebar px-pad-x pb-[clamp(56px,7vw,100px)] pt-[clamp(64px,8vw,120px)] text-paper"
		>
			<header
				className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/40 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
				data-reveal="line"
			>
				<p>
					<span className="mr-4 text-paper/65">06 /</span>What's next?
				</p>
				<p className="inline-flex items-center gap-2 text-paper/80">
					<span
						className="h-1.5 w-1.5 rounded-full bg-paper"
						aria-hidden="true"
					/>
					Available for thoughtful work
				</p>
			</header>
			<div className="mt-[clamp(48px,7vw,104px)] grid gap-8 md:grid-cols-[1fr_0.6fr] md:items-end">
				<h2
					className="max-w-[15ch] font-serif text-[clamp(2.4rem,4.8vw,5.1rem)] font-normal leading-[1.02] tracking-[-0.04em]"
					data-reveal="rise"
				>
					Good people.
					<br />
					Interesting problems.
				</h2>
				<p
					className="max-w-[34ch] text-[0.9rem] leading-7 text-paper/80 md:justify-self-end"
					data-reveal="rise"
				>
					Building a team or a product?
					<br />
					I'd love to hear what you have in mind.
				</p>
			</div>
			<a
				href="mailto:tongducthanhnam@gmail.com"
				aria-label="Let's talk. Email Tong Duc Thanh Nam"
				className="group mt-8 flex items-center justify-between gap-4 border-b border-paper/50 pb-5 md:mt-10 md:pb-8"
			>
				<span className="sr-only">Let's talk. Email Tong Duc Thanh Nam</span>
				<span
					className="block overflow-hidden pb-[0.12em] font-['Archivo_Variable'] text-[clamp(4.3rem,15.5vw,17rem)] font-medium leading-[1.03] tracking-[-0.075em]"
					data-closing-title
					aria-hidden="true"
				>
					{closingLetters.map(({ letter, id }) => (
						<span
							key={id}
							className="inline-block whitespace-pre"
							data-closing-letter
						>
							{letter}
						</span>
					))}
				</span>
				<svg
					viewBox="0 0 100 100"
					fill="none"
					className="h-[clamp(42px,9vw,130px)] w-[clamp(42px,9vw,130px)] shrink-0 transition-transform duration-700 ease-fluid group-hover:-translate-y-3 group-hover:translate-x-2 group-focus-visible:-translate-y-3 group-focus-visible:translate-x-2"
					aria-hidden="true"
				>
					<path
						d="M16 84 84 16M16 16h68v68"
						stroke="currentColor"
						strokeWidth="5"
					/>
				</svg>
			</a>
			<div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
				<div>
					<a
						href="mailto:tongducthanhnam@gmail.com"
						className="inline-flex min-h-11 items-center break-all text-[clamp(1rem,1.8vw,1.6rem)] tracking-[-0.025em] underline-offset-8 hover:underline"
					>
						tongducthanhnam@gmail.com
					</a>
					<p className="mt-3 font-mono text-[0.56rem] uppercase leading-6 tracking-[0.1em] text-paper/75">
						Ho Chi Minh City, Vietnam / UTC +7
					</p>
				</div>
				<nav
					aria-label="Contact links"
					className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.63rem] uppercase tracking-[0.1em]"
				>
					<a
						href="https://github.com/TongDucThanhNam"
						target="_blank"
						rel="noreferrer"
						className="inline-flex min-h-11 items-center gap-3 border-b border-paper/40 transition-colors hover:border-paper"
					>
						GitHub <span aria-hidden="true">↗</span>
					</a>
					<a
						href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
						target="_blank"
						rel="noreferrer"
						className="inline-flex min-h-11 items-center gap-3 border-b border-paper/40 transition-colors hover:border-paper"
					>
						Résumé <span aria-hidden="true">↗</span>
					</a>
					<a
						href="tel:+84869887363"
						className="inline-flex min-h-11 items-center gap-3 border-b border-paper/40 transition-colors hover:border-paper"
					>
						Call me <span aria-hidden="true">↗</span>
					</a>
				</nav>
			</div>
		</section>
	);
}
