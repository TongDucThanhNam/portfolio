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
			<h2 className={sectionTagClass}>
				<span className={sectionTagNumberClass}>{num}</span>
				{title}
			</h2>
			<p className={cx(sectionTagClass, sectionTagRightClass)}>{detail}</p>
		</div>
	);
}
