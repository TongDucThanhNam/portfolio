import { FooterCol } from "./FooterCol";

export function Footer() {
	return (
		<footer className="bg-ink px-pad-x pb-8 pt-[clamp(56px,8vw,96px)] text-paper">
			<div className="grid gap-10 border-t border-[rgba(246,242,233,0.12)] pt-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr]">
				<div>
					<p className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] tracking-[-0.02em]">
						Thanh<span className="text-rebar"> .</span> Nam
					</p>
					<p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.55)]">
						Full-stack TypeScript Engineer / HCMC
					</p>
				</div>
				<FooterCol
					title="Chapters"
					items={["About", "Experience", "Skills", "Work"]}
					hrefs={["#about", "#experience", "#skills", "#projects"]}
				/>
				<FooterCol
					title="Work"
					items={["Eragear", "GitHub", "Seller Keyboard"]}
					hrefs={[
						"https://eragear.app",
						"https://github.com/TongDucThanhNam",
						"https://play.google.com/store/apps/details?id=com.terasumi.sellerkeyboard",
					]}
				/>
				<div className="flex flex-col gap-2">
					<p className="mb-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-rebar">
						Signal
					</p>
					<span className="text-[rgba(246,242,233,0.75)]">
						SE Graduate / TDTU 2025
					</span>
					<span className="text-[rgba(246,242,233,0.75)]">
						English / Aptis B2
					</span>
					<span className="text-[rgba(246,242,233,0.75)]">
						Vietnamese / Native
					</span>
				</div>
			</div>
			<div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-[rgba(246,242,233,0.12)] pt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[rgba(246,242,233,0.5)]">
				<span>(c) 2026 TONG DUC THANH NAM</span>
				<span>HCMC / VN / UTC+7</span>
				<span>v2.0</span>
			</div>
		</footer>
	);
}
