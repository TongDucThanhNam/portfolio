import { useEffect, useRef } from "react";

const SPRING_STIFFNESS = 0.11;
const SPRING_DAMPING = 0.76;

export function ElasticRule() {
	const svgRef = useRef<SVGSVGElement>(null);
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const svg = svgRef.current;
		const path = pathRef.current;
		const hitArea = svg?.parentElement;

		if (!svg || !path || !hitArea) return;

		let width = 0;
		let height = 0;
		let controlX = 0;
		let controlY = 0;
		let velocityX = 0;
		let velocityY = 0;
		let grabbed = false;
		let frame = 0;

		const updatePath = () => {
			const middle = height / 2;
			path.setAttribute(
				"d",
				`M0 ${middle} Q${controlX} ${controlY} ${width} ${middle}`,
			);
		};

		const measure = () => {
			const bounds = svg.getBoundingClientRect();
			width = bounds.width;
			height = bounds.height;
			controlX = width / 2;
			controlY = height / 2;
			svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
			updatePath();
		};

		const springBack = () => {
			const targetX = width / 2;
			const targetY = height / 2;
			velocityX =
				(velocityX + (targetX - controlX) * SPRING_STIFFNESS) * SPRING_DAMPING;
			velocityY =
				(velocityY + (targetY - controlY) * SPRING_STIFFNESS) * SPRING_DAMPING;
			controlX += velocityX;
			controlY += velocityY;
			updatePath();

			if (
				Math.abs(targetX - controlX) < 0.08 &&
				Math.abs(targetY - controlY) < 0.08 &&
				Math.abs(velocityX) < 0.08 &&
				Math.abs(velocityY) < 0.08
			) {
				controlX = targetX;
				controlY = targetY;
				velocityX = 0;
				velocityY = 0;
				svg.dataset.elasticActive = "false";
				updatePath();
				frame = 0;
				return;
			}

			frame = window.requestAnimationFrame(springBack);
		};

		const release = () => {
			if (!grabbed) return;
			grabbed = false;
			if (!frame) frame = window.requestAnimationFrame(springBack);
		};

		const handlePointerMove = (event: PointerEvent) => {
			const bounds = svg.getBoundingClientRect();
			const localX = event.clientX - bounds.left;
			const localY = event.clientY - bounds.top;
			const distance = Math.abs(localY - height / 2);

			if (localX < 0 || localX > width || distance > 34) {
				release();
				return;
			}

			if (!grabbed && distance > 11) return;
			grabbed = true;
			if (frame) {
				window.cancelAnimationFrame(frame);
				frame = 0;
			}
			controlX = localX;
			controlY = height / 2 + (localY - height / 2) * 2.2;
			velocityX = 0;
			velocityY = 0;
			svg.dataset.elasticActive = "true";
			updatePath();
		};

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const finePointer = window.matchMedia("(pointer: fine)").matches;
		const resizeObserver = new ResizeObserver(measure);
		resizeObserver.observe(svg);
		measure();

		if (!reducedMotion && finePointer) {
			hitArea.addEventListener("pointermove", handlePointerMove);
			hitArea.addEventListener("pointerleave", release);
		}

		return () => {
			resizeObserver.disconnect();
			hitArea.removeEventListener("pointermove", handlePointerMove);
			hitArea.removeEventListener("pointerleave", release);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<svg
			ref={svgRef}
			className="pointer-events-none absolute -bottom-8 left-0 h-16 w-full overflow-visible"
			viewBox="0 0 100 64"
			data-elastic-active="false"
			aria-hidden="true"
		>
			<path
				ref={pathRef}
				className="fill-none stroke-line transition-colors duration-300 [[data-elastic-active=true]_&]:stroke-rebar"
				d="M0 32 Q50 32 100 32"
				strokeWidth="1"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}
