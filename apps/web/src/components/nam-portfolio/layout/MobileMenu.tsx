import { useEffect, useRef } from "react";

import { chapters } from "../data";
import { cx } from "../utils";

const MOBILE_MENU_ID = "portfolio-mobile-menu";
const MOBILE_MENU_TOGGLE_ID = "portfolio-mobile-menu-toggle";
const MENU_STRIPS = ["strip-one", "strip-two", "strip-three", "strip-four"];
const menuChapters = chapters.slice(1);

function getFocusableElements(menu: HTMLElement) {
	const toggle = document.getElementById(MOBILE_MENU_TOGGLE_ID);
	const menuLinks = Array.from(
		menu.querySelectorAll<HTMLElement>('a[href]:not([tabindex="-1"])'),
	);

	return [toggle, ...menuLinks].filter(
		(element): element is HTMLElement =>
			element instanceof HTMLElement &&
			!element.hasAttribute("disabled") &&
			element.getClientRects().length > 0,
	);
}

export function MobileMenu({
	menuOpen,
	setMenuOpen,
}: {
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
}) {
	const menuRef = useRef<HTMLElement>(null);
	const restoreFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const menu = menuRef.current;
		if (!menu) return;

		menu.inert = !menuOpen;
		if (!menuOpen) return;

		restoreFocusRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		const root = menu.closest(".portfolio-shell");
		const inertTargets = root
			? Array.from(
					root.querySelectorAll<HTMLElement>(":scope > main, :scope > footer"),
				)
			: [];
		const previousInert = inertTargets.map((element) => element.inert);
		inertTargets.forEach((element) => {
			element.inert = true;
		});

		const bodyOverflow = document.body.style.overflow;
		const bodyPaddingRight = document.body.style.paddingRight;
		const htmlOverflow = document.documentElement.style.overflow;
		const htmlOverscroll = document.documentElement.style.overscrollBehavior;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.style.overscrollBehavior = "none";

		if (scrollbarWidth > 0) {
			const currentPadding = Number.parseFloat(
				window.getComputedStyle(document.body).paddingRight,
			);
			document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
		}

		const toggle = document.getElementById(MOBILE_MENU_TOGGLE_ID);
		if (
			document.activeElement !== toggle &&
			!menu.contains(document.activeElement)
		) {
			toggle?.focus({ preventScroll: true });
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				setMenuOpen(false);
				return;
			}

			if (event.key !== "Tab") return;

			const focusable = getFocusableElements(menu);
			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			} else if (!focusable.includes(active as HTMLElement)) {
				event.preventDefault();
				first.focus();
			}
		};

		const desktopQuery = window.matchMedia("(min-width: 768px)");
		const closeAtDesktop = (event: MediaQueryListEvent) => {
			if (event.matches) setMenuOpen(false);
		};

		document.addEventListener("keydown", handleKeyDown);
		desktopQuery.addEventListener("change", closeAtDesktop);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			desktopQuery.removeEventListener("change", closeAtDesktop);
			document.body.style.overflow = bodyOverflow;
			document.body.style.paddingRight = bodyPaddingRight;
			document.documentElement.style.overflow = htmlOverflow;
			document.documentElement.style.overscrollBehavior = htmlOverscroll;
			inertTargets.forEach((element, index) => {
				element.inert = previousInert[index];
			});
			restoreFocusRef.current?.focus({ preventScroll: true });
			restoreFocusRef.current = null;
		};
	}, [menuOpen, setMenuOpen]);

	return (
		<nav
			ref={menuRef}
			id={MOBILE_MENU_ID}
			className={cx(
				"fixed inset-0 z-30 overflow-y-auto overscroll-contain text-paper transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] motion-reduce:transition-none md:hidden",
				menuOpen
					? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
					: "pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]",
			)}
			aria-labelledby="portfolio-mobile-menu-title"
			aria-hidden={!menuOpen}
		>
			<div
				className="pointer-events-none absolute inset-0 grid grid-cols-4"
				aria-hidden="true"
			>
				{MENU_STRIPS.map((strip, index) => (
					<span
						key={strip}
						className={cx(
							"h-full border-r border-[rgba(246,242,233,0.08)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] motion-reduce:delay-0 motion-reduce:transition-none last:border-r-0",
							index % 2 === 0
								? "origin-top bg-ink"
								: "origin-bottom bg-ink-soft",
							menuOpen ? "scale-y-100" : "scale-y-0",
						)}
						style={{
							transitionDelay: menuOpen
								? `${index * 55}ms`
								: `${(3 - index) * 35}ms`,
						}}
					/>
				))}
			</div>

			<div className="relative flex min-h-[100dvh] w-full flex-col px-pad-x pb-8 pt-[clamp(104px,16vh,148px)]">
				<div className="overflow-hidden">
					<h2
						id="portfolio-mobile-menu-title"
						className={cx(
							"font-mono text-[0.72rem] uppercase tracking-[0.14em] text-rebar transition-[transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:delay-0 motion-reduce:transition-none",
							menuOpen
								? "translate-y-0 opacity-100"
								: "-translate-y-[115%] opacity-0",
						)}
						style={{ transitionDelay: menuOpen ? "180ms" : "0ms" }}
					>
						Chapters / 01-06
					</h2>
				</div>

				<ul className="my-auto py-8">
					{menuChapters.map((chapter, index) => (
						<li key={chapter.id} className="relative">
							<span
								className={cx(
									"absolute inset-x-0 top-0 h-px origin-left bg-[rgba(246,242,233,0.16)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:delay-0 motion-reduce:transition-none",
									menuOpen ? "scale-x-100" : "scale-x-0",
								)}
								style={{
									transitionDelay: menuOpen ? `${160 + index * 45}ms` : "0ms",
								}}
								aria-hidden="true"
							/>
							<a
								href={`#${chapter.id}`}
								className="group block overflow-hidden py-[clamp(15px,2.5vh,22px)] focus-visible:outline-none"
								tabIndex={menuOpen ? 0 : -1}
								onClick={() => setMenuOpen(false)}
							>
								<span
									className={cx(
										"flex origin-left items-baseline gap-4 transition-[transform,opacity,color] duration-[850ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:text-rebar group-focus-visible:text-rebar motion-reduce:delay-0 motion-reduce:transition-none",
										menuOpen
											? "translate-y-0 rotate-0 opacity-100"
											: "translate-y-[115%] rotate-[3deg] opacity-0",
									)}
									style={{
										transitionDelay: menuOpen
											? `${220 + index * 65}ms`
											: `${(menuChapters.length - index - 1) * 25}ms`,
									}}
								>
									<span className="font-mono text-xs tracking-[0.14em] text-rebar">
										{chapter.num}
									</span>
									<span className="font-serif text-[clamp(2.55rem,12vw,4.8rem)] leading-none tracking-[-0.035em]">
										{chapter.label}
									</span>
								</span>
							</a>
							{index === menuChapters.length - 1 && (
								<span
									className={cx(
										"absolute inset-x-0 bottom-0 h-px origin-right bg-[rgba(246,242,233,0.16)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:delay-0 motion-reduce:transition-none",
										menuOpen ? "scale-x-100" : "scale-x-0",
									)}
									style={{
										transitionDelay: menuOpen ? "430ms" : "0ms",
									}}
									aria-hidden="true"
								/>
							)}
						</li>
					))}
				</ul>

				<div
					className={cx(
						"flex justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)] transition-[transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:delay-0 motion-reduce:transition-none",
						menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
					)}
					style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
				>
					<span>HCMC / VN</span>
					<span>UTC +7</span>
				</div>
			</div>
		</nav>
	);
}
