import { cx } from "../utils";

const characterDelayClasses = [
	"delay-[40ms]",
	"delay-[85ms]",
	"delay-[130ms]",
	"delay-[175ms]",
	"delay-[220ms]",
	"delay-[265ms]",
	"delay-[310ms]",
	"delay-[355ms]",
	"delay-[400ms]",
	"delay-[445ms]",
	"delay-[490ms]",
	"delay-[535ms]",
	"delay-[580ms]",
	"delay-[625ms]",
	"delay-[670ms]",
	"delay-[715ms]",
] as const;

export function KineticDisplayText({
	text,
	delayOffset = 0,
	direction = "up",
}: {
	text: string;
	delayOffset?: number;
	direction?: "up" | "down";
}) {
	return Array.from(text).map((character, index) => {
		if (character === " ") {
			return (
				<span
					// The text is decorative and the complete heading is already in sr-only.
					// biome-ignore lint/suspicious/noArrayIndexKey: This immutable display string never reorders.
					key={`space-${index}`}
					className="inline-block w-[0.27em] shrink-0"
					aria-hidden="true"
				/>
			);
		}

		return (
			<span
				// biome-ignore lint/suspicious/noArrayIndexKey: This immutable display string never reorders.
				key={`${character}-${index}`}
				className="inline-block overflow-hidden pb-[0.08em] align-bottom"
				aria-hidden="true"
			>
				<span
					className={cx(
						"inline-block translate-y-0 rotate-0 opacity-100 transition-[opacity,transform] duration-[1050ms] ease-fluid will-change-transform",
						direction === "up"
							? "[[data-motion=full][data-motion-ready=false]_&]:translate-y-[112%] [[data-motion=full][data-motion-ready=false]_&]:rotate-[2.5deg]"
							: "[[data-motion=full][data-motion-ready=false]_&]:-translate-y-[112%] [[data-motion=full][data-motion-ready=false]_&]:-rotate-[2.5deg]",
						"[[data-motion=full][data-motion-ready=false]_&]:opacity-0",
						characterDelayClasses[
							Math.min(index + delayOffset, characterDelayClasses.length - 1)
						],
					)}
				>
					{character}
				</span>
			</span>
		);
	});
}
