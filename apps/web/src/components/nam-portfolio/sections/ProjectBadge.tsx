import type { Project } from "../types";
import { cx } from "../utils";

export function ProjectBadge({
	project,
	inverse = false,
}: {
	project: Project;
	inverse?: boolean;
}) {
	return (
		<span
			className={cx(
				"inline-flex items-center border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em]",
				project.statusTone === "live" && "border-rebar text-rebar",
				project.statusTone === "published" &&
					(inverse
						? "border-[rgba(246,242,233,0.38)] text-paper"
						: "border-ink text-ink"),
				(project.statusTone === "private" ||
					project.statusTone === "progress") &&
					(inverse
						? "border-[rgba(246,242,233,0.28)] text-paper/70"
						: "border-steel text-steel"),
				project.statusTone === "prototype" &&
					(inverse
						? "border-[rgba(246,242,233,0.24)] text-paper/60"
						: "border-muted text-ink-soft"),
			)}
		>
			{project.statusTone === "live" && (
				<span className="mr-1.5 mt-[0.35em] h-1.5 w-1.5 rounded-full bg-rebar" />
			)}
			{project.status}
		</span>
	);
}
