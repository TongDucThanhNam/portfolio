import type { Project } from "../types";
import { cx } from "../utils";

export function ProjectBadge({ project }: { project: Project }) {
	return (
		<span
			className={cx(
				"inline-flex rounded-pill border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em]",
				project.statusTone === "live" && "border-rebar text-rebar",
				project.statusTone === "oss" && "border-steel text-steel",
				project.statusTone === "published" && "border-ink text-ink",
			)}
		>
			{project.statusTone === "live" && (
				<span className="mr-1.5 mt-[0.35em] h-1.5 w-1.5 rounded-full bg-rebar" />
			)}
			{project.status}
		</span>
	);
}
