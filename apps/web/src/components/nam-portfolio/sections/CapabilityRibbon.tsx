import { useEffect, useRef } from "react";

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
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reducedMotion) return;

		let frame = 0;
		let lastFrameTime = 0;
		let lastScrollTime = performance.now();
		let lastScrollPosition = window.scrollY;
		let targetScrollVelocity = 0;
		let smoothScrollVelocity = 0;
		let offset = 0;
		let groupWidth =
			track.firstElementChild?.getBoundingClientRect().width ?? 1;
		let direction = -1;
		let hovered = false;
		let hoverFactor = 1;
		let visible = false;

		const measure = () => {
			groupWidth = track.firstElementChild?.getBoundingClientRect().width ?? 1;
		};

		const handleScroll = () => {
			const now = performance.now();
			const elapsed = Math.max(16, now - lastScrollTime) / 1000;
			const delta = window.scrollY - lastScrollPosition;
			targetScrollVelocity = delta / elapsed;
			if (Math.abs(delta) > 0.5) direction = delta > 0 ? -1 : 1;
			lastScrollPosition = window.scrollY;
			lastScrollTime = now;
		};

		const handlePointerEnter = () => {
			hovered = true;
		};

		const handlePointerLeave = () => {
			hovered = false;
		};

		const tick = (time: number) => {
			const deltaTime =
				lastFrameTime === 0 ? 0 : Math.min(32, time - lastFrameTime) / 1000;
			lastFrameTime = time;
			smoothScrollVelocity +=
				(targetScrollVelocity - smoothScrollVelocity) * 0.12;
			targetScrollVelocity *= 0.84;
			hoverFactor += ((hovered ? 0.12 : 1) - hoverFactor) * 0.08;

			const speedBoost = Math.min(180, Math.abs(smoothScrollVelocity) * 0.065);
			offset += direction * (29 + speedBoost) * hoverFactor * deltaTime;
			if (groupWidth > 0) {
				offset = ((offset % groupWidth) + groupWidth) % groupWidth;
				track.style.transform = `translate3d(${offset - groupWidth}px, 0, 0)`;
			}

			if (visible) {
				frame = window.requestAnimationFrame(tick);
			} else {
				frame = 0;
			}
		};

		const resizeObserver = new ResizeObserver(measure);
		const visibilityObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible && !frame) {
				lastFrameTime = 0;
				frame = window.requestAnimationFrame(tick);
			} else if (!visible && frame) {
				window.cancelAnimationFrame(frame);
				frame = 0;
			}
		});
		resizeObserver.observe(track);
		visibilityObserver.observe(track);
		window.addEventListener("scroll", handleScroll, { passive: true });
		track.addEventListener("pointerenter", handlePointerEnter);
		track.addEventListener("pointerleave", handlePointerLeave);
		measure();

		return () => {
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			window.removeEventListener("scroll", handleScroll);
			track.removeEventListener("pointerenter", handlePointerEnter);
			track.removeEventListener("pointerleave", handlePointerLeave);
			if (frame) window.cancelAnimationFrame(frame);
			track.style.removeProperty("transform");
		};
	}, []);

	return (
		<section
			className="relative z-[2] overflow-hidden border-y border-[rgba(246,242,233,0.14)] bg-ink text-paper"
			aria-label="Core capabilities"
		>
			<div
				ref={trackRef}
				className="flex w-max will-change-transform motion-reduce:translate-x-0 motion-reduce:[&>[aria-hidden=true]]:hidden"
			>
				<RibbonSet />
				<RibbonSet hidden />
			</div>
		</section>
	);
}
