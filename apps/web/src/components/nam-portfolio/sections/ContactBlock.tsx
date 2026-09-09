import type { ReactNode } from "react";

export function ContactBlock({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<div className="grid min-h-[96px] grid-cols-[74px_1fr] items-center gap-4 border-t border-[rgba(246,242,233,0.18)] py-5 sm:grid-cols-[92px_1fr]">
			<p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[rgba(246,242,233,0.48)]">
				{label}
			</p>
			<p className="font-serif text-[clamp(1.05rem,1.5vw,1.35rem)] leading-6 tracking-[-0.015em] text-paper">
				{children}
			</p>
		</div>
	);
}
