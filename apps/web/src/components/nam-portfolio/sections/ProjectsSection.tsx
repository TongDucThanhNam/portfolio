import gsap from "gsap";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { SectionHead } from "../common";
import { projects } from "../data";
import { cx } from "../utils";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectPreview } from "./ProjectPreview";

const PREVIEW_WIDTH = 270;
const PREVIEW_HEIGHT = 214;
const PREVIEW_GUTTER = 24;

export function ProjectsSection() {
	const [activePreview, setActivePreview] = useState(0);
	const activePreviewRef = useRef(0);
	const previewVisibleRef = useRef(false);
	const previewRef = useRef<HTMLDivElement>(null);
	const canPreviewRef = useRef(false);
	const pointerXRef = useRef(0);
	const previewX = useRef<((value: number) => void) | null>(null);
	const previewY = useRef<((value: number) => void) | null>(null);
	const previewRotate = useRef<((value: number) => void) | null>(null);

	useEffect(() => {
		const preview = previewRef.current;
		if (!preview) return;

		const media = window.matchMedia(
			"(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
		);
		const syncCapability = () => {
			canPreviewRef.current = media.matches;
			if (!media.matches) {
				previewVisibleRef.current = false;
				gsap.set(preview, { autoAlpha: 0 });
			}
		};
		const hideForScroll = () => {
			if (!previewVisibleRef.current) return;
			previewVisibleRef.current = false;
			gsap.to(preview, {
				autoAlpha: 0,
				scale: 0.92,
				rotation: 0,
				duration: 0.2,
				ease: "power3.out",
				overwrite: "auto",
			});
		};

		syncCapability();
		media.addEventListener("change", syncCapability);
		gsap.set(preview, {
			autoAlpha: 0,
			scale: 0.92,
			transformOrigin: "top left",
		});
		previewX.current = gsap.quickTo(preview, "x", {
			duration: 0.5,
			ease: "power3.out",
		});
		previewY.current = gsap.quickTo(preview, "y", {
			duration: 0.5,
			ease: "power3.out",
		});
		previewRotate.current = gsap.quickTo(preview, "rotation", {
			duration: 0.7,
			ease: "power3.out",
		});
		window.addEventListener("scroll", hideForScroll, { passive: true });

		return () => {
			media.removeEventListener("change", syncCapability);
			window.removeEventListener("scroll", hideForScroll);
			gsap.killTweensOf(preview);
			previewX.current = null;
			previewY.current = null;
			previewRotate.current = null;
		};
	}, []);

	const showPreview = (index: number) => {
		activePreviewRef.current = index;
		setActivePreview(index);
		if (!canPreviewRef.current || !previewRef.current) return;

		previewVisibleRef.current = true;
		gsap.to(previewRef.current, {
			autoAlpha: 1,
			scale: 1,
			duration: 0.34,
			ease: "power3.out",
			overwrite: "auto",
		});
	};

	const movePreview = (
		event: ReactMouseEvent<HTMLAnchorElement>,
		index: number,
	) => {
		if (!canPreviewRef.current) return;
		if (!previewVisibleRef.current || activePreviewRef.current !== index) {
			showPreview(index);
		}

		const nextX = Math.min(
			event.clientX + PREVIEW_GUTTER,
			window.innerWidth - PREVIEW_WIDTH - PREVIEW_GUTTER,
		);
		const nextY = Math.min(
			event.clientY + PREVIEW_GUTTER,
			window.innerHeight - PREVIEW_HEIGHT - PREVIEW_GUTTER,
		);
		const velocity = event.clientX - pointerXRef.current;
		pointerXRef.current = event.clientX;

		previewX.current?.(Math.max(PREVIEW_GUTTER, nextX));
		previewY.current?.(Math.max(PREVIEW_GUTTER, nextY));
		previewRotate.current?.(gsap.utils.clamp(-3, 3, velocity * 0.08));
	};

	const hidePreview = () => {
		if (!canPreviewRef.current || !previewRef.current) return;

		previewVisibleRef.current = false;
		previewRotate.current?.(0);
		gsap.to(previewRef.current, {
			autoAlpha: 0,
			scale: 0.92,
			duration: 0.26,
			ease: "power3.out",
			overwrite: "auto",
		});
	};

	return (
		<section id="projects" className="section-pad bg-bone">
			<SectionHead num="05" title="Selected Work" detail="2024 - 2026" />
			<div className="projects-list border-t border-line">
				{projects.map((project, index) => (
					<a
						key={project.name}
						href={project.href}
						target="_blank"
						rel="noreferrer"
						className="project-row group grid grid-cols-[42px_1fr_44px] items-center gap-4 border-b border-line py-7 transition-[opacity,border-color,padding] duration-500 hover:border-[rgba(184,66,46,0.4)] hover:pl-6 sm:grid-cols-[56px_1fr_44px]"
						data-cursor-label={project.cursor}
						onMouseEnter={() => showPreview(index)}
						onMouseMove={(event) => movePreview(event, index)}
						onMouseLeave={hidePreview}
					>
						<span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="min-w-0">
							<span className="flex flex-wrap items-center gap-4">
								<span className="font-serif text-[clamp(1.55rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.03em] transition duration-500 group-hover:translate-x-2 group-hover:text-rebar">
									{project.name}
								</span>
								<ProjectBadge project={project} />
							</span>
							<span className="mt-2 block max-w-3xl text-[0.95rem] leading-6 text-ink-soft">
								{project.proof}
							</span>
							<span className="mt-3 flex flex-wrap items-center gap-3">
								<span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
									{project.type}
								</span>
								<span className="flex flex-wrap gap-1.5">
									{project.stack.map((item) => (
										<span key={item} className="chip">
											{item}
										</span>
									))}
								</span>
								<span className="ml-auto font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
									{project.year}
								</span>
							</span>
						</span>
						<span className="project-arrow" aria-hidden="true" />
					</a>
				))}
			</div>

			<div
				ref={previewRef}
				className="project-preview-sheet pointer-events-none fixed left-0 top-0 z-[60] hidden h-[214px] w-[270px] overflow-hidden border border-line bg-paper p-5 text-ink shadow-sheet md:block"
				aria-hidden="true"
			>
				{projects.map((project, index) => (
					<div
						key={project.name}
						className={cx(
							"project-preview-layer absolute inset-0 flex flex-col p-5",
							index === activePreview && "is-active",
						)}
					>
						<div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-soft">
							<span>{String(index + 1).padStart(2, "0")} / 04</span>
							<span>{project.status}</span>
						</div>
						<div className="project-preview-art min-h-0 flex-1 pt-2">
							<ProjectPreview index={index} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
