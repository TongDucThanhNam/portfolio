import {
	sectionHeadClass,
	sectionTagClass,
	sectionTagNumberClass,
	sectionTagRightClass,
} from "./styles";
import { cx } from "./utils";

export function SectionHead({
	num,
	title,
	detail,
}: {
	num: string;
	title: string;
	detail: string;
}) {
	return (
		<div className={sectionHeadClass} data-reveal="line">
			<p className={sectionTagClass}>
				<span className={sectionTagNumberClass}>{num}</span>
				{title}
			</p>
			<p className={cx(sectionTagClass, sectionTagRightClass)}>{detail}</p>
		</div>
	);
}
