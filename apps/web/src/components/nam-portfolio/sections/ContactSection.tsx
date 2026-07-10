import type { FormEvent } from "react";
import { useState } from "react";

import { ContactBlock } from "./ContactBlock";

export function ContactSection() {
	const [note, setNote] = useState("");

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const name = String(formData.get("name") ?? "").trim();
		const email = String(formData.get("email") ?? "").trim();

		if (!name || !email) {
			setNote("Name and email are required before sending.");
			return;
		}

		setNote("Draft captured. Email Nam directly for the fastest response.");
		form.reset();
	};

	return (
		<section
			id="contact"
			className="relative overflow-hidden bg-ink text-paper"
		>
			<div className="pointer-events-none absolute inset-0 opacity-90">
				<div className="contact-glow absolute right-[-10vw] top-[12vh] h-[clamp(220px,36vw,560px)] w-[clamp(220px,36vw,560px)] rounded-full bg-[radial-gradient(circle,var(--rebar-soft),transparent_65%)] opacity-30" />
				<div className="contact-ghost absolute bottom-[-6vh] left-[4vw] font-serif text-[clamp(8rem,24vw,22rem)] italic leading-none tracking-[-0.06em] text-[rgba(246,242,233,0.07)]">
					hi
				</div>
			</div>
			<div className="section-pad relative z-10">
				<p className="label-accent reveal !text-paper">
					<span className="label-rule" />
					Let's talk
				</p>
				<h2
					className="motion-title mt-8 font-serif text-[clamp(3.8rem,10vw,10rem)] leading-[0.9] tracking-[-0.04em]"
					data-motion-title
				>
					Building something?
					<br />
					Let's <em className="font-light italic text-rebar">talk</em>.
				</h2>
				<div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_0.7fr]">
					<div className="reveal flex flex-col gap-8">
						<ContactBlock label="Email">
							<a
								href="mailto:tongducthanhnam@gmail.com"
								className="border-b border-rebar text-paper transition hover:text-rebar-soft"
							>
								tongducthanhnam@gmail.com
							</a>
						</ContactBlock>
						<ContactBlock label="Phone">0869 887 363</ContactBlock>
						<ContactBlock label="Based">
							Ho Chi Minh City, Vietnam / UTC +7
						</ContactBlock>
						<ContactBlock label="Elsewhere">
							<a
								href="https://github.com/TongDucThanhNam"
								target="_blank"
								rel="noreferrer"
								className="hover:text-rebar"
							>
								GitHub
							</a>{" "}
							/{" "}
							<a
								href="https://tongducthanhnam.id.vn"
								target="_blank"
								rel="noreferrer"
								className="hover:text-rebar"
							>
								tongducthanhnam.id.vn
							</a>
						</ContactBlock>
					</div>
					<form className="reveal" noValidate onSubmit={onSubmit}>
						<p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-rebar">
							Send a message
						</p>
						<div className="field">
							<input
								type="text"
								name="name"
								id="cf-name"
								required
								placeholder=" "
							/>
							<label htmlFor="cf-name">Your name</label>
						</div>
						<div className="field">
							<input
								type="email"
								name="email"
								id="cf-email"
								required
								placeholder=" "
							/>
							<label htmlFor="cf-email">Your email</label>
						</div>
						<div className="field">
							<textarea name="message" id="cf-msg" rows={3} placeholder=" " />
							<label htmlFor="cf-msg">Message</label>
						</div>
						<button
							type="submit"
							className="btn-primary mt-3 w-full bg-rebar hover:bg-paper hover:text-ink"
							data-cursor-label="SEND"
						>
							Send Message
						</button>
						<p
							className="mt-4 min-h-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[rgba(246,242,233,0.6)]"
							aria-live="polite"
						>
							{note}
						</p>
					</form>
				</div>
				<div className="reveal mt-20 flex flex-col items-center gap-4">
					<a
						href="mailto:tongducthanhnam@gmail.com"
						className="contact-orb magnetic-target relative grid h-[clamp(138px,18vw,220px)] w-[clamp(138px,18vw,220px)] place-items-center rounded-full border border-[rgba(246,242,233,0.2)] transition duration-500 hover:border-rebar hover:bg-rebar-soft hover:text-ink"
						data-cursor-label="EMAIL"
						data-cursor-stick
						data-magnetic
					>
						<span
							className="absolute inset-0 grid place-items-center transition-transform duration-500"
							data-magnetic-inner
						>
							<span className="absolute inset-3">
								<svg
									viewBox="0 0 100 100"
									className="contact-orb-type h-full w-full animate-[spin_22s_linear_infinite] overflow-visible"
									aria-hidden="true"
								>
									<defs>
										<path
											id="contact-orbit-path"
											d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
										/>
									</defs>
									<text
										fill="currentColor"
										className="font-mono text-[5px] uppercase tracking-[0.18em]"
									>
										<textPath href="#contact-orbit-path" startOffset="0%">
											Available for thoughtful work - HCMC / UTC+7 -
										</textPath>
									</text>
								</svg>
							</span>
							<span className="relative z-10 flex flex-col items-center font-mono text-[0.78rem] uppercase tracking-[0.16em]">
								<span>Get</span>
								<span>In touch</span>
							</span>
						</span>
					</a>
					<p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)]">
						I read every message
					</p>
				</div>
			</div>
		</section>
	);
}
