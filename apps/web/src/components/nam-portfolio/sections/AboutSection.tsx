import { SectionHead } from "../common";
import { projectTextLinkClass, sectionPadClass } from "../styles";
import { cx } from "../utils";

export function AboutSection() {
	return (
		<section id="about" className={cx(sectionPadClass, "bg-paper")}>
			<SectionHead num="03" title="About" detail="Profile / 03" />
			<div className="grid items-start gap-[clamp(52px,9vw,144px)] md:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] max-md:gap-14">
				<p
					className="m-0 max-w-[15em] font-serif text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] tracking-[-0.04em]"
					data-reveal="mask"
				>
					Software Engineering graduate focused on AI products, browser
					extensions, automation, web apps, and mobile utilities. I turn vague
					workflows into{" "}
					<em className="font-light italic text-rebar">working products</em>{" "}
					across the whole loop.
				</p>

				<div className="border-t border-line" data-reveal="rise">
					<div
						className="my-[28px] mb-[34px] grid h-[84px] w-[84px] place-items-center rounded-full border border-rebar font-serif text-[1.7rem] text-rebar"
						aria-hidden="true"
					>
						<span>TN</span>
					</div>
					<dl className="m-0 [&>div]:grid [&>div]:grid-cols-[96px_1fr] [&>div]:gap-[18px] [&>div]:border-b [&>div]:border-line [&>div]:py-[17px] max-md:[&>div]:grid-cols-[78px_1fr] [&_dd]:m-0 [&_dd]:text-[0.86rem] [&_dd]:leading-[1.58] [&_dd]:text-ink-soft [&_dt]:font-mono [&_dt]:text-[0.56rem] [&_dt]:uppercase [&_dt]:tracking-[0.1em] [&_dt]:text-rebar">
						<div>
							<dt>Based</dt>
							<dd>Ho Chi Minh City, Vietnam</dd>
						</div>
						<div>
							<dt>Education</dt>
							<dd>
								Software Engineering, Ton Duc Thang University (09/2020 -
								04/2025)
							</dd>
						</div>
						<div>
							<dt>Languages</dt>
							<dd>Vietnamese (native) / English (Aptis B2)</dd>
						</div>
						<div>
							<dt>Focus</dt>
							<dd>AI Product Builder / Full-stack TypeScript Developer</dd>
						</div>
					</dl>
					<a
						href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
						target="_blank"
						rel="noreferrer"
						className={projectTextLinkClass}
					>
						Read the full CV <span aria-hidden="true">↗</span>
					</a>
				</div>
			</div>
		</section>
	);
}
