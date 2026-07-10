export function FooterCol({
	title,
	items,
	hrefs,
}: {
	title: string;
	items: string[];
	hrefs: string[];
}) {
	return (
		<div className="flex flex-col gap-2">
			<p className="mb-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-rebar">
				{title}
			</p>
			{items.map((item, index) => (
				<a
					key={item}
					href={hrefs[index]}
					target={hrefs[index]?.startsWith("http") ? "_blank" : undefined}
					rel={hrefs[index]?.startsWith("http") ? "noreferrer" : undefined}
					className="text-[rgba(246,242,233,0.75)] transition hover:text-rebar"
				>
					{item}
				</a>
			))}
		</div>
	);
}
