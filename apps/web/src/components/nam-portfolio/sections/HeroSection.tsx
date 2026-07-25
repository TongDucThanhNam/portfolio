import {
	buttonBaseClass,
	buttonGhostClass,
	buttonPrimaryClass,
} from "../styles";
import { cx } from "../utils";
import { HumanLoopPanel } from "../visuals/HumanLoopPanel";
import { SystemSignal } from "../visuals/SystemSignal";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative isolate h-[100dvh] min-h-[100dvh] overflow-hidden bg-bone px-pad-x pt-6 pb-[18px]
				[--display-fs:clamp(5.5rem,12vw,12.5rem)]
				[--human-left:2.3%]
				[--loop-bottom:9.5%]
				[--loop-fs:clamp(3.2rem,7.5vw,7.8rem)]
				[--portrait-h:clamp(420px,58vh,560px)]
				[--portrait-top:16%]
				[--portrait-w:clamp(300px,24vw,400px)]
				[--signal-x:50%]
				[--signal-y:50%]
				before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(rgba(22,20,15,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(22,20,15,0.035)_1px,transparent_1px)] before:bg-[length:48px_48px] before:opacity-[0.46] before:[mask-image:radial-gradient(circle_at_var(--signal-x)_var(--signal-y),black,transparent_62%)]
				after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:bg-[radial-gradient(circle_150px_at_var(--signal-x)_var(--signal-y),rgba(240,224,214,0.44),transparent_68%)]
				max-lg:[--display-fs:clamp(5rem,14vw,9rem)]
				max-lg:[--portrait-h:clamp(400px,60vh,540px)]
				max-lg:[--portrait-w:clamp(270px,36vw,370px)]
				max-md:px-5 max-md:pt-5
				max-md:[--display-fs:clamp(4rem,19vw,6.5rem)]
				max-md:[--human-left:-1.5%]
				max-md:[--loop-bottom:10%]
				max-md:[--loop-fs:clamp(2.5rem,11vw,4.5rem)]
				max-md:[--portrait-h:clamp(350px,49vh,430px)]
				max-md:[--portrait-top:29%]
				max-md:[--portrait-w:clamp(220px,64vw,280px)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--display-fs:clamp(5rem,10vw,8rem)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--loop-bottom:6%]
				[@media(min-width:900px)_and_(max-height:760px)]:[--loop-fs:clamp(2.6rem,5.1vw,5.2rem)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-h:clamp(410px,66vh,510px)]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-top:15%]
				[@media(min-width:900px)_and_(max-height:760px)]:[--portrait-w:clamp(300px,28vw,400px)]
				motion-reduce:after:hidden"
			data-signal-hero
		>
			<div className="absolute inset-x-pad-x top-7 z-8 grid grid-cols-[1fr_auto_1fr] items-start gap-8 font-mono text-[0.6rem] leading-[1.55] uppercase tracking-[0.12em] max-lg:grid-cols-[1fr_auto] max-md:inset-x-5 max-md:top-[22px] max-md:gap-4 max-md:text-left [&_p]:m-0 [&_p>small]:block [&_p>small]:text-[0.52rem] [&_p>small]:text-muted [&_p>span]:block max-md:[&_p:last-child]:hidden max-md:[&_p>small]:hidden [@media(min-width:900px)_and_(max-height:760px)]:top-6">
				<p>
					<span>Tong Duc Thanh Nam</span>
					<small>AI Product Builder / Full-stack TypeScript</small>
				</p>
				<p className="flex items-center gap-3 whitespace-nowrap text-ink-soft max-md:justify-end max-md:gap-1.5 max-md:text-[0.52rem] [&_span]:text-rebar">
					<span>AI drafts</span>
					<i
						className="font-serif text-xl not-italic text-muted"
						aria-hidden="true"
					>
						→
					</i>
					<span>Human decides</span>
				</p>
				<p className="justify-self-end text-right">
					<span>Ho Chi Minh City, Vietnam</span>
					<small>
						<span
							className="mr-[5px] inline-block h-1.5 w-1.5 animate-green-pulse rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"
							aria-hidden="true"
						/>{" "}
						Available for thoughtful work
					</small>
				</p>
			</div>

			<h1 className="pointer-events-none absolute inset-0 z-0 m-0">
				<span className="sr-only">
					Tong Duc Thanh Nam — The Human-in-the-Loop for AI Products &
					Full-stack TypeScript
				</span>
				<span
					className="absolute top-[11%] left-[var(--human-left)] translate-y-[calc(var(--hero-exit,0)*-5vh)] whitespace-nowrap font-serif text-[length:var(--display-fs)] leading-[0.72] font-normal tracking-[-0.07em] opacity-100 transition-[opacity,transform] duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:-translate-y-[14%] [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:top-[10%] max-md:leading-[0.78] motion-reduce:translate-y-0"
					aria-hidden="true"
				>
					HUMAN
				</span>
				<span
					className="absolute right-pad-x bottom-[var(--loop-bottom)] translate-y-[calc(var(--hero-exit,0)*8vh)] whitespace-nowrap font-serif text-[length:var(--loop-fs)] leading-[0.72] font-normal tracking-[-0.03em] text-ink-soft opacity-100 [word-spacing:0.16em] transition-[opacity,transform] delay-90 duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-[18%] [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:right-[2%] max-md:leading-[0.78] motion-reduce:translate-y-0"
					aria-hidden="true"
				>
					IN THE LOOP
				</span>
			</h1>

			<div className="absolute top-[35%] left-pad-x z-7 w-[min(23vw,330px)] opacity-100 transition-opacity delay-[220ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:top-[23%] max-md:left-5 max-md:w-[min(68vw,280px)]">
				<p className="m-0 text-[clamp(0.86rem,1.2vw,1.06rem)] leading-[1.6]">
					I design where humans belong in the loop — then build the full-stack
					products to power it.
				</p>
			</div>

			<div className="group absolute top-[var(--portrait-top)] left-[54%] z-3 h-[var(--portrait-h)] w-[var(--portrait-w)] translate-x-[-50%] translate-y-[calc(var(--hero-exit,0)*7vh)] opacity-100 transition-[opacity,transform] delay-160 duration-[1100ms] ease-fluid [[data-motion=full][data-motion-ready=false]_&]:translate-y-[10%] [[data-motion=full][data-motion-ready=false]_&]:opacity-0 max-md:left-[58%] motion-reduce:translate-y-0">
				<span className="absolute inset-0 z-2 overflow-hidden [mask-image:radial-gradient(ellipse_90%_76%_at_50%_23%,#000_0_82%,rgba(0,0,0,0.98)_86%,rgba(0,0,0,0.76)_91%,rgba(0,0,0,0.36)_96%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
					<img
						className="absolute -top-[2%] left-1/2 h-auto w-[120%] max-w-none -translate-x-1/2 rounded-none object-contain object-[50%_100%] mix-blend-multiply grayscale contrast-110 sepia-[0.06] transition-[filter,transform] duration-500 ease-fluid group-hover:grayscale-[0.82] group-hover:contrast-[1.08] group-hover:sepia-[0.03] max-md:-top-[3%] max-md:w-[132%]"
						src="/images/avatar-cutout.webp"
						alt="Tong Duc Thanh Nam"
						width="1024"
						height="1536"
						loading="eager"
						decoding="async"
					/>
				</span>
			</div>

			<SystemSignal />
			<HumanLoopPanel />

			<div className="absolute bottom-[12.5%] left-pad-x z-8 grid w-[min(250px,23vw)] gap-2.5 opacity-100 transition-opacity delay-[580ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:opacity-0 [&_a]:min-h-11 [&_a]:justify-between [&_a]:py-3 max-md:right-5 max-md:bottom-[8.8%] max-md:left-5 max-md:flex max-md:w-auto max-md:[&_a]:flex-1 max-md:[&_a]:px-[14px] max-md:[&_a]:text-[0.56rem] [@media(min-width:900px)_and_(max-height:760px)]:bottom-[12%]">
				<div className="group grid gap-[7px] max-md:flex-1">
					<a
						href="#projects"
						className={cx(buttonBaseClass, buttonPrimaryClass)}
					>
						Enter the system{" "}
						<span
							className="inline-block transition-transform duration-300 ease-fluid group-hover:translate-y-[3px]"
							aria-hidden="true"
						>
							↓
						</span>
					</a>
					<span className="pl-0.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted max-md:hidden">
						→ 9 product builds inside
					</span>
				</div>
				<a
					href="/Tong_Duc_Thanh_Nam_CV_EN.pdf"
					target="_blank"
					rel="noreferrer"
					className={cx(buttonBaseClass, buttonGhostClass)}
				>
					Open CV <span aria-hidden="true">↗</span>
				</a>
			</div>

			<dl className="absolute bottom-[clamp(40px,8vh,80px)] left-pad-x z-50 m-0 flex items-baseline gap-[clamp(22px,3.5vw,54px)] font-mono text-[0.52rem] uppercase tracking-[0.09em] opacity-100 transition-opacity delay-[580ms] duration-900 ease-fluid [[data-motion=full][data-motion-ready=false]_&]:opacity-0 [&>div]:flex [&>div]:flex-row-reverse [&>div]:gap-2 [&>div+div]:before:mr-[clamp(10px,1.6vw,24px)] [&>div+div]:before:content-['•'] [&_dd]:m-0 [&_dd]:text-ink [&_dt]:text-muted max-md:right-5 max-md:left-5 max-md:justify-between max-md:gap-2 max-md:text-[0.44rem] max-md:[&>div]:block max-md:[&>div+div]:before:hidden max-md:[&_dt]:hidden">
				<div>
					<dt>Browser extensions</dt>
					<dd>Chrome + Firefox</dd>
				</div>
				<div>
					<dt>Android app</dt>
					<dd>Published on Google Play</dd>
				</div>
				<div>
					<dt>Core stack</dt>
					<dd>TypeScript & AI</dd>
				</div>
			</dl>
		</section>
	);
}
