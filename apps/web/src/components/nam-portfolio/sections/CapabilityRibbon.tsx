const capabilities = [
	"AI products",
	"Browser extensions",
	"Automation",
	"Full-stack TypeScript",
	"Verifiable output",
];

function RibbonSet({ hidden = false }: { hidden?: boolean }) {
	return (
		<ul
			className="flex shrink-0 list-none items-center gap-[clamp(26px,4vw,62px)] px-[clamp(26px,4vw,62px)] py-[19px] [&>li]:flex [&>li]:items-center [&>li]:gap-[clamp(26px,4vw,62px)] [&>li]:whitespace-nowrap [&>li]:font-mono [&>li]:text-[0.64rem] [&>li]:uppercase [&>li]:tracking-[0.14em] [&_i]:font-serif [&_i]:text-base [&_i]:not-italic [&_i]:text-rebar"
			aria-hidden={hidden || undefined}
		>
			{capabilities.map((capability) => (
				<li key={capability}>
					<span>{capability}</span>
					<i aria-hidden="true">↗</i>
				</li>
			))}
		</ul>
	);
}

export function CapabilityRibbon() {
	return (
		<section
			className="relative z-[2] overflow-hidden border-y border-[rgba(246,242,233,0.14)] bg-ink text-paper"
			aria-label="Core capabilities"
		>
			<div className="flex w-max animate-ribbon motion-reduce:translate-x-0 motion-reduce:animate-none motion-reduce:[&>[aria-hidden=true]]:hidden">
				<RibbonSet />
				<RibbonSet hidden />
			</div>
		</section>
	);
}
