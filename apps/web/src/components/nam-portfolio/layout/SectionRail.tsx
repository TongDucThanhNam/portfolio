import { chapters } from "../data";
import { cx } from "../utils";

export function SectionRail({ activeSection }: { activeSection: string }) {
	return (
		<nav
			className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
			aria-label="Chapter navigation"
		>
			<div
				className="absolute right-[13px] top-0 h-full w-px bg-line"
				aria-hidden="true"
			/>
			<ul className="relative flex flex-col gap-3">
				{chapters.map((chapter) => (
					<li key={chapter.id}>
						<a
							href={`#${chapter.id}`}
							className={cx(
								"group flex items-center justify-end gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted opacity-80 transition hover:text-rebar",
								activeSection === chapter.id && "text-rebar opacity-100",
							)}
							data-cursor-label={chapter.short}
						>
							<span>{chapter.num}</span>
							<span className="w-14 translate-x-2 text-left opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
								{chapter.short}
							</span>
							<span
								className={cx(
									"h-px w-3 bg-line transition-all",
									activeSection === chapter.id && "w-7 bg-rebar",
								)}
							/>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
