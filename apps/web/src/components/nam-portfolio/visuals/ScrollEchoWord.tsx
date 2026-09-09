import { cx } from "../utils";

export function ScrollEchoWord({
	word,
	className,
}: {
	word: string;
	className?: string;
}) {
	const layerClass =
		"absolute inset-0 block transition-opacity duration-300 will-change-transform motion-reduce:hidden";

	return (
		<div
			className={cx("pointer-events-none", className)}
			data-scroll-echo
			aria-hidden="true"
		>
			<span
				className={cx(
					layerClass,
					"opacity-[0.07] [transform:translate3d(0,var(--echo-n2,0px),0)]",
				)}
			>
				{word}
			</span>
			<span
				className={cx(
					layerClass,
					"opacity-[0.13] [transform:translate3d(0,var(--echo-n1,0px),0)]",
				)}
			>
				{word}
			</span>
			<span className="relative block opacity-[0.42]">{word}</span>
			<span
				className={cx(
					layerClass,
					"opacity-[0.13] [transform:translate3d(0,var(--echo-p1,0px),0)]",
				)}
			>
				{word}
			</span>
			<span
				className={cx(
					layerClass,
					"opacity-[0.07] [transform:translate3d(0,var(--echo-p2,0px),0)]",
				)}
			>
				{word}
			</span>
		</div>
	);
}
