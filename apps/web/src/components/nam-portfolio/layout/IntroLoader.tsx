const shutters = ["01", "02", "03", "04"];

export function IntroLoader() {
	return (
		<div
			className="preloader fixed inset-0 z-[90] flex items-center justify-center overflow-hidden px-pad-x"
			aria-hidden="true"
		>
			<div className="preloader-shutters absolute inset-0 grid grid-cols-4">
				{shutters.map((shutter) => (
					<div
						key={shutter}
						className="preloader-shutter relative border-r border-line bg-bone last:border-r-0"
					>
						<span className="absolute bottom-6 left-6 hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted md:block">
							{shutter}
						</span>
					</div>
				))}
			</div>

			<div className="preloader-content relative z-10 w-full max-w-3xl">
				<div className="preloader-meta mb-10 flex justify-between border-b border-line pb-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
					<span>AI recruiter search</span>
					<span className="text-rebar">Portfolio match</span>
				</div>
				<div className="overflow-hidden pb-2">
					<p className="preloader-prompt font-serif text-[clamp(2.6rem,7vw,5.8rem)] leading-[0.95] tracking-[-0.03em]">
						<span className="text-rebar">{">"}</span> Find the engineer who
						ships AI products.
					</p>
				</div>
				<div className="preloader-scan mt-8 grid grid-cols-[104px_1fr_58px] items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
					<span>Evidence</span>
					<span className="h-px overflow-hidden bg-line">
						<span className="preloader-scan-fill block h-px origin-left bg-rebar" />
					</span>
					<span className="text-right text-rebar">04 / 04</span>
				</div>
				<div className="preloader-result mt-12 overflow-hidden border-t border-line pt-8">
					<div className="preloader-result-inner">
						<p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-rebar">
							Best match
						</p>
						<h2 className="mt-2 font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.035em]">
							Thanh <em className="font-light italic text-rebar">Nam</em>
						</h2>
						<p className="mt-2 text-ink-soft">
							Full-stack TypeScript / AI application engineer
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
