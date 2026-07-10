import { useEffect, useRef } from "react";

import { chapters } from "../data";
import { cx } from "../utils";

export function Header({
	menuOpen,
	setMenuOpen,
}: {
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
}) {
	const brandRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (brandRef.current) brandRef.current.inert = menuOpen;
	}, [menuOpen]);

	return (
		<header
			className={cx(
				"site-header fixed left-0 top-0 z-40 flex w-full items-center justify-between px-pad-x py-[22px] transition-colors duration-300 motion-reduce:transition-none",
				menuOpen
					? "text-paper mix-blend-normal"
					: "text-ink mix-blend-multiply",
			)}
		>
			<a
				ref={brandRef}
				href="#hero"
				className={cx(
					"font-serif text-[clamp(1.35rem,2vw,1.75rem)] tracking-[-0.02em]",
					menuOpen && "pointer-events-none",
				)}
				tabIndex={menuOpen ? -1 : undefined}
				data-cursor-label="TOP"
			>
				Thanh<span className="text-rebar"> .</span> Nam
			</a>
			<nav
				className="hidden gap-7 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft md:flex"
				aria-label="Main menu"
			>
				{chapters.slice(1).map((chapter) => (
					<a
						key={chapter.id}
						href={`#${chapter.id}`}
						className="transition hover:text-rebar"
						data-cursor-label={chapter.short}
					>
						{chapter.label}
					</a>
				))}
			</nav>
			<a
				href="#contact"
				className="hidden items-center gap-2 rounded-pill border border-ink px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition hover:bg-ink hover:text-paper md:inline-flex"
				data-cursor-label="HIRE"
			>
				<span className="h-1.5 w-1.5 rounded-full bg-rebar" />
				Available
			</a>
			<button
				id="portfolio-mobile-menu-toggle"
				type="button"
				className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
				aria-label={menuOpen ? "Close menu" : "Open menu"}
				aria-controls="portfolio-mobile-menu"
				aria-expanded={menuOpen}
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<span
					className={cx(
						"h-px w-6 bg-current transition duration-500 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] motion-reduce:transition-none",
						menuOpen && "translate-y-[3.5px] rotate-45",
					)}
					aria-hidden="true"
				/>
				<span
					className={cx(
						"h-px w-6 bg-current transition duration-500 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] motion-reduce:transition-none",
						menuOpen && "-translate-y-[3.5px] -rotate-45",
					)}
					aria-hidden="true"
				/>
			</button>
		</header>
	);
}
