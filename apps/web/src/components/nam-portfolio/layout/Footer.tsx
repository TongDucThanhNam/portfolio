export function Footer() {
	return (
		<footer className="relative overflow-hidden bg-ink px-pad-x pb-8 pt-[clamp(44px,7vw,84px)] text-paper">
			<div className="grid items-end gap-12 border-t border-[rgba(246,242,233,0.14)] pt-10 lg:grid-cols-[1fr_auto]">
				<div data-reveal="mask">
					<p className="font-serif text-[clamp(3.4rem,8vw,8rem)] leading-[0.82] tracking-[-0.06em]">
						Thanh Nam<span className="text-rebar">.</span>
					</p>
					<p className="mt-7 max-w-[36em] font-mono text-[0.62rem] uppercase leading-6 tracking-[0.13em] text-[rgba(246,242,233,0.52)]">
						AI Product Builder / Full-stack TypeScript Developer / Ho Chi Minh
						City
					</p>
				</div>
				<nav
					className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[rgba(246,242,233,0.72)] lg:max-w-[390px] lg:justify-end"
					aria-label="Footer navigation"
					data-reveal="rise"
				>
					{[
						["Work", "#projects"],
						["Why", "#why"],
						["About", "#about"],
						["Experience", "#experience"],
						["Skills", "#skills"],
						["CV", "/Tong_Duc_Thanh_Nam_CV_EN.pdf"],
					].map(([label, href]) => (
						<a
							key={label}
							href={href}
							className="border-b border-transparent pb-1 transition-[color,border-color] hover:border-rebar hover:text-rebar"
						>
							{label}
						</a>
					))}
				</nav>
			</div>
			<div className="mt-[clamp(54px,8vw,96px)] flex flex-wrap justify-between gap-3 border-t border-[rgba(246,242,233,0.12)] pt-5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.45)]">
				<span>(c) 2026 Tong Duc Thanh Nam</span>
				<span>Built with intent / HCMC / UTC+7</span>
				<a
					href="#hero"
					className="transition-colors hover:text-rebar"
					aria-label="Back to top"
				>
					Back to top ↑
				</a>
			</div>
		</footer>
	);
}
