export function ProjectPreview({ index }: { index: number }) {
	if (index === 1) {
		return (
			<svg
				viewBox="0 0 200 150"
				className="h-full w-full"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.2"
			>
				<title>Branching chat project schematic</title>
				<circle cx="100" cy="30" r="10" />
				<circle cx="60" cy="75" r="10" />
				<circle cx="140" cy="75" r="10" />
				<circle cx="40" cy="120" r="10" />
				<circle cx="100" cy="120" r="10" />
				<circle cx="160" cy="120" r="10" />
				<line x1="100" y1="40" x2="60" y2="65" />
				<line x1="100" y1="40" x2="140" y2="65" />
				<line x1="60" y1="85" x2="40" y2="110" />
				<line x1="60" y1="85" x2="100" y2="110" />
				<line x1="140" y1="85" x2="100" y2="110" />
				<line x1="140" y1="85" x2="160" y2="110" />
			</svg>
		);
	}

	if (index === 2) {
		return (
			<svg
				viewBox="0 0 200 150"
				className="h-full w-full"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.2"
			>
				<title>Desktop copilot project schematic</title>
				<rect x="30" y="30" width="140" height="90" />
				<path d="M30 20 L20 30 M170 20 L180 30" />
				<line x1="50" y1="60" x2="150" y2="60" />
				<line x1="50" y1="80" x2="130" y2="80" />
				<rect x="50" y="95" width="60" height="15" />
			</svg>
		);
	}

	if (index === 3) {
		return (
			<svg
				viewBox="0 0 200 150"
				className="h-full w-full"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.2"
			>
				<title>Mobile keyboard project schematic</title>
				<rect x="70" y="15" width="60" height="120" rx="8" />
				<line x1="70" y1="35" x2="130" y2="35" />
				<line x1="70" y1="115" x2="130" y2="115" />
				<rect x="80" y="48" width="40" height="12" />
				<rect x="80" y="66" width="40" height="12" />
				<rect x="80" y="84" width="40" height="12" />
				<circle cx="100" cy="125" r="4" />
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 200 150"
			className="h-full w-full"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.2"
		>
			<title>AI workspace project schematic</title>
			<rect x="20" y="20" width="160" height="110" />
			<line x1="20" y1="44" x2="180" y2="44" />
			<circle cx="34" cy="32" r="3" />
			<circle cx="46" cy="32" r="3" />
			<circle cx="58" cy="32" r="3" />
			<rect x="34" y="60" width="70" height="50" strokeDasharray="3 3" />
			<path d="M120 70 L160 70 M120 84 L160 84 M120 98 L150 98" />
			<circle cx="140" cy="115" r="6" />
		</svg>
	);
}
