import { labelAccentClass, labelRuleClass, sectionPadClass } from "../styles";
import { cx } from "../utils";
import { ContactBlock } from "./ContactBlock";

export function ContactSection() {
	return (
		<section
			id="contact"
			className="relative overflow-hidden bg-ink text-paper"
		>
			<div className="pointer-events-none absolute inset-0">
				<div
					className="absolute right-[-10vw] top-[12vh] aspect-square w-[clamp(220px,36vw,560px)] rounded-full bg-[radial-gradient(circle,var(--color-rebar-soft),transparent_65%)] opacity-25"
					aria-hidden="true"
				/>
				<div className="absolute bottom-[-6vh] left-[4vw] animate-ghost font-serif text-[clamp(8rem,24vw,22rem)] italic leading-none tracking-[-0.06em] text-[rgba(246,242,233,0.07)] motion-reduce:animate-none">
					hi
				</div>
			</div>

			<div className={cx(sectionPadClass, "z-10")}>
				<p className={cx(labelAccentClass, "!text-paper")} data-reveal="rise">
					<span className={labelRuleClass} />
					Let's talk
				</p>
				<h2
					className="mt-8 max-w-[11em] font-serif text-[clamp(3.8rem,10vw,10rem)] leading-[0.9] tracking-[-0.04em]"
					data-reveal="mask"
				>
					Have a workflow worth turning into a{" "}
					<em className="font-light italic text-rebar">product</em>?
				</h2>

				<a
					href="mailto:tongducthanhnam@gmail.com"
					className="group mt-[clamp(48px,8vw,112px)] grid gap-6 border-y border-[rgba(246,242,233,0.18)] py-8 transition-colors hover:border-rebar md:grid-cols-[0.55fr_1fr_auto] md:items-center"
					data-reveal="rise"
				>
					<span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-rebar">
						Start a conversation
					</span>
					<span className="min-w-0 break-all font-serif text-[clamp(1.45rem,3.2vw,3.8rem)] leading-none tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2">
						tongducthanhnam@gmail.com
					</span>
					<span
						className="grid h-14 w-14 place-items-center rounded-full border border-[rgba(246,242,233,0.24)] font-serif text-2xl transition duration-500 group-hover:border-rebar group-hover:bg-rebar group-hover:text-ink md:h-20 md:w-20"
						aria-hidden="true"
					>
						↗
					</span>
				</a>

				<div
					className="mt-12 grid gap-8 border-b border-[rgba(246,242,233,0.18)] pb-12 sm:grid-cols-2 lg:grid-cols-4"
					data-reveal="rise"
				>
					<ContactBlock label="Phone">
						<a href="tel:+84869887363" className="transition hover:text-rebar">
							+84 869 887 363
						</a>
					</ContactBlock>
					<ContactBlock label="Based">
						Ho Chi Minh City, Vietnam / UTC +7
					</ContactBlock>
					<ContactBlock label="Elsewhere">
						<a
							href="https://github.com/TongDucThanhNam"
							target="_blank"
							rel="noreferrer"
							className="transition hover:text-rebar"
						>
							GitHub ↗
						</a>
						{" / "}
						<a
							href="https://tongducthanhnam.id.vn"
							target="_blank"
							rel="noreferrer"
							className="transition hover:text-rebar"
						>
							Portfolio ↗
						</a>
					</ContactBlock>
					<ContactBlock label="Full profile">
						<a
							href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
							target="_blank"
							rel="noreferrer"
							className="border-b border-rebar transition hover:text-rebar"
						>
							Open CV ↗
						</a>
					</ContactBlock>
				</div>

				<div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)]">
					<span>AI products / extensions / automation / full-stack</span>
					<span>Available for thoughtful work</span>
				</div>
			</div>
		</section>
	);
}
