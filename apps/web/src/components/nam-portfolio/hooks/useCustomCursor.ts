import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useCustomCursor() {
	const ringRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ring = ringRef.current;
		const dot = dotRef.current;
		const labelElement = labelRef.current;
		if (!ring || !dot || !labelElement) return;

		const capability = window.matchMedia(
			"(pointer: fine) and (prefers-reduced-motion: no-preference)",
		);
		const ringX = gsap.quickTo(ring, "x", {
			duration: 0.46,
			ease: "power3.out",
		});
		const ringY = gsap.quickTo(ring, "y", {
			duration: 0.46,
			ease: "power3.out",
		});
		const dotX = gsap.quickTo(dot, "x", {
			duration: 0.08,
			ease: "none",
		});
		const dotY = gsap.quickTo(dot, "y", {
			duration: 0.08,
			ease: "none",
		});
		const labelX = gsap.quickTo(labelElement, "x", {
			duration: 0.24,
			ease: "power3.out",
		});
		const labelY = gsap.quickTo(labelElement, "y", {
			duration: 0.24,
			ease: "power3.out",
		});

		const hide = () => {
			document.body?.classList.remove(
				"is-cursor-visible",
				"is-cursor-active",
				"is-cursor-sticky",
			);
			labelElement.style.opacity = "0";
		};

		const move = (event: MouseEvent) => {
			if (!capability.matches) {
				hide();
				return;
			}

			const target = event.target instanceof Element ? event.target : null;
			const interactive = target?.closest<HTMLElement>(
				"[data-cursor-label], a, button, input, textarea",
			);
			const stickyTarget = target?.closest<HTMLElement>("[data-cursor-stick]");
			const label = interactive?.dataset.cursorLabel ?? "";
			let ringTargetX = event.clientX;
			let ringTargetY = event.clientY;

			if (stickyTarget) {
				const bounds = stickyTarget.getBoundingClientRect();
				const centerX = bounds.left + bounds.width / 2;
				const centerY = bounds.top + bounds.height / 2;
				ringTargetX = centerX + (event.clientX - centerX) * 0.12;
				ringTargetY = centerY + (event.clientY - centerY) * 0.12;
			}

			document.body?.classList.add("is-cursor-visible");
			document.body?.classList.toggle("is-cursor-active", Boolean(interactive));
			document.body?.classList.toggle(
				"is-cursor-sticky",
				Boolean(stickyTarget),
			);

			ringX(ringTargetX);
			ringY(ringTargetY);
			dotX(event.clientX);
			dotY(event.clientY);
			labelX(event.clientX + 18);
			labelY(event.clientY + 18);
			labelElement.textContent = label;
			labelElement.style.opacity = label ? "1" : "0";
		};

		const syncCapability = () => {
			if (!capability.matches) hide();
		};

		window.addEventListener("mousemove", move, { passive: true });
		window.addEventListener("mouseleave", hide);
		capability.addEventListener("change", syncCapability);

		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseleave", hide);
			capability.removeEventListener("change", syncCapability);
			gsap.killTweensOf([ring, dot, labelElement]);
			hide();
		};
	}, []);

	return { ringRef, dotRef, labelRef };
}
