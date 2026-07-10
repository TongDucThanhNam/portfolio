export function Kpi({
	value,
	unit,
	label,
}: {
	value: string;
	unit?: string;
	label: string;
}) {
	return (
		<div className="kpi-card group bg-paper p-6 transition hover:bg-bone">
			<span
				className="mb-10 block h-px w-10 origin-left scale-x-0 bg-rebar transition group-hover:scale-x-100"
				aria-hidden="true"
			/>
			<strong className="font-serif text-[clamp(3rem,7vw,7rem)] font-normal leading-none tracking-[-0.05em]">
				<span className="sr-only">
					{value}
					{unit ? ` ${unit}` : ""}
				</span>
				<span aria-hidden="true">
					<span className="kpi-value" data-kpi-value={value}>
						{value}
					</span>
					{unit && (
						<span className="ml-1 text-[0.26em] tracking-normal text-muted">
							{unit}
						</span>
					)}
				</span>
			</strong>
			<span className="mt-3 block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-soft">
				{label}
			</span>
		</div>
	);
}
