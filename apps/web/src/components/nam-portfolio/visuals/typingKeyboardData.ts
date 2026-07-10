export type TypingKeySize = "w2" | "w3" | "w6";
export type TypingKeyTone = "default" | "accent" | "secondary";

export type TypingKeySpec = {
	id: string;
	label: string;
	size?: TypingKeySize;
	tone?: TypingKeyTone;
};

export type TypingKeyRow = {
	id: string;
	keys: TypingKeySpec[];
};

export const KEY_ROWS: TypingKeyRow[] = [
	{
		id: "function-row",
		keys: [
			{ id: "escape", label: "ESC", tone: "accent" },
			{ id: "one", label: "1" },
			{ id: "two", label: "2" },
			{ id: "three", label: "3" },
			{ id: "four", label: "4" },
			{ id: "five", label: "5" },
			{ id: "six", label: "6" },
			{ id: "seven", label: "7" },
			{ id: "eight", label: "8" },
			{ id: "nine", label: "9" },
			{ id: "zero", label: "0" },
			{ id: "minus", label: "-" },
			{ id: "equals", label: "=" },
			{ id: "backspace", label: "DEL", size: "w2", tone: "accent" },
		],
	},
	{
		id: "qwerty-row",
		keys: [
			{ id: "tab", label: "TAB", size: "w2", tone: "accent" },
			{ id: "q", label: "Q" },
			{ id: "w", label: "W" },
			{ id: "e", label: "E" },
			{ id: "r", label: "R" },
			{ id: "t", label: "T" },
			{ id: "y", label: "Y" },
			{ id: "u", label: "U" },
			{ id: "i", label: "I" },
			{ id: "o", label: "O" },
			{ id: "p", label: "P" },
			{ id: "bracket-left", label: "[" },
			{ id: "bracket-right", label: "]" },
			{ id: "slash-back", label: "\\", tone: "accent" },
		],
	},
	{
		id: "home-row",
		keys: [
			{ id: "caps", label: "CAPS", size: "w3", tone: "accent" },
			{ id: "a", label: "A" },
			{ id: "s", label: "S" },
			{ id: "d", label: "D" },
			{ id: "f", label: "F" },
			{ id: "g", label: "G" },
			{ id: "h", label: "H" },
			{ id: "j", label: "J" },
			{ id: "k", label: "K" },
			{ id: "l", label: "L" },
			{ id: "semicolon", label: ";" },
			{ id: "enter", label: "RET", size: "w2", tone: "secondary" },
		],
	},
	{
		id: "shift-row",
		keys: [
			{ id: "shift-left", label: "SHIFT", size: "w2", tone: "accent" },
			{ id: "z", label: "Z" },
			{ id: "x", label: "X" },
			{ id: "c", label: "C" },
			{ id: "v", label: "V" },
			{ id: "b", label: "B" },
			{ id: "n", label: "N" },
			{ id: "m", label: "M" },
			{ id: "comma", label: "," },
			{ id: "period", label: "." },
			{ id: "slash", label: "/" },
			{ id: "arrow-up", label: "UP" },
			{ id: "shift-right", label: "SHIFT", size: "w3", tone: "accent" },
		],
	},
	{
		id: "bottom-row",
		keys: [
			{ id: "fn", label: "FN", tone: "accent" },
			{ id: "control", label: "CTRL", tone: "secondary" },
			{ id: "option", label: "OPT", tone: "accent" },
			{ id: "command", label: "CMD", tone: "accent" },
			{ id: "space", label: "", size: "w6" },
			{ id: "ai", label: "AI", tone: "accent" },
			{ id: "arrow-left", label: "LEFT", tone: "accent" },
			{ id: "arrow-down", label: "DOWN", tone: "accent" },
			{ id: "arrow-right", label: "NEXT", tone: "accent" },
			{ id: "edge", label: "EDGE", tone: "accent" },
		],
	},
];

const digitKeyIds = {
	"0": "zero",
	"1": "one",
	"2": "two",
	"3": "three",
	"4": "four",
	"5": "five",
	"6": "six",
	"7": "seven",
	"8": "eight",
	"9": "nine",
} as const;

export function keyIdForCharacter(char: string) {
	if (char === " ") return "space";
	if (char === "\n") return "enter";

	const lower = char.toLowerCase();
	if (/^[a-z]$/.test(lower)) return lower;
	if (/^[0-9]$/.test(lower)) {
		return digitKeyIds[lower as keyof typeof digitKeyIds];
	}
	if (lower === ",") return "comma";
	if (lower === ".") return "period";
	if (lower === ":" || lower === ";") return "enter";
	if (lower === "-") return "minus";
	if (lower === "=") return "equals";
	return "ai";
}
