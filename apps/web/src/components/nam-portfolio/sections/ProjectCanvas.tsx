import type { Project } from "../types";
import { cx } from "../utils";

const productEyebrowClass =
	"font-mono text-[0.56rem] uppercase tracking-[0.1em] text-rebar";

const productPanelHeadingClass =
	"m-0 mt-4 mb-1 font-serif text-[clamp(2.2rem,4vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.045em]";

function WindowBar({ label }: { label: string }) {
	return (
		<div className="grid min-h-[42px] grid-cols-[auto_1fr_auto] items-center gap-[14px] border-b border-line px-[14px] py-[9px] font-mono text-[0.55rem] tracking-[0.05em]">
			<span
				className="flex gap-[5px] [&_i]:h-[7px] [&_i]:w-[7px] [&_i]:rounded-full [&_i]:bg-line [&_i:first-child]:bg-rebar"
				aria-hidden="true"
			>
				<i />
				<i />
				<i />
			</span>
			<span className="min-w-0 max-md:overflow-hidden max-md:text-ellipsis max-md:whitespace-nowrap">
				{label}
			</span>
			<span aria-hidden="true">＋</span>
		</div>
	);
}

function ExtensionCanvas() {
	return (
		<div>
			<WindowBar label="Interesting Article" />
			<div className="grid min-h-[42px] grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line px-[14px] py-2 font-mono text-[0.54rem] text-muted">
				<span aria-hidden="true">←</span>
				<span className="rounded-pill border border-line px-3 py-1.5">
					Verified browsing context
				</span>
				<strong className="grid h-[23px] w-[23px] place-items-center bg-ink text-paper">
					E
				</strong>
			</div>
			<div className="grid min-h-[clamp(390px,54vh,590px)] grid-cols-[minmax(0,1fr)_minmax(210px,0.38fr)] max-lg:grid-cols-[minmax(0,1fr)_minmax(190px,0.42fr)] max-md:min-h-[390px] max-md:grid-cols-[minmax(0,1fr)_42%]">
				<div className="p-[clamp(34px,5vw,76px)] max-md:px-4 max-md:py-6">
					<span className={productEyebrowClass}>Browser context</span>
					<h4 className={cx(productPanelHeadingClass, "max-md:text-[2rem]")}>
						Interesting Article
					</h4>
					<p className="m-0 font-serif text-muted">
						Proof before anything moves.
					</p>
					<div
						className="relative mt-7 h-[clamp(150px,24vh,260px)] overflow-hidden bg-bone-deep max-md:mt-5 max-md:h-[130px] [&_i]:absolute [&_i]:h-[160%] [&_i]:w-[70%] [&_i]:rotate-[35deg] [&_i]:rounded-full [&_i]:bg-[linear-gradient(140deg,var(--color-paper),var(--color-line))] [&_i:first-child]:-left-[20%] [&_i:first-child]:-top-[85%] [&_i:last-child]:-bottom-[95%] [&_i:last-child]:-right-[12%]"
						aria-hidden="true"
					>
						<i />
						<i />
					</div>
					<div
						className="mt-[26px] grid gap-2 [&_i]:h-1.5 [&_i]:w-full [&_i]:rounded-pill [&_i]:bg-bone-deep [&_i:nth-child(2)]:w-[86%] [&_i:nth-child(3)]:w-[94%] [&_i:nth-child(4)]:w-[72%]"
						aria-hidden="true"
					>
						<i />
						<i />
						<i />
						<i />
					</div>
				</div>
				<div className="m-[14px] border border-line bg-bone p-[15px] max-md:m-2 max-md:mr-2 max-md:ml-0 max-md:p-2">
					<div className="flex items-center gap-2.5 border-b border-line pb-[14px] text-[0.72rem] max-md:text-[0.52rem]">
						<strong className="grid h-[23px] w-[23px] place-items-center bg-ink text-paper">
							E
						</strong>
						<span>Eragear Web Copilot</span>
					</div>
					<div className="mt-[14px] grid gap-[7px] border border-line bg-paper p-3 max-md:p-2">
						<span className="font-mono text-[0.54rem] uppercase tracking-[0.06em]">
							Browser Context
						</span>
						<small className="text-[0.6rem] leading-normal text-muted max-md:text-[0.48rem]">
							Page / Title / Clean Markdown
						</small>
					</div>
					<div className="mt-[14px] grid gap-[7px] border border-line bg-paper p-3 max-md:p-2">
						<span className="font-mono text-[0.54rem] uppercase tracking-[0.06em]">
							Send to AI Workspace
						</span>
						<small className="text-[0.6rem] leading-normal text-muted max-md:text-[0.48rem]">
							Verified context / BYOM workflow
						</small>
					</div>
					<div className="mt-[14px] flex min-h-[74px] items-center justify-between gap-2.5 border border-line bg-paper p-3 max-md:p-2">
						<span className="font-mono text-[0.54rem] uppercase tracking-[0.06em]">
							Streaming response UI
						</span>
						<i
							className="grid h-7 w-7 shrink-0 place-items-center bg-rebar not-italic text-paper"
							aria-hidden="true"
						>
							→
						</i>
					</div>
					<div className="mt-3 flex flex-wrap gap-[5px] [&>span]:rounded-sm [&>span]:border [&>span]:border-line [&>span]:bg-paper [&>span]:px-1.5 [&>span]:py-[5px] [&>span]:font-mono [&>span]:text-[0.44rem] [&>span]:text-muted max-md:[&>span:nth-child(n+3)]:hidden">
						<span>Explain</span>
						<span>Summarize</span>
						<span>Extract</span>
					</div>
				</div>
			</div>
		</div>
	);
}

function WorkspaceCanvas() {
	return (
		<div className="bg-ink text-paper [&>div:first-child]:border-[rgba(246,242,233,0.14)]">
			<WindowBar label="Eragear AI Workspace" />
			<div className="grid min-h-[clamp(430px,58vh,620px)] grid-cols-[110px_minmax(0,1fr)_190px] max-xl:grid-cols-[84px_minmax(0,1fr)] max-md:min-h-[410px] max-md:grid-cols-[52px_minmax(0,1fr)]">
				<aside className="flex flex-col gap-[18px] border-r border-[rgba(246,242,233,0.14)] px-[14px] py-[22px] font-mono text-[0.5rem] uppercase text-[rgba(246,242,233,0.52)] max-md:gap-4 max-md:px-2.5 max-md:[&>span]:hidden">
					<strong className="grid h-7 w-7 place-items-center bg-rebar text-paper">
						E
					</strong>
					<span>Chat</span>
					<span>Artifacts</span>
					<span>Research</span>
					<span>Knowledge</span>
				</aside>
				<div className="p-[clamp(34px,5vw,70px)] max-md:px-[18px] max-md:py-7">
					<p className={productEyebrowClass}>Long-running conversation</p>
					<h4
						className={cx(
							productPanelHeadingClass,
							"max-w-[10em] text-paper max-md:text-[2.4rem]",
						)}
					>
						What are we building today?
					</h4>
					<div className="mt-9 flex min-h-[110px] items-center justify-between gap-[14px] border border-[rgba(246,242,233,0.18)] p-[18px] text-[0.76rem] text-[rgba(246,242,233,0.52)]">
						<span>Model / tool / search controls</span>
						<i
							className="grid h-9 w-9 shrink-0 place-items-center bg-rebar not-italic text-paper"
							aria-hidden="true"
						>
							→
						</i>
					</div>
					<div className="mt-[14px] flex flex-wrap gap-[7px] [&>span]:rounded-pill [&>span]:border [&>span]:border-[rgba(246,242,233,0.18)] [&>span]:px-[9px] [&>span]:py-1.5 [&>span]:font-mono [&>span]:text-[0.46rem] [&>span]:uppercase [&>span]:text-[rgba(246,242,233,0.62)]">
						<span>Streaming chat</span>
						<span>Artifacts</span>
						<span>Research</span>
						<span>Human-in-the-loop</span>
					</div>
					<div className="mt-9 border-t border-[rgba(246,242,233,0.14)] pt-[22px] text-[0.76rem] text-[rgba(246,242,233,0.68)]">
						<span>Deployable product system</span>
						<div
							className="mt-4 grid gap-2 [&_i]:h-[5px] [&_i]:w-[92%] [&_i]:bg-[rgba(246,242,233,0.12)] [&_i:nth-child(2)]:w-[76%] [&_i:nth-child(3)]:w-[84%]"
							aria-hidden="true"
						>
							<i />
							<i />
							<i />
						</div>
					</div>
				</div>
				<aside className="m-[18px] ml-0 border border-[rgba(246,242,233,0.16)] px-[18px] py-[22px] max-xl:hidden">
					<span className={productEyebrowClass}>Artifact sidecar</span>
					<strong className="mt-7 block font-serif text-[1.65rem] font-normal">
						Working output
					</strong>
					<small className="mt-3 block text-[0.66rem] leading-[1.55] text-[rgba(246,242,233,0.48)]">
						Auth / persistence / usage metadata
					</small>
				</aside>
			</div>
		</div>
	);
}

function LinkSaverCanvas() {
	return (
		<div>
			<WindowBar label="Link Saver" />
			<div className="grid min-h-[clamp(390px,54vh,580px)] grid-cols-[170px_minmax(0,1fr)] max-md:min-h-[400px] max-md:grid-cols-1">
				<aside className="flex flex-col gap-[18px] border-r border-line px-[18px] py-[26px] font-mono text-[0.55rem] uppercase text-muted max-md:hidden">
					<strong className="mb-[14px] text-[0.66rem] font-normal text-ink">
						Knowledge inbox
					</strong>
					<span>Saved</span>
					<span>Archive</span>
					<span>Search</span>
					<span>Export</span>
				</aside>
				<div className="p-[clamp(28px,5vw,68px)] max-md:px-4 max-md:py-6">
					<div className="flex items-center justify-between gap-[18px] rounded-pill border border-line py-2 pr-2 pl-[18px] text-[0.72rem] text-muted">
						<span>Save / extract / archive</span>
						<i className="rounded-pill bg-rebar px-[18px] py-2.5 font-mono text-[0.55rem] not-italic uppercase text-paper">
							Save
						</i>
					</div>
					<div className="mt-7 grid grid-cols-3 gap-3 max-md:grid-cols-1 [&_article]:flex [&_article]:min-h-[220px] [&_article]:flex-col [&_article]:border [&_article]:border-line [&_article]:bg-bone [&_article]:p-[18px] max-md:[&_article]:min-h-[94px] [&_small]:font-mono [&_small]:text-[0.48rem] [&_small]:uppercase [&_small]:leading-normal [&_small]:text-muted [&_span]:font-mono [&_span]:text-[0.48rem] [&_span]:uppercase [&_span]:leading-normal [&_span]:text-muted [&_strong]:my-auto [&_strong]:font-serif [&_strong]:text-[clamp(1.3rem,2.2vw,2.2rem)] [&_strong]:font-normal [&_strong]:leading-none [&_strong]:tracking-[-0.025em] max-md:[&_strong]:my-[14px]">
						<article>
							<span>Web app + extension</span>
							<strong>Read / search / recall</strong>
							<small>D1 / SQLite metadata</small>
						</article>
						<article>
							<span>Archived snapshots</span>
							<strong>Durable source material</strong>
							<small>Cloudflare R2</small>
						</article>
						<article>
							<span>Grounded summaries</span>
							<strong>Citations included</strong>
							<small>Markdown / JSON / llms.md</small>
						</article>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ProjectCanvas({
	project,
	active,
}: {
	project: Project;
	active: boolean;
}) {
	return (
		<figure className="relative isolate m-0 border border-line bg-[rgba(246,242,233,0.72)] p-[clamp(18px,2.5vw,34px)] shadow-[0_1px_3px_rgba(22,20,15,0.1),0_28px_70px_rgba(22,20,15,0.11)] max-md:-mx-2 max-md:p-2.5">
			<div
				className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(22,20,15,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(22,20,15,0.045)_1px,transparent_1px)] bg-[length:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
				aria-hidden="true"
			/>
			<div
				className={cx(
					"overflow-hidden rounded-md border border-[rgba(22,20,15,0.2)] bg-paper shadow-[0_1px_3px_rgba(22,20,15,0.12),0_14px_38px_rgba(22,20,15,0.12)]",
					active && "motion-safe:animate-product-surface",
				)}
			>
				{project.visual === "extension" ? (
					<ExtensionCanvas />
				) : project.visual === "inbox" ? (
					<LinkSaverCanvas />
				) : (
					<WorkspaceCanvas />
				)}
			</div>
			<figcaption className="mt-4 flex justify-between gap-5 font-mono text-[0.54rem] uppercase tracking-[0.08em] text-muted max-md:text-[0.45rem]">
				<span className="text-rebar">{project.cursor}</span>
				<span>{project.status}</span>
			</figcaption>
		</figure>
	);
}
