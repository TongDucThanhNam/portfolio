import { useState } from "react";

import type { Project } from "../types";

/** A real image slot. Replace preview.src in data.ts when screenshots are ready. */
export function ProjectCanvas({ project }: { project: Project }) {
	const [failedSource, setFailedSource] = useState<string>();
	const preview = project.preview;
	const showImage = preview && failedSource !== preview.src;

	return (
		<div
			className="relative aspect-[16/10] overflow-hidden bg-bone-deep"
			data-image-frame
		>
			{!showImage && (
				<div
					className="absolute inset-0 grid place-content-center text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-soft"
					role="img"
					aria-label={`Website screenshot placeholder for ${project.name}`}
				>
					<span className="mb-4 text-3xl font-light" aria-hidden="true">
						+
					</span>
					Website preview
					<span className="mt-2 text-[0.55rem] text-muted">
						Image placeholder
					</span>
				</div>
			)}
			{showImage && (
				<div className="absolute inset-0" data-image-layer>
					<img
						src={preview.src}
						alt={preview.alt}
						width={1600}
						height={1000}
						loading="lazy"
						decoding="async"
						onError={() => setFailedSource(preview.src)}
						className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-fluid group-hover/project:scale-[1.035] group-focus-within/project:scale-[1.035] motion-reduce:transform-none"
					/>
				</div>
			)}
		</div>
	);
}
