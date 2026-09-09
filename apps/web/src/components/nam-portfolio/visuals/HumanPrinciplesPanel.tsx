const principles = [
	{
		code: "01",
		title: "Human first",
		copy: "Empathy, ethics, and clarity guide every decision.",
	},
	{
		code: "02",
		title: "AI empowers",
		copy: "Use AI to explore, accelerate, and elevate.",
	},
	{
		code: "03",
		title: "Built end-to-end",
		copy: "From idea to production with craft and ownership.",
	},
	{
		code: "04",
		title: "Impact driven",
		copy: "Solve real problems. Create lasting value.",
	},
] as const;

const proofPoints = [
	{ value: "09", label: "Products built" },
	{ value: "04", label: "Product layers" },
] as const;

export function HumanPrinciplesPanel() {
	return (
		<aside
			className="hidden w-full opacity-100 transition-[opacity,transform] delay-[720ms] duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-5 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 min-[1180px]:block motion-reduce:translate-y-0"
			aria-label="Product principles"
			data-principles-panel
		>
			<ul className="m-0 grid list-none border-t border-line/80 p-0">
				{principles.map((principle) => (
					<li
						key={principle.title}
						className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-dashed border-line/75 py-1.5"
					>
						<span
							className="self-start pt-px font-mono text-[0.6rem] tracking-[0.08em] text-rebar"
							aria-hidden="true"
						>
							[{principle.code}]
						</span>
						<p className="m-0 min-w-0 leading-tight">
							<strong className="block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ink">
								{principle.title}
							</strong>
							<span className="mt-0.5 block text-[0.62rem] leading-[1.25] text-muted">
								{principle.copy}
							</span>
						</p>
						<span
							className="self-start font-mono text-[0.72rem] leading-none text-rebar"
							aria-hidden="true"
						>
							+
						</span>
					</li>
				))}
			</ul>
		</aside>
	);
}

export function HumanQuoteBox() {
	return (
		<aside
			className="absolute bottom-[28px] left-pad-x z-[7] hidden w-[clamp(440px,42vw,560px)] grid min-h-[86px] grid-cols-[1.8fr_repeat(2,1fr)] border border-line/80 bg-bone/80 shadow-xs backdrop-blur-[2px] opacity-100 transition-[opacity,transform] delay-[720ms] duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-5 [[data-motion=full][data-motion-ready=false]_&]:opacity-0 min-[1180px]:grid motion-reduce:translate-y-0"
			aria-label="Product proof and quote"
			data-quote-box
		>
			<div className="flex flex-col justify-center px-3.5 py-2.5">
				<p className="m-0 text-[1.2rem] font-medium leading-[1.38] text-ink-soft whitespace-nowrap">
					<span
						className="font-serif text-[1.15rem] font-semibold text-rebar select-none mr-0.5 inline-block -translate-y-[1px]"
						aria-hidden="true"
					>
						“
					</span>
					Technology is the amplifier.
					<span className="block font-semibold text-rebar whitespace-nowrap">
						Human judgment is the compass.
					</span>
				</p>
			</div>

			{proofPoints.map((proof) => (
				<div
					key={proof.label}
					className="flex flex-col justify-center border-l border-line/80 px-3"
				>
					<strong className="font-mono text-[1rem] tracking-[0.04em] text-ink">
						{proof.value}
					</strong>
					<span className="mt-1.5 font-mono text-[0.6rem] uppercase leading-[1.45] tracking-[0.09em] text-muted">
						{proof.label}
					</span>
				</div>
			))}
		</aside>
	);
}
