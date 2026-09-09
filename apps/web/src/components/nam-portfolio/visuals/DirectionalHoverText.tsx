import { type PointerEvent, useState } from "react";

import { cx } from "../utils";

type Direction = "top" | "bottom" | "none";

export function DirectionalHoverText({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const [direction, setDirection] = useState<Direction>("none");

	const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
		const bounds = event.currentTarget.getBoundingClientRect();
		setDirection(
			event.clientY - bounds.top < bounds.height / 2 ? "top" : "bottom",
		);
	};

	return (
		<span
			className={cx("relative block h-[1em] overflow-hidden", className)}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={() => setDirection("none")}
		>
			<strong
				className={cx(
					"relative block h-[1em] font-normal leading-none transition-transform duration-500 ease-fluid motion-reduce:!translate-y-0 group-focus-visible/summary:text-rebar",
					direction === "top" && "translate-y-full",
					direction === "bottom" && "-translate-y-full",
				)}
			>
				{text}
			</strong>
			<strong
				className={cx(
					"absolute inset-0 block h-[1em] -translate-y-full font-normal leading-none text-rebar transition-transform duration-500 ease-fluid motion-reduce:!-translate-y-full",
					direction === "top" && "translate-y-0",
				)}
				aria-hidden="true"
			>
				{text}
			</strong>
			<strong
				className={cx(
					"absolute inset-0 block h-[1em] translate-y-full font-normal leading-none text-rebar transition-transform duration-500 ease-fluid motion-reduce:!translate-y-full",
					direction === "bottom" && "translate-y-0",
				)}
				aria-hidden="true"
			>
				{text}
			</strong>
		</span>
	);
}
