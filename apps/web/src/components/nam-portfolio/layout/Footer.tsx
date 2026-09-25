export function Footer() {
	return (
		<footer className="relative bg-ink px-pad-x py-8 text-paper max-md:pb-24">
			<div className="flex flex-wrap items-center justify-between gap-5 font-mono text-[0.55rem] uppercase leading-6 tracking-[0.1em] text-paper/65">
				<p>© 2026 Tong Duc Thanh Nam</p>
				<p className="hidden sm:block">Made with care. Built with intent.</p>
				<a
					href="#hero"
					className="inline-flex min-h-11 items-center gap-5 transition-colors hover:text-paper"
					aria-label="Back to top"
				>
					Back to top <span aria-hidden="true">↑</span>
				</a>
			</div>
		</footer>
	);
}
