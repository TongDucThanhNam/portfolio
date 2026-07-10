export type Chapter = {
	id: string;
	num: string;
	label: string;
	short: string;
};

export type StoryBeat = {
	count: string;
	kicker: string;
	title: string;
	copy: string;
	proofLabel: string;
	proof: string;
	step: string;
};

export type SkillGroup = {
	num: string;
	label: string;
	items: Array<{ name: string; level: string; value: number }>;
};

export type Project = {
	name: string;
	status: "LIVE" | "OPEN SOURCE" | "PUBLISHED - 100+ INSTALLS";
	statusTone: "live" | "oss" | "published";
	proof: string;
	type: string;
	stack: string[];
	year: string;
	href: string;
	cursor: string;
};
