import { memo } from "react";

type TypingKeyboardScreenProps = {
	text: string;
};

function TypingKeyboardScreenComponent({ text }: TypingKeyboardScreenProps) {
	return (
		<div className="tk-screen tk-flex">
			<div className="tk-screen__ambient" />
			<div className="tk-screen__camera" />
			<div className="tk-screen__panel">
				<div className="tk-screen__topbar">
					<span className="tk-screen__brand">
						<i /> AI match engine
					</span>
					<span>Live / 01</span>
				</div>

				<div className="tk-screen__workspace">
					<div className="tk-screen__terminal">
						<span className="tk-screen__eyebrow">Evidence stream</span>
						<p className="tk-screen__terminal-copy">
							<span>{text}</span>
							<span className="tk-screen__caret" />
						</p>
						<div className="tk-screen__progress">
							<span />
						</div>
					</div>

					<div className="tk-screen__telemetry">
						<span className="tk-screen__eyebrow">Fit score</span>
						<strong>
							94<sup>%</sup>
						</strong>
						<ul>
							<li>
								<span>Product</span>
								<i />
							</li>
							<li>
								<span>System</span>
								<i />
							</li>
							<li>
								<span>Proof</span>
								<i />
							</li>
						</ul>
					</div>
				</div>

				<div className="tk-screen__statusbar">
					<span>TS / AI / Edge</span>
					<span>
						<i /> Verified output
					</span>
				</div>
			</div>
			<div className="tk-screen__chin">
				<span />
			</div>
			<div className="tk-screen__stand-mount" />
			<div className="tk-screen__hinge" />
			<div className="tk-screen__stand-neck">
				<span className="tk-screen__stand-hole" />
			</div>
			<div className="tk-screen__stand-base" />
		</div>
	);
}

export const TypingKeyboardScreen = memo(TypingKeyboardScreenComponent);
