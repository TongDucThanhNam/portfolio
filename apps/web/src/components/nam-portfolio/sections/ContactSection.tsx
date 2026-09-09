import { useEffect, useRef } from "react";

import {
	labelAccentClass,
	labelRuleClass,
	magneticTargetClass,
	sectionPadClass,
} from "../styles";
import { cx } from "../utils";
import { DirectionalHoverText } from "../visuals/DirectionalHoverText";
import { ScrollWordReveal } from "../visuals/ScrollWordReveal";
import { ContactBlock } from "./ContactBlock";

export function ContactSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const progressRef = useRef<HTMLSpanElement>(null);
	const progressLabelRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const progressBar = progressRef.current;
		const progressLabel = progressLabelRef.current;

		if (!section || !progressBar || !progressLabel) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (reducedMotion) {
			section.dataset.closingState = "open";
			progressBar.style.transform = "scaleX(1)";
			progressLabel.textContent = "100%";
			return;
		}

		let frame = 0;
		let visible = false;

		const update = () => {
			frame = 0;
			if (!visible) return;

			const bounds = section.getBoundingClientRect();
			const revealRange = window.innerHeight * 0.72;
			const progress = Math.max(
				0,
				Math.min(1, (window.innerHeight - bounds.top) / revealRange),
			);

			progressBar.style.transform = `scaleX(${progress})`;
			progressLabel.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;
			section.dataset.closingState = progress >= 0.58 ? "open" : "pending";
		};

		const scheduleUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) scheduleUpdate();
		});

		section.dataset.closingState = "pending";
		visibilityObserver.observe(section);
		window.addEventListener("scroll", scheduleUpdate, { passive: true });
		window.addEventListener("resize", scheduleUpdate);

		return () => {
			visibilityObserver.disconnect();
			window.removeEventListener("scroll", scheduleUpdate);
			window.removeEventListener("resize", scheduleUpdate);
			if (frame) window.cancelAnimationFrame(frame);
			delete section.dataset.closingState;
			progressBar.style.removeProperty("transform");
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="relative overflow-hidden bg-ink text-paper"
		>
			<div
				className="sticky top-0 z-20 h-1 overflow-hidden bg-[rgba(246,242,233,0.12)]"
				aria-hidden="true"
			>
				<span
					ref={progressRef}
					className="block h-full w-full origin-left scale-x-0 bg-rebar will-change-transform"
				/>
			</div>

			<div className="pointer-events-none absolute inset-0">
				<div
					className="absolute inset-0 bg-[linear-gradient(rgba(246,242,233,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,233,0.035)_1px,transparent_1px)] bg-size-[48px_48px] opacity-30"
					aria-hidden="true"
				/>
				<div className="absolute -right-[0.04em] -bottom-[0.2em] font-serif text-[clamp(10rem,27vw,29rem)] leading-none tracking-[-0.08em] text-[rgba(246,242,233,0.045)]">
					06
				</div>
			</div>

			<div
				className={cx(
					sectionPadClass,
					"z-10 translate-y-0 opacity-100 transition-[opacity,transform] duration-1000 ease-fluid [[data-closing-state=pending]_&]:translate-y-14 [[data-closing-state=pending]_&]:opacity-35 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
				)}
			>
				<div className="flex flex-wrap items-center justify-between gap-4">
					<p className={cx(labelAccentClass, "!text-paper")} data-reveal="rise">
						<span className={labelRuleClass} />
						Let's talk
					</p>
					<p
						className="flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-[rgba(246,242,233,0.55)]"
						data-reveal="rise"
						aria-hidden="true"
					>
						<span className="h-px w-8 bg-rebar" />
						Closing signal /{" "}
						<strong ref={progressLabelRef} className="font-normal text-rebar">
							000%
						</strong>
					</p>
				</div>
				<ScrollWordReveal
					as="h2"
					className="mt-8 max-w-[11em] font-serif text-[clamp(3.8rem,10vw,10rem)] leading-[0.9] tracking-[-0.04em]"
					segments={[
						{ text: "Have a workflow worth turning into a" },
						{ text: "product?", accent: true },
					]}
				/>

				<a
					href="mailto:tongducthanhnam@gmail.com"
					className="group mt-[clamp(48px,8vw,112px)] grid gap-6 border-y border-[rgba(246,242,233,0.18)] py-8 transition-colors hover:border-rebar md:grid-cols-[0.42fr_1fr_auto] md:items-center"
					data-reveal="rise"
				>
					<DirectionalHoverText
						text="Start a conversation"
						className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-rebar"
					/>
					<span className="min-w-0 break-all font-serif text-[clamp(1.45rem,3.2vw,3.8rem)] leading-none tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2">
						tongducthanhnam@gmail.com
					</span>
					<span
						className={cx(
							magneticTargetClass,
							"grid h-14 w-14 place-items-center rounded-full border border-[rgba(246,242,233,0.24)] font-serif text-2xl transition duration-500 group-hover:border-rebar group-hover:bg-rebar group-hover:text-ink md:h-20 md:w-20",
						)}
						aria-hidden="true"
						data-magnetic
					>
						↗
					</span>
				</a>

				<div
					className="mt-12 grid gap-x-12 border-b border-[rgba(246,242,233,0.18)] pb-2 lg:grid-cols-2"
					data-reveal="rise"
				>
					<ContactBlock label="Phone">
						<a href="tel:+84869887363" className="transition hover:text-rebar">
							+84 869 887 363
						</a>
					</ContactBlock>
					<ContactBlock label="Based">
						Ho Chi Minh City, Vietnam / UTC +7
					</ContactBlock>
					<ContactBlock label="Elsewhere">
						<a
							href="https://github.com/TongDucThanhNam"
							target="_blank"
							rel="noreferrer"
							className="transition hover:text-rebar"
						>
							GitHub ↗
						</a>
						{" / "}
						<a
							href="https://tongducthanhnam.id.vn"
							target="_blank"
							rel="noreferrer"
							className="transition hover:text-rebar"
						>
							Portfolio ↗
						</a>
					</ContactBlock>
					<ContactBlock label="Full profile">
						<a
							href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
							target="_blank"
							rel="noreferrer"
							className="border-b border-rebar transition hover:text-rebar"
						>
							Open CV ↗
						</a>
					</ContactBlock>
				</div>

				<div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)]">
					<span>AI products / extensions / automation / full-stack</span>
					<span>Available for thoughtful work</span>
				</div>
			</div>
		</section>
	);
}
