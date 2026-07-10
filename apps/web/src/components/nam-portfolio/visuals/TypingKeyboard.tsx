import type { CSSProperties, HTMLAttributes } from "react";
import { memo, useEffect, useRef, useState } from "react";

import { cx } from "../utils";
import { TypingKeyboardKey } from "./TypingKeyboardKey";
import { TypingKeyboardScreen } from "./TypingKeyboardScreen";
import { KEY_ROWS, keyIdForCharacter } from "./typingKeyboardData";

export interface TypingKeyboardProps extends HTMLAttributes<HTMLDivElement> {
	autoTypeText?: string;
	typingSpeed?: [number, number];
	scale?: number;
	accentColor?: string;
	secondaryAccent?: string;
}

const DEFAULT_AUTO_TYPE_TEXT =
	"SWE FOUND: THANH NAM. SHIPS AI PRODUCTS. REACT EDGE STREAM UX.       ";
const DEFAULT_TYPING_SPEED: [number, number] = [42, 106];
const SCREEN_WINDOW = 128;
const DESKTOP_WORKSTATION_QUERY = "(min-width: 64rem)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type TypingPhase = "initial" | "typing" | "hold" | "restart";

type TypingKeyboardStyle = CSSProperties & {
	"--tk-scale": number;
	"--tk-accent": string;
	"--tk-secondary": string;
};

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const updateMatch = () => setMatches(mediaQuery.matches);

		updateMatch();
		mediaQuery.addEventListener("change", updateMatch);
		return () => mediaQuery.removeEventListener("change", updateMatch);
	}, [query]);

	return matches;
}

function TypingKeyboardComponent({
	className,
	autoTypeText = DEFAULT_AUTO_TYPE_TEXT,
	typingSpeed = DEFAULT_TYPING_SPEED,
	scale = 0.76,
	accentColor = "var(--rebar)",
	secondaryAccent = "var(--rebar)",
	style,
	...props
}: TypingKeyboardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const typingIndexRef = useRef(0);
	const typingPhaseRef = useRef<TypingPhase>("initial");
	const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
	const hasCoarsePointer = useMediaQuery(COARSE_POINTER_QUERY);
	const isDesktopViewport = useMediaQuery(DESKTOP_WORKSTATION_QUERY);
	const canAnimate =
		isDesktopViewport && !hasCoarsePointer && !prefersReducedMotion;
	const [isInViewport, setIsInViewport] = useState(false);
	const [isDocumentVisible, setIsDocumentVisible] = useState(() =>
		typeof document === "undefined" ? true : !document.hidden,
	);
	const isPlaying = canAnimate && isInViewport && isDocumentVisible;
	const [screenText, setScreenText] = useState(() =>
		canAnimate ? "" : autoTypeText.trim(),
	);
	const [activeKey, setActiveKey] = useState<string | null>(null);
	const minimumTypingSpeed = typingSpeed[0];
	const maximumTypingSpeed = typingSpeed[1];

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;

		if (!("IntersectionObserver" in window)) {
			setIsInViewport(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => setIsInViewport(entry?.isIntersecting ?? false),
			{ threshold: 0.01 },
		);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updateVisibility = () => setIsDocumentVisible(!document.hidden);

		document.addEventListener("visibilitychange", updateVisibility);
		return () =>
			document.removeEventListener("visibilitychange", updateVisibility);
	}, []);

	useEffect(() => {
		typingIndexRef.current = 0;
		typingPhaseRef.current = "initial";
		setActiveKey(null);
		setScreenText(canAnimate ? "" : autoTypeText.trim());
	}, [autoTypeText, canAnimate]);

	useEffect(() => {
		if (!canAnimate || !isPlaying || autoTypeText.length === 0) {
			setActiveKey(null);
			return;
		}

		let alive = true;
		let typingTimer: number | undefined;
		let releaseTimer: number | undefined;

		const scheduleTyping = (callback: () => void, delay: number) => {
			typingTimer = window.setTimeout(callback, delay);
		};

		const beginTyping = () => {
			if (!alive) return;
			typingPhaseRef.current = "typing";
			typeNext();
		};

		const resetCycle = () => {
			if (!alive) return;
			setScreenText("");
			setActiveKey(null);
			typingIndexRef.current = 0;
			typingPhaseRef.current = "restart";
			scheduleTyping(beginTyping, 900);
		};

		const holdCompletedText = () => {
			typingPhaseRef.current = "hold";
			scheduleTyping(resetCycle, 1900);
		};

		function typeNext() {
			if (!alive) return;

			const char = autoTypeText[typingIndexRef.current];
			if (char === undefined) {
				holdCompletedText();
				return;
			}

			const keyId = keyIdForCharacter(char);

			setActiveKey(keyId);
			setScreenText((current) => `${current}${char}`.slice(-SCREEN_WINDOW));

			if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
			releaseTimer = window.setTimeout(() => {
				if (alive) setActiveKey(null);
			}, 80);

			typingIndexRef.current += 1;
			if (typingIndexRef.current >= autoTypeText.length) {
				holdCompletedText();
				return;
			}

			const delay =
				minimumTypingSpeed +
				Math.random() * (maximumTypingSpeed - minimumTypingSpeed);
			scheduleTyping(typeNext, delay);
		}

		switch (typingPhaseRef.current) {
			case "typing":
				scheduleTyping(typeNext, minimumTypingSpeed);
				break;
			case "hold":
				scheduleTyping(resetCycle, 1900);
				break;
			case "restart":
				scheduleTyping(beginTyping, 900);
				break;
			default:
				scheduleTyping(beginTyping, 700);
		}

		return () => {
			alive = false;
			if (typingTimer !== undefined) window.clearTimeout(typingTimer);
			if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
		};
	}, [
		autoTypeText,
		canAnimate,
		isPlaying,
		maximumTypingSpeed,
		minimumTypingSpeed,
	]);

	return (
		<div
			{...props}
			className={cx("tk-container", className)}
			data-animation-state={isPlaying ? "running" : "paused"}
			ref={containerRef}
			style={
				{
					...style,
					"--tk-scale": scale,
					"--tk-accent": accentColor,
					"--tk-secondary": secondaryAccent,
				} as TypingKeyboardStyle
			}
		>
			<style>{`
				.tk-container,
				.tk-container * {
					transform-style: preserve-3d;
					box-sizing: border-box;
				}

				.tk-container {
					--tk-responsive-scale: 1;
					--tk-paper: var(--paper);
					--tk-bone: var(--bone);
					--tk-bone-deep: var(--bone-deep);
					--tk-ink: var(--ink);
					--tk-ink-soft: var(--ink-soft);
					--tk-muted: var(--muted);
					--tk-line: var(--line);
					--tk-steel: var(--steel);
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-family: "Space Mono", ui-monospace, monospace;
					font-weight: 700;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					pointer-events: none;
				}

				.tk-container[data-animation-state="paused"] .tk-screen__panel,
				.tk-container[data-animation-state="paused"] .tk-screen__panel::after {
					animation-play-state: paused;
				}

				.tk-main {
					position: relative;
					width: 800px;
					height: 600px;
					transform: scale(var(--tk-scale)) scale(var(--tk-responsive-scale));
					transform-origin: center center;
				}

				@media (min-width: 1024px) and (max-width: 1279.98px) {
					.tk-container {
						--tk-responsive-scale: 0.68;
					}
				}

				@media (min-width: 1280px) and (max-width: 1535.98px) {
					.tk-container {
						--tk-responsive-scale: 0.82;
					}
				}

				@media (min-width: 1536px) {
					.tk-container.tk-flex {
						justify-content: flex-start;
					}

					.tk-main {
						transform-origin: left center;
					}

				}

				.tk-flex {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.tk-face {
					position: absolute;
					display: block;
					overflow: hidden;
				}

				.tk-floor-shadow {
					position: absolute;
					left: 118px;
					top: 366px;
					width: 612px;
					height: 154px;
					border-radius: 999px;
					background:
						radial-gradient(ellipse at 58% 48%, rgba(22, 20, 15, 0.2), transparent 63%),
						radial-gradient(ellipse at 28% 42%, color-mix(in srgb, var(--tk-accent) 16%, transparent), transparent 58%);
					filter: blur(18px);
					opacity: 0.74;
					transform: rotateZ(-9deg) translateZ(-64px);
				}

				.tk-keyboard {
					position: absolute;
					left: 150px;
					top: 252px;
					width: 500px;
					height: 160px;
					transform: perspective(10000px) rotateX(60deg) rotateZ(-35deg);
				}

				.tk-keyboard__front {
					width: 500px;
					height: 25px;
					transform: rotateX(-90deg) translateZ(80px);
					background: linear-gradient(to bottom, var(--tk-bone), color-mix(in srgb, var(--tk-muted) 42%, var(--tk-bone-deep)));
				}

				.tk-keyboard__back {
					width: 500px;
					height: 25px;
					transform: rotateX(90deg) translateZ(80px);
					background: linear-gradient(to bottom, var(--tk-paper), var(--tk-bone));
				}

				.tk-keyboard__right {
					width: 25px;
					height: 160px;
					transform: rotateY(90deg) translateZ(250px);
					background: linear-gradient(to right, var(--tk-paper), var(--tk-bone));
				}

				.tk-keyboard__left {
					width: 25px;
					height: 160px;
					transform: rotateY(90deg) translateZ(-250px);
					background: linear-gradient(to right, var(--tk-bone), color-mix(in srgb, var(--tk-muted) 34%, var(--tk-bone-deep)));
				}

				.tk-keyboard__top {
					width: 500px;
					height: 160px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 4px 3px;
					transform: rotateY(0deg) translateZ(12.5px);
					border: 1px solid color-mix(in srgb, var(--tk-line) 76%, transparent);
					border-radius: 5px;
					background:
						linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(246, 242, 233, 0.76) 44%, rgba(230, 223, 209, 0.82)),
						var(--tk-paper);
					box-shadow:
						inset 1px 1px 0 rgba(255, 255, 255, 0.9),
						inset -10px -9px 18px rgba(22, 20, 15, 0.055),
						0 14px 24px rgba(22, 20, 15, 0.11);
				}

				.tk-keyboard__bottom {
					width: 500px;
					height: 160px;
					transform: rotateY(180deg) translateZ(12.5px);
					background: var(--tk-bone-deep);
				}

				.tk-keys {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 0 2px;
					transform: translateZ(4px);
				}

				.tk-key {
					position: relative;
					width: 30px;
					height: 27px;
					transition:
						transform 70ms var(--ease),
						filter 70ms var(--ease);
				}

				.tk-key--w2 {
					width: 60px;
				}

				.tk-key--w3 {
					width: 90px;
				}

				.tk-key--w6 {
					width: 195px;
				}

				.tk-key__front {
					width: 30px;
					height: 8px;
					transform: rotateX(-90deg) translateZ(13.5px);
					background: color-mix(in srgb, var(--tk-muted) 52%, var(--tk-bone-deep));
				}

				.tk-key__front--w2 {
					width: 60px;
				}

				.tk-key__front--w3 {
					width: 90px;
				}

				.tk-key__front--w6 {
					width: 195px;
				}

				.tk-key__back {
					width: 30px;
					height: 8px;
					transform: rotateX(90deg) translateZ(13.5px);
					background: color-mix(in srgb, var(--tk-paper) 86%, white);
				}

				.tk-key__back--w2 {
					width: 60px;
				}

				.tk-key__back--w3 {
					width: 90px;
				}

				.tk-key__back--w6 {
					width: 195px;
				}

				.tk-key__right {
					width: 8px;
					height: 27px;
					transform: rotateY(90deg) translateZ(15px);
					background: linear-gradient(to right, var(--tk-bone), color-mix(in srgb, var(--tk-muted) 44%, var(--tk-bone)));
				}

				.tk-key__right--w2 {
					transform: rotateY(90deg) translateZ(30px);
				}

				.tk-key__right--w3 {
					transform: rotateY(90deg) translateZ(45px);
				}

				.tk-key__right--w6 {
					transform: rotateY(90deg) translateZ(97.5px);
				}

				.tk-key__left {
					width: 8px;
					height: 27px;
					transform: rotateY(90deg) translateZ(-15px);
					background: linear-gradient(to bottom, color-mix(in srgb, var(--tk-paper) 70%, var(--tk-bone)), var(--tk-bone));
				}

				.tk-key__left--w2 {
					transform: rotateY(90deg) translateZ(-30px);
				}

				.tk-key__left--w3 {
					transform: rotateY(90deg) translateZ(-45px);
				}

				.tk-key__left--w6 {
					transform: rotateY(90deg) translateZ(-97.5px);
				}

				.tk-key__top {
					width: 30px;
					height: 27px;
					transform: rotateY(0deg) translateZ(4px);
					border: 1px solid color-mix(in srgb, var(--tk-line) 78%, transparent);
					border-radius: 3px;
					background:
						linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(246, 242, 233, 0.88) 45%, rgba(230, 223, 209, 0.9)),
						var(--tk-paper);
					box-shadow:
						inset 1px 1px 0 rgba(255, 255, 255, 0.92),
						inset -1px -2px 0 rgba(22, 20, 15, 0.05),
						0 3px 5px rgba(22, 20, 15, 0.08);
				}

				.tk-key__top--w2 {
					width: 60px;
				}

				.tk-key__top--w3 {
					width: 90px;
				}

				.tk-key__top--w6 {
					width: 195px;
				}

				.tk-key__top span {
					position: absolute;
					inset: 0;
					display: grid;
					place-items: center;
					padding: 0 2px;
					color: var(--tk-ink-soft);
					font-size: 8.5px;
					font-weight: 800;
					line-height: 1;
					letter-spacing: 0.018em;
					white-space: nowrap;
				}

				.tk-key__bottom {
					width: 30px;
					height: 27px;
					transform: rotateY(180deg) translateZ(4px);
					background: color-mix(in srgb, var(--tk-muted) 48%, var(--tk-bone-deep));
				}

				.tk-key__bottom--w2 {
					width: 60px;
				}

				.tk-key__bottom--w3 {
					width: 90px;
				}

				.tk-key__bottom--w6 {
					width: 195px;
				}

				.tk-key--accent .tk-key__top,
				.tk-key--secondary .tk-key__top {
					border-color: color-mix(in srgb, var(--tk-accent) 68%, var(--tk-ink));
					background:
						linear-gradient(145deg, color-mix(in srgb, var(--tk-accent) 88%, var(--tk-paper)), color-mix(in srgb, var(--tk-accent) 70%, var(--tk-ink)) 90%),
						var(--tk-accent);
					box-shadow:
						inset 1px 1px 0 rgba(246, 242, 233, 0.2),
						inset -2px -3px 0 rgba(22, 20, 15, 0.13),
						0 4px 7px color-mix(in srgb, var(--tk-accent) 22%, transparent);
				}

				.tk-key--secondary .tk-key__top {
					background:
						linear-gradient(145deg, color-mix(in srgb, var(--tk-secondary) 86%, var(--tk-paper)), color-mix(in srgb, var(--tk-secondary) 66%, var(--tk-ink)) 90%),
						var(--tk-secondary);
				}

				.tk-key--accent .tk-key__top span,
				.tk-key--secondary .tk-key__top span {
					color: color-mix(in srgb, var(--tk-paper) 96%, white);
					text-shadow: 0 1px 0 rgba(22, 20, 15, 0.16);
				}

				.tk-key--accent .tk-key__front,
				.tk-key--accent .tk-key__right,
				.tk-key--accent .tk-key__bottom {
					background: linear-gradient(to bottom, color-mix(in srgb, var(--tk-accent) 70%, var(--tk-ink)), color-mix(in srgb, var(--tk-accent) 44%, var(--tk-ink)));
				}

				.tk-key--accent .tk-key__left,
				.tk-key--accent .tk-key__back {
					background: color-mix(in srgb, var(--tk-accent) 76%, var(--tk-paper));
				}

				.tk-key--secondary .tk-key__front,
				.tk-key--secondary .tk-key__right,
				.tk-key--secondary .tk-key__bottom {
					background: linear-gradient(to bottom, color-mix(in srgb, var(--tk-secondary) 68%, var(--tk-ink)), color-mix(in srgb, var(--tk-secondary) 44%, var(--tk-ink)));
				}

				.tk-key--secondary .tk-key__left,
				.tk-key--secondary .tk-key__back {
					background: color-mix(in srgb, var(--tk-secondary) 70%, var(--tk-paper));
				}

				.tk-key--down {
					transform: translateZ(-5px);
					filter: saturate(1.05);
				}

				.tk-key--down .tk-key__top {
					background:
						linear-gradient(145deg, color-mix(in srgb, var(--tk-accent) 20%, var(--tk-paper)), color-mix(in srgb, var(--tk-accent) 34%, var(--tk-paper))),
						var(--tk-paper);
				}

				.tk-screen {
					--tk-monitor-x: 168px;
					position: absolute;
					width: 480px;
					height: 282px;
					padding: 0;
					align-items: stretch;
					justify-content: stretch;
					transform: translateX(var(--tk-monitor-x)) translateZ(130px) translateY(-242px) translateZ(62px) rotateX(270deg);
					border: 1px solid color-mix(in srgb, var(--tk-line) 64%, var(--tk-steel));
					border-radius: 8px;
					background:
						linear-gradient(135deg, color-mix(in srgb, var(--tk-paper) 94%, var(--tk-steel)) 0 18%, color-mix(in srgb, var(--tk-paper) 72%, var(--tk-steel)) 48%, color-mix(in srgb, var(--tk-bone-deep) 58%, var(--tk-steel)) 100%),
						var(--tk-bone-deep);
					color: var(--tk-paper);
					font-size: 9px;
					line-height: 1.45;
					letter-spacing: 0.095em;
					text-transform: uppercase;
					overflow: visible;
					box-shadow:
						inset 1px 1px 0 color-mix(in srgb, var(--tk-paper) 92%, transparent),
						inset -3px -4px 7px color-mix(in srgb, var(--tk-steel) 18%, transparent),
						0 6px 10px color-mix(in srgb, var(--tk-ink) 15%, transparent),
						0 24px 38px color-mix(in srgb, var(--tk-ink) 18%, transparent),
						0 0 30px color-mix(in srgb, var(--tk-accent) 11%, transparent);
				}

				.tk-screen::before {
					content: "";
					position: absolute;
					left: 7px;
					right: 7px;
					bottom: -8px;
					height: 10px;
					border-radius: 0 0 7px 7px;
					background:
						linear-gradient(to bottom, color-mix(in srgb, var(--tk-paper) 76%, var(--tk-steel)), color-mix(in srgb, var(--tk-bone-deep) 48%, var(--tk-steel))),
						var(--tk-bone-deep);
					transform: rotateX(-70deg);
					transform-origin: top;
					opacity: 1;
				}

				.tk-screen::after {
					content: "";
					position: absolute;
					top: 7px;
					right: -9px;
					width: 10px;
					height: 266px;
					border-radius: 0 7px 7px 0;
					background: linear-gradient(to right, color-mix(in srgb, var(--tk-paper) 64%, var(--tk-steel)), color-mix(in srgb, var(--tk-bone-deep) 38%, var(--tk-steel)));
					transform: rotateY(68deg);
					transform-origin: left;
					opacity: 1;
				}

				.tk-screen__ambient {
					position: absolute;
					inset: -48px -66px -62px;
					z-index: -1;
					border-radius: 999px;
					background: radial-gradient(ellipse at center, color-mix(in srgb, var(--tk-accent) 22%, transparent), transparent 66%);
					filter: blur(16px);
					opacity: 0.58;
					transform: translateZ(-52px);
				}

				.tk-screen__camera {
					position: absolute;
					left: 50%;
					top: 5px;
					z-index: 4;
					width: 4px;
					height: 4px;
					border-radius: 999px;
					background: color-mix(in srgb, var(--tk-ink) 88%, var(--tk-steel));
					box-shadow: 0 0 0 1px color-mix(in srgb, var(--tk-paper) 22%, transparent);
					transform: translateX(-50%);
				}

				.tk-screen__panel {
					position: absolute;
					inset: 10px;
					z-index: 2;
					overflow: hidden;
					border-radius: 3px;
					background:
						radial-gradient(ellipse at 84% 14%, color-mix(in srgb, var(--tk-paper) 14%, transparent), transparent 24%),
						radial-gradient(ellipse at 72% 58%, color-mix(in srgb, var(--tk-accent) 16%, transparent), transparent 42%),
						linear-gradient(135deg, var(--tk-ink), var(--tk-ink-soft) 56%, var(--tk-ink));
					box-shadow:
						0 0 0 2px color-mix(in srgb, var(--tk-ink) 78%, var(--tk-steel)),
						inset 0 0 0 1px color-mix(in srgb, var(--tk-paper) 9%, transparent),
						inset 0 -22px 38px color-mix(in srgb, var(--tk-ink) 48%, transparent);
					animation: tk-screen-flicker 1.6s ease-in-out infinite alternate;
				}

				.tk-screen__panel::before,
				.tk-screen__panel::after {
					content: "";
					position: absolute;
					pointer-events: none;
					border: 1px solid color-mix(in srgb, var(--tk-paper) 15%, transparent);
					border-radius: 999px;
					filter: blur(0.2px);
				}

				.tk-screen__panel::before {
					right: -82px;
					top: -58px;
					width: 250px;
					height: 168px;
					transform: rotate(-21deg);
					opacity: 0.42;
				}

				.tk-screen__panel::after {
					left: -42px;
					right: -42px;
					bottom: auto;
					top: -34px;
					width: auto;
					height: 24px;
					border: 0;
					border-radius: 999px;
					background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--tk-paper) 9%, transparent), transparent);
					filter: blur(5px);
					opacity: 0.72;
					animation: tk-screen-scan 4.8s linear infinite;
				}

				.tk-screen__topbar {
					position: absolute;
					left: 16px;
					right: 16px;
					top: 0;
					z-index: 2;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 34px;
					border-bottom: 1px solid color-mix(in srgb, var(--tk-paper) 12%, transparent);
					color: color-mix(in srgb, var(--tk-paper) 52%, var(--tk-muted));
					font-size: 7px;
					letter-spacing: 0.16em;
				}

				.tk-screen__brand {
					display: inline-flex;
					align-items: center;
					gap: 7px;
					color: var(--tk-paper);
				}

				.tk-screen__brand i,
				.tk-screen__statusbar i {
					display: inline-block;
					width: 5px;
					height: 5px;
					border-radius: 999px;
					background: var(--tk-accent);
					box-shadow: 0 0 10px color-mix(in srgb, var(--tk-accent) 76%, transparent);
				}

				.tk-screen__workspace {
					position: absolute;
					inset: 46px 16px 38px;
					z-index: 2;
					display: grid;
					grid-template-columns: minmax(0, 1fr) 96px;
					gap: 18px;
				}

				.tk-screen__terminal {
					position: relative;
					min-width: 0;
					padding-right: 16px;
					border-right: 1px solid color-mix(in srgb, var(--tk-paper) 11%, transparent);
				}

				.tk-screen__eyebrow {
					display: block;
					color: color-mix(in srgb, var(--tk-paper) 48%, var(--tk-muted));
					font-size: 7px;
					letter-spacing: 0.16em;
				}

				.tk-screen__terminal-copy {
					max-width: 23em;
					margin: 18px 0 0;
					color: var(--tk-paper);
					font-size: 13px;
					font-weight: 700;
					line-height: 1.48;
					letter-spacing: 0.055em;
					white-space: pre-wrap;
					word-break: break-word;
				}

				.tk-screen__terminal-copy::before {
					content: ">";
					margin-right: 7px;
					color: var(--tk-accent);
				}

				.tk-screen__caret {
					position: relative;
					z-index: 2;
					display: inline-block;
					width: 8px;
					height: 2px;
					margin-left: 4px;
					background: var(--tk-accent);
					box-shadow: 0 0 8px color-mix(in srgb, var(--tk-accent) 50%, transparent);
				}

				.tk-screen__progress {
					position: absolute;
					left: 0;
					right: 16px;
					bottom: 0;
					height: 2px;
					overflow: hidden;
					background: color-mix(in srgb, var(--tk-paper) 12%, transparent);
				}

				.tk-screen__progress span {
					display: block;
					width: 74%;
					height: 100%;
					background: var(--tk-accent);
					box-shadow: 0 0 10px color-mix(in srgb, var(--tk-accent) 60%, transparent);
				}

				.tk-screen__telemetry {
					min-width: 0;
				}

				.tk-screen__telemetry strong {
					display: block;
					margin-top: 8px;
					color: var(--tk-paper);
					font-size: 38px;
					font-weight: 400;
					line-height: 1;
					letter-spacing: -0.06em;
				}

				.tk-screen__telemetry sup {
					margin-left: 2px;
					color: var(--tk-accent);
					font-size: 10px;
					letter-spacing: 0;
					vertical-align: top;
				}

				.tk-screen__telemetry ul {
					display: grid;
					gap: 7px;
					margin: 16px 0 0;
					padding: 0;
					list-style: none;
				}

				.tk-screen__telemetry li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: color-mix(in srgb, var(--tk-paper) 60%, var(--tk-muted));
					font-size: 7px;
					letter-spacing: 0.12em;
				}

				.tk-screen__telemetry li i {
					display: block;
					width: 17px;
					height: 2px;
					background: var(--tk-accent);
					box-shadow: 0 0 8px color-mix(in srgb, var(--tk-accent) 42%, transparent);
				}

				.tk-screen__statusbar {
					position: absolute;
					left: 16px;
					right: 16px;
					bottom: 0;
					z-index: 2;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 30px;
					border-top: 1px solid color-mix(in srgb, var(--tk-paper) 10%, transparent);
					color: color-mix(in srgb, var(--tk-paper) 46%, var(--tk-muted));
					font-size: 6.5px;
					letter-spacing: 0.14em;
				}

				.tk-screen__statusbar span:last-child {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: var(--tk-paper);
				}

				.tk-screen__statusbar i {
					width: 4px;
					height: 4px;
				}

				.tk-screen__chin {
					display: none;
				}

				.tk-screen__stand-mount {
					position: absolute;
					left: 50%;
					bottom: -14px;
					z-index: 1;
					width: 86px;
					height: 16px;
					border-radius: 3px 3px 7px 7px;
					background:
						linear-gradient(90deg, color-mix(in srgb, var(--tk-bone-deep) 58%, var(--tk-steel)), color-mix(in srgb, var(--tk-paper) 82%, var(--tk-steel)) 46%, color-mix(in srgb, var(--tk-bone-deep) 48%, var(--tk-steel))),
						var(--tk-bone-deep);
					box-shadow:
						inset 0 1px 0 color-mix(in srgb, var(--tk-paper) 70%, transparent),
						0 4px 7px color-mix(in srgb, var(--tk-ink) 9%, transparent);
					transform: translateX(-50%) translateZ(-30px) rotateX(-5deg);
				}

				.tk-screen__hinge {
					position: absolute;
					left: 50%;
					bottom: -24px;
					z-index: 2;
					width: 48px;
					height: 14px;
					border-radius: 999px;
					background:
						radial-gradient(circle at 36% 36%, color-mix(in srgb, var(--tk-paper) 62%, transparent), transparent 20%),
						linear-gradient(90deg, color-mix(in srgb, var(--tk-bone-deep) 38%, var(--tk-steel)), color-mix(in srgb, var(--tk-paper) 70%, var(--tk-steel)) 48%, color-mix(in srgb, var(--tk-bone-deep) 32%, var(--tk-steel)));
					box-shadow:
						inset 0 1px 0 color-mix(in srgb, var(--tk-paper) 74%, transparent),
						0 3px 5px color-mix(in srgb, var(--tk-ink) 9%, transparent);
					transform: translateX(-50%) translateZ(-28px);
				}

				.tk-screen__stand-neck {
					position: absolute;
					left: 50%;
					bottom: -142px;
					z-index: 1;
					width: 104px;
					height: 176px;
					border: 1px solid color-mix(in srgb, var(--tk-line) 66%, var(--tk-steel));
					border-bottom: 0;
					border-radius: 3px 3px 0 0;
					background:
						linear-gradient(90deg, color-mix(in srgb, var(--tk-bone-deep) 42%, var(--tk-steel)) 0 9%, color-mix(in srgb, var(--tk-paper) 88%, var(--tk-steel)) 18% 70%, color-mix(in srgb, var(--tk-bone-deep) 38%, var(--tk-steel)) 100%),
						var(--tk-bone-deep);
					box-shadow:
						inset 2px 0 4px color-mix(in srgb, var(--tk-paper) 38%, transparent),
						inset -5px 0 8px color-mix(in srgb, var(--tk-steel) 11%, transparent);
					opacity: 0.98;
					transform: translateX(-50%) translateZ(-42px) rotateX(1deg);
				}

				.tk-screen__stand-neck::before {
					content: "";
					position: absolute;
					left: 8px;
					right: 8px;
					top: 6px;
					height: 1px;
					border-radius: 999px;
					background: color-mix(in srgb, var(--tk-paper) 64%, transparent);
					opacity: 0.68;
				}

				.tk-screen__stand-neck::after {
					content: "";
					position: absolute;
					top: 8px;
					bottom: 10px;
					right: 11px;
					width: 9px;
					border-radius: 999px;
					background: linear-gradient(to right, color-mix(in srgb, var(--tk-paper) 48%, transparent), transparent);
					filter: blur(0.2px);
					opacity: 0.62;
				}

				.tk-screen__stand-hole {
					position: absolute;
					left: 50%;
					top: 56px;
					display: block;
					width: 28px;
					height: 68px;
					border: 1px solid color-mix(in srgb, var(--tk-line) 66%, var(--tk-steel));
					border-radius: 999px;
					background: color-mix(in srgb, var(--tk-bone) 88%, var(--tk-paper));
					box-shadow:
						inset 3px 1px 5px color-mix(in srgb, var(--tk-steel) 16%, transparent),
						inset -1px -1px 0 color-mix(in srgb, var(--tk-paper) 74%, transparent);
					transform: translateX(-50%) translateZ(3px);
				}

				.tk-screen__stand-base {
					position: absolute;
					left: 50%;
					bottom: -258px;
					z-index: 0;
					width: 112px;
					height: 120px;
					border: 1px solid color-mix(in srgb, var(--tk-line) 68%, var(--tk-steel));
					border-top: 0;
					border-radius: 3px 3px 6px 6px;
					background:
						linear-gradient(145deg, color-mix(in srgb, var(--tk-paper) 82%, transparent), transparent 48%),
						linear-gradient(to bottom, color-mix(in srgb, var(--tk-paper) 90%, var(--tk-steel)), color-mix(in srgb, var(--tk-bone-deep) 74%, var(--tk-steel)) 84%),
						var(--tk-bone-deep);
					box-shadow:
						inset 1px 1px 0 color-mix(in srgb, var(--tk-paper) 84%, transparent),
						inset -4px -3px 8px color-mix(in srgb, var(--tk-steel) 8%, transparent),
						0 7px 12px color-mix(in srgb, var(--tk-ink) 7%, transparent);
					transform: translateX(-50%) translateZ(-42px) rotateX(82deg);
					transform-origin: center top;
				}

				.tk-screen__stand-base::before {
					content: "";
					position: absolute;
					left: 4px;
					right: 4px;
					bottom: -3px;
					height: 4px;
					border-radius: 0 0 4px 4px;
					background: linear-gradient(to bottom, color-mix(in srgb, var(--tk-bone-deep) 76%, var(--tk-steel)), color-mix(in srgb, var(--tk-steel) 16%, var(--tk-bone-deep)));
					transform: rotateX(-58deg);
					transform-origin: top;
					opacity: 0.78;
				}

				.tk-screen__stand-base::after {
					content: "";
					position: absolute;
					left: 4px;
					right: 4px;
					top: -8px;
					height: 12px;
					border: 1px solid color-mix(in srgb, var(--tk-line) 48%, var(--tk-steel));
					border-bottom: 0;
					border-radius: 4px 4px 0 0;
					background:
						linear-gradient(90deg, color-mix(in srgb, var(--tk-bone-deep) 42%, var(--tk-steel)) 0 9%, color-mix(in srgb, var(--tk-paper) 88%, var(--tk-steel)) 18% 70%, color-mix(in srgb, var(--tk-bone-deep) 38%, var(--tk-steel)) 100%),
						var(--tk-bone-deep);
					box-shadow: inset 0 1px 0 color-mix(in srgb, var(--tk-paper) 72%, transparent);
					transform: rotateX(-42deg);
					transform-origin: center bottom;
				}

				@keyframes tk-screen-scan {
					0% {
						transform: translateY(0);
					}

					100% {
						transform: translateY(250px);
					}
				}

				@keyframes tk-screen-flicker {
					0%,
					91%,
					100% {
						filter: brightness(1);
					}

					95% {
						filter: brightness(0.86);
					}
				}
			`}</style>

			<div className="tk-main tk-flex">
				<div className="tk-floor-shadow" />
				<div className="tk-keyboard tk-flex">
					<TypingKeyboardScreen text={screenText} />
					<div className="tk-keyboard__front tk-face" />
					<div className="tk-keyboard__back tk-face" />
					<div className="tk-keyboard__right tk-face" />
					<div className="tk-keyboard__left tk-face" />
					<div className="tk-keyboard__top tk-face">
						{KEY_ROWS.map((row) => (
							<div className="tk-keys" key={row.id}>
								{row.keys.map((keySpec) => (
									<TypingKeyboardKey
										active={activeKey === keySpec.id}
										key={keySpec.id}
										keySpec={keySpec}
									/>
								))}
							</div>
						))}
					</div>
					<div className="tk-keyboard__bottom tk-face" />
				</div>
			</div>
		</div>
	);
}

export const TypingKeyboard = memo(TypingKeyboardComponent);
