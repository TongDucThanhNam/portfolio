import {
	sectionHeadClass,
	sectionTagClass,
	sectionTagNumberClass,
	sectionTagRightClass,
} from "./styles";
import { cx } from "./utils";
import { ElasticRule } from "./visuals/ElasticRule";

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
			<span
				className="absolute -bottom-px left-0 h-px w-[min(190px,38%)] origin-left scale-x-0 bg-rebar transition-transform duration-[1100ms] ease-fluid group-data-[reveal-state=visible]:scale-x-100"
				aria-hidden="true"
			/>
			<ElasticRule />
		</div>
	);
}
