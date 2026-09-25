import { SectionHead } from "../common";
import { skills } from "../data";

const evidence: Record<string, { name: string; href: string }> = {
	Languages: { name: "the project archive", href: "#project-archive" },
	"AI applications": {
		name: "Eragear AI Workspace",
		href: "#project-ai-workspace",
	},
	Frontend: { name: "Eragear AI Workspace", href: "#project-ai-workspace" },
	Backend: { name: "Link Saver", href: "#project-link-saver" },
	"Browser extensions": {
		name: "Eragear Web Copilot",
		href: "#project-web-copilot",
	},
	"Data / infrastructure": { name: "Link Saver", href: "#project-link-saver" },
	Automation: {
		name: "Private Operations Discord Bot",
		href: "#archive-automation",
	},
	Mobile: { name: "Seller Keyboard", href: "#archive-mobile" },
};

export function SkillsSection() {
	return (
		<section
			id="skills"
			className="relative scroll-mt-12 bg-bone px-pad-x py-[clamp(72px,9vw,136px)]"
		>
			<SectionHead
				num="05"
				title="Capabilities"
				detail="The tools follow the problem"
			/>
			<div className="grid items-start gap-12 lg:grid-cols-[0.45fr_1fr] lg:gap-[clamp(48px,8vw,120px)]">
				<div className="lg:sticky lg:top-28" data-reveal="rise">
					<h2 className="font-['Archivo_Variable'] text-[clamp(3.2rem,5.8vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.065em]">
						Many tools.
						<br />
						<span className="font-serif font-normal italic text-rebar">
							One mindset.
						</span>
					</h2>
					<p className="mt-7 max-w-[30ch] text-[0.9rem] leading-7 text-ink-soft">
						Choose what serves the product. Connect it carefully. Make it work
						for the person using it.
					</p>
					<p className="mt-10 hidden font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink-soft lg:block">
						Explore the toolkit ↘
					</p>
				</div>
				<div className="border-t border-ink/30">
					{skills.map((group) => (
						<details
							key={group.label}
							className="group/skill border-b border-ink/20"
							open={group.num === "02"}
						>
							<summary className="grid min-h-[94px] cursor-pointer list-none grid-cols-[24px_1fr_24px] items-center gap-4 py-6 transition-colors hover:text-rebar sm:gap-6 [&::-webkit-details-marker]:hidden">
								<span className="font-mono text-[0.55rem] text-rebar">
									{group.num}
								</span>
								<h3 className="font-['Archivo_Variable'] text-[clamp(1.5rem,2.4vw,2.6rem)] font-normal leading-tight tracking-[-0.04em] transition-transform duration-500 ease-fluid group-hover/skill:translate-x-2">
									{group.label}
								</h3>
								<span
									className="text-xl transition-transform duration-300 group-open/skill:rotate-45"
									aria-hidden="true"
								>
									+
								</span>
							</summary>
							<div className="pb-8 pl-10 sm:pl-12">
								<p className="max-w-[48ch] text-[0.87rem] leading-7 text-ink-soft">
									{group.description}
								</p>
								<ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
									{group.items.map((item) => (
										<li
											key={item}
											className="border-b border-ink/20 pb-1 font-mono text-[0.62rem] leading-5 text-ink"
										>
											{item}
										</li>
									))}
								</ul>
								<a
									href={evidence[group.label].href}
									className="mt-5 inline-flex min-h-11 items-center gap-4 font-mono text-[0.57rem] uppercase tracking-[0.08em] text-rebar underline-offset-4 hover:underline"
								>
									See it in {evidence[group.label].name}
									<span aria-hidden="true">↗</span>
								</a>
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
