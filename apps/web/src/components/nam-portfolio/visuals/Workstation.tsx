import { memo } from "react";

import { TypingKeyboard } from "./TypingKeyboard";

const workstationText =
	"THANH NAM / SHIPS AI PRODUCTS. FULL-STACK TYPESCRIPT. EDGE APIS. STREAMING UX.       ";

function WorkstationComponent() {
	return (
		<div
			className="hero-workstation absolute bottom-[6dvh] right-pad-x z-10 hidden w-[min(49vw,660px)] lg:block"
			aria-hidden="true"
		>
			<div className="h-[clamp(340px,35vw,480px)] w-full overflow-visible">
				<TypingKeyboard autoTypeText={workstationText} />
			</div>
		</div>
	);
}

export const Workstation = memo(WorkstationComponent);
