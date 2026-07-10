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
		<div className="section-head">
			<h2 className="section-tag">
				<span className="section-tag-num">{num}</span>
				{title}
			</h2>
			<p className="section-tag-right">{detail}</p>
		</div>
	);
}
