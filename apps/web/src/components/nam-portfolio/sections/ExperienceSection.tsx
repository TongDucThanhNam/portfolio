import { SectionHead } from "../common";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceSection() {
	return (
		<section id="experience" className="section-pad bg-bone">
			<SectionHead num="03" title="Experience" detail="Selected roles" />
			<div className="flex flex-col gap-[clamp(32px,5vw,64px)]">
				<ExperienceItem
					period="05/2024 - 07/2024"
					location="Ho Chi Minh City"
					jobTitle="Backend Developer"
					org="Amazing Technology Solutions Co., Ltd."
					points={[
						"Contributed to backend development for an enterprise interview-workflow management project.",
						"Worked on Node.js / Express.js backend tasks and API-related delivery within a short project timeline.",
					]}
					stack={["Node.js", "Express.js"]}
				/>
				<ExperienceItem
					period="03/2025 - Present"
					location="Personal product / live"
					jobTitle="Full-stack Developer"
					note="Eragear"
					org="AI-native workspace / eragear.app"
					orgHref="https://eragear.app"
					points={[
						"Building an AI workspace for long-running conversations, in-context artifacts, research workflows, and agent-powered productivity.",
						"Implemented selectable model/tool/search controls, streaming responses, usage metadata, persistence, and credit-accounting architecture.",
						"Connected the web workspace with browser-assisted research, local knowledge workflows, and agent integrations.",
					]}
					stack={[
						"TanStack / React",
						"Hono",
						"CF Workers / D1",
						"Drizzle",
						"AI SDK",
					]}
				/>
			</div>
		</section>
	);
}
