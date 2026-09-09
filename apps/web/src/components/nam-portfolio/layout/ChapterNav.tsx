import { useState } from "react";

import { chapters } from "../data";
import { cx } from "../utils";

export function ChapterNav({ activeSection }: { activeSection: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeChapter =
		chapters.find((chapter) => chapter.id === activeSection) ?? chapters[0];
	if (activeSection === "hero") return null;

	return (
		<nav className="fixed z-40" aria-label="Portfolio chapters">
			<ul className="fixed inset-x-0 top-0 m-0 hidden min-h-12 list-none items-stretch justify-center border-b border-line bg-paper/94 px-pad-x backdrop-blur-md motion-safe:animate-nav-enter md:flex">
				{chapters.map((chapter) => (
					<li key={chapter.id}>
						<a
							href={`#${chapter.id}`}
							className={cx(
								"relative inline-flex min-h-12 items-center gap-2 border-x border-transparent px-3 font-mono text-[0.56rem] uppercase tracking-[0.09em] text-muted transition-[color,border-color,background-color] duration-300 after:absolute after:right-2 after:bottom-0 after:left-2 after:h-px after:origin-left after:scale-x-0 after:bg-rebar after:transition-transform after:duration-500 hover:bg-bone hover:text-ink",
								activeSection === chapter.id &&
									"border-line bg-bone/60 text-ink after:scale-x-100",
							)}
							aria-current={
								activeSection === chapter.id ? "location" : undefined
							}
						>
							<span className="text-[0.5rem] opacity-70">{chapter.num}</span>
							{chapter.short}
						</a>
					</li>
				))}
			</ul>

			<details
				className="group fixed right-3 bottom-3 left-3 rounded-md border border-line bg-paper shadow-sheet motion-safe:animate-nav-enter md:hidden"
				open={mobileOpen}
				onToggle={(event) => setMobileOpen(event.currentTarget.open)}
			>
				<summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 font-mono text-[0.62rem] uppercase tracking-widest [&::-webkit-details-marker]:hidden">
					<span className="flex items-center gap-2">
						<span className="text-rebar">{activeChapter.num}</span>
						{activeChapter.label}
					</span>
					<span className="flex items-center gap-3 text-muted">
						Chapters
						<span
							className="text-rebar transition-transform duration-300 group-open:rotate-45"
							aria-hidden="true"
						>
							＋
						</span>
					</span>
				</summary>
				<ul className="m-0 grid list-none grid-cols-2 border-t border-line p-2">
					{chapters.map((chapter) => (
						<li key={chapter.id}>
							<a
								href={`#${chapter.id}`}
								className={cx(
									"flex min-h-11 items-center gap-3 rounded-sm px-3 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted transition-colors hover:bg-bone hover:text-ink",
									activeSection === chapter.id && "bg-ink text-paper",
								)}
								aria-current={
									activeSection === chapter.id ? "location" : undefined
								}
								onClick={() => setMobileOpen(false)}
							>
								<span className="text-rebar">{chapter.num}</span>
								{chapter.label}
							</a>
						</li>
					))}
				</ul>
			</details>
		</nav>
	);
}
