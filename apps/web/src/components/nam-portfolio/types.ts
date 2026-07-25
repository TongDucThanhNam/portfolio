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
	description: string;
	items: string[];
};

export type ProjectStatusTone =
	| "live"
	| "published"
	| "private"
	| "progress"
	| "prototype";

export type ProjectVisual =
	| "extension"
	| "workspace"
	| "inbox"
	| "automation"
	| "desktop"
	| "tree"
	| "mobile"
	| "commerce"
	| "recommendation";

export type Project = {
	name: string;
	status: string;
	statusTone: ProjectStatusTone;
	proof: string;
	type: string;
	stack: string[];
	highlights: string[];
	href?: string;
	linkLabel?: string;
	cursor: string;
	visual: ProjectVisual;
	featured: boolean;
};
