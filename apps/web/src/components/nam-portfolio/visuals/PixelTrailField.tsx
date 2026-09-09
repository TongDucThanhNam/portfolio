import { useEffect, useRef } from "react";

type TrailCell = {
	bornAt: number;
	column: number;
	row: number;
};

const CELL_SIZE = 32;
const FADE_DURATION = 720;

export function PixelTrailField() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const surface = canvas?.parentElement;
		const context = canvas?.getContext("2d");

		if (!canvas || !surface || !context) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const finePointer = window.matchMedia("(pointer: fine)").matches;
		if (reducedMotion || !finePointer) return;

		const cells = new Map<string, TrailCell>();
		let frame = 0;
		let width = 0;
		let height = 0;
		let previousCell: { column: number; row: number } | undefined;

		const resize = () => {
			const rect = surface.getBoundingClientRect();
			const density = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.max(1, Math.round(width * density));
			canvas.height = Math.max(1, Math.round(height * density));
			context.setTransform(density, 0, 0, density, 0, 0);
			context.clearRect(0, 0, width, height);
		};

		const draw = (time: number) => {
			frame = 0;
			context.clearRect(0, 0, width, height);

			for (const [key, cell] of cells) {
				const progress = (time - cell.bornAt) / FADE_DURATION;
				if (progress >= 1) {
					cells.delete(key);
					continue;
				}

				const alpha = (1 - progress) ** 2 * 0.24;
				const inset = 1.25 + progress * 4;
				context.fillStyle = `rgba(184, 66, 46, ${alpha})`;
				context.fillRect(
					cell.column * CELL_SIZE + inset,
					cell.row * CELL_SIZE + inset,
					CELL_SIZE - inset * 2,
					CELL_SIZE - inset * 2,
				);
			}

			if (cells.size > 0) {
				frame = window.requestAnimationFrame(draw);
			}
		};

		const requestDraw = () => {
			if (!frame) frame = window.requestAnimationFrame(draw);
		};

		const lightCell = (column: number, row: number, bornAt: number) => {
			if (
				column < 0 ||
				row < 0 ||
				column * CELL_SIZE > width ||
				row * CELL_SIZE > height
			) {
				return;
			}

			cells.set(`${column}:${row}`, { column, row, bornAt });
		};

		const handlePointerMove = (event: PointerEvent) => {
			const rect = surface.getBoundingClientRect();
			const column = Math.floor((event.clientX - rect.left) / CELL_SIZE);
			const row = Math.floor((event.clientY - rect.top) / CELL_SIZE);
			const bornAt = performance.now();

			if (previousCell) {
				const distance = Math.max(
					Math.abs(column - previousCell.column),
					Math.abs(row - previousCell.row),
				);

				for (let step = 1; step < distance; step += 1) {
					const progress = step / distance;
					lightCell(
						Math.round(
							previousCell.column + (column - previousCell.column) * progress,
						),
						Math.round(previousCell.row + (row - previousCell.row) * progress),
						bornAt - (distance - step) * 8,
					);
				}
			}

			lightCell(column, row, bornAt);
			previousCell = { column, row };
			requestDraw();
		};

		const resetPointer = () => {
			previousCell = undefined;
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(surface);
		resize();
		surface.addEventListener("pointermove", handlePointerMove);
		surface.addEventListener("pointerleave", resetPointer);

		return () => {
			resizeObserver.disconnect();
			surface.removeEventListener("pointermove", handlePointerMove);
			surface.removeEventListener("pointerleave", resetPointer);
			if (frame) window.cancelAnimationFrame(frame);
			cells.clear();
			context.clearRect(0, 0, width, height);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 -z-[5] h-full w-full"
		/>
	);
}
