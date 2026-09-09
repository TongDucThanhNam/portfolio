import { cx } from "../utils";

const characterDelayClasses = [
	"delay-[0ms]",
	"delay-[22ms]",
	"delay-[44ms]",
	"delay-[66ms]",
	"delay-[88ms]",
	"delay-[110ms]",
	"delay-[132ms]",
	"delay-[154ms]",
	"delay-[176ms]",
	"delay-[198ms]",
	"delay-[220ms]",
	"delay-[242ms]",
	"delay-[264ms]",
	"delay-[286ms]",
	"delay-[308ms]",
] as const;

export function VariableWeightText({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const words = text.split(" ");

	return (
		<span className={cx("relative inline-flex max-w-full", className)}>
			<span className="sr-only">{text}</span>
			<span
				className="inline-flex max-w-full flex-wrap gap-x-[0.22em]"
				aria-hidden="true"
			>
				{words.map((word, wordIndex) => {
					const wordOffset = words
						.slice(0, wordIndex)
						.reduce(
							(total, previousWord) => total + previousWord.length,
							wordIndex,
						);

					return (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: The display label is immutable and never reorders.
							key={`${word}-${wordIndex}`}
							className="inline-flex whitespace-nowrap"
						>
							{Array.from(word).map((character, characterIndex) => {
								const index = wordOffset + characterIndex;

								return (
									<span
										// biome-ignore lint/suspicious/noArrayIndexKey: The display label is immutable and never reorders.
										key={`${character}-${characterIndex}`}
										className={cx(
											"inline-block transition-[color,font-variation-settings] duration-500 ease-fluid [font-variation-settings:'wght'_420] group-hover/skill-row:text-rebar group-hover/skill-row:[font-variation-settings:'wght'_780] motion-reduce:transition-none",
											characterDelayClasses[
												Math.min(index, characterDelayClasses.length - 1)
											],
										)}
									>
										{character}
									</span>
								);
							})}
						</span>
					);
				})}
			</span>
		</span>
	);
}
