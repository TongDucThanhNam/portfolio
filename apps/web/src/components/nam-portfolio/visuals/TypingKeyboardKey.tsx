import { memo } from "react";

import type { TypingKeySpec } from "./typingKeyboardData";

type TypingKeyboardKeyProps = {
	keySpec: TypingKeySpec;
	active: boolean;
};

const sizeClassBySize = {
	w2: " tk-key--w2",
	w3: " tk-key--w3",
	w6: " tk-key--w6",
} as const;

const toneClassByTone = {
	default: "",
	accent: " tk-key--accent",
	secondary: " tk-key--secondary",
} as const;

const faceNames = ["front", "back", "right", "left", "top", "bottom"] as const;

function TypingKeyboardKeyComponent({
	keySpec,
	active,
}: TypingKeyboardKeyProps) {
	const sizeClass = keySpec.size ? sizeClassBySize[keySpec.size] : "";
	const sizeSuffix = keySpec.size ? `--${keySpec.size}` : "";
	const toneClass = toneClassByTone[keySpec.tone ?? "default"];

	return (
		<div
			className={`tk-key tk-flex${sizeClass}${toneClass}${active ? " tk-key--down" : ""}`}
			data-key={keySpec.id}
		>
			{faceNames.map((faceName) => (
				<div
					className={`tk-key__${faceName} tk-face${sizeSuffix ? ` tk-key__${faceName}${sizeSuffix}` : ""}`}
					key={faceName}
				>
					{faceName === "top" && keySpec.label ? (
						<span>{keySpec.label}</span>
					) : null}
				</div>
			))}
		</div>
	);
}

export const TypingKeyboardKey = memo(TypingKeyboardKeyComponent);
