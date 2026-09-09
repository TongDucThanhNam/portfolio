import { cx } from "../utils";

type StatementSegment = {
	text: string;
	accent?: boolean;
};

export function ScrollWordReveal({
	segments,
	className,
	as = "p",
}: {
	segments: StatementSegment[];
	className?: string;
	as?: "p" | "h2";
}) {
	const Component = as;

	return (
		<Component className={className} data-word-reveal>
			<span className="sr-only">
				{segments.map((segment) => segment.text).join(" ")}
			</span>
			{segments.map((segment) => {
				const words = segment.text.split(" ");
				const Segment = segment.accent ? "em" : "span";

				return (
					<Segment
						key={segment.text}
						className={cx(segment.accent && "font-light italic text-rebar")}
						aria-hidden="true"
					>
						{words.map((word, index) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: The statement is immutable display copy.
								key={`${word}-${index}`}
								className="mr-[0.22em] inline-block will-change-[opacity,transform]"
								data-word
							>
								{word}
							</span>
						))}
					</Segment>
				);
			})}
		</Component>
	);
}
