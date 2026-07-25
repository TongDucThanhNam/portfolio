import { SectionHead } from "../common";
import { sectionPadClass } from "../styles";
import { cx } from "../utils";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceSection() {
	return (
		<section id="experience" className={cx(sectionPadClass, "bg-bone")}>
			<SectionHead
				num="04"
				title="Experience"
				detail="Professional + education"
			/>
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
					period="09/2020 - 04/2025"
					location="Ho Chi Minh City"
					jobTitle="Software Engineering"
					note="Education"
					org="Ton Duc Thang University"
					points={[
						"Completed Software Engineering studies while building web, AI, browser-extension, automation, and Android product projects.",
						"English proficiency: Aptis B2.",
					]}
					stack={["Software Engineering", "TDTU", "Aptis B2"]}
				/>
			</div>
		</section>
	);
}
