import type { ReactNode } from "react";

export function ContactBlock({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<div>
			<p className="mb-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)]">
				{label}
			</p>
			<p className="font-serif text-[clamp(1.05rem,1.5vw,1.3rem)] leading-6 tracking-[-0.015em]">
				{children}
			</p>
		</div>
	);
}
