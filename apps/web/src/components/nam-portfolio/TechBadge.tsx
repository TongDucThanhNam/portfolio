import type { ComponentPropsWithoutRef } from "react";
import { getTechIcon, TechIcon } from "./TechIcon";
import { cx } from "./utils";

export interface TechBadgeProps extends ComponentPropsWithoutRef<"span"> {
	name: string;
	showIcon?: boolean;
}

export function TechBadge({
	name,
	showIcon = true,
	className,
	...props
}: TechBadgeProps) {
	// If the name is a compound string like "Node.js / Express.js" or "React / Next.js",
	// check if parts have separate icons
	const parts = name.includes(" / ") ? name.split(" / ") : [name];
	const icons = parts
		.map((part) => ({ part, icon: getTechIcon(part) }))
		.filter((item) => item.icon !== null);

	return (
		<span
			className={cx(
				"group/badge inline-flex items-center gap-1.5 rounded-pill border border-line bg-paper/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-[color,border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-rebar hover:bg-paper hover:shadow-[0_2px_8px_rgba(184,66,46,0.12)]",
				className,
			)}
			{...props}
		>
			{showIcon && (
				<span className="flex items-center gap-1">
					{icons.length > 0 ? (
						icons.map(({ part }) => (
							<TechIcon
								key={part}
								name={part}
								className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/badge:scale-110"
							/>
						))
					) : (
						<span
							className="h-1.5 w-1.5 rounded-full bg-rebar"
							aria-hidden="true"
						/>
					)}
				</span>
			)}
			<span>{name}</span>
		</span>
	);
}

export function TechBadgeList({
	items,
	className,
	splitCompound = false,
}: {
	items: string[];
	className?: string;
	splitCompound?: boolean;
}) {
	const flattenedItems = splitCompound
		? items.flatMap((item) =>
				item.includes(" / ") ? item.split(" / ") : [item],
			)
		: items;

	return (
		<div className={cx("flex flex-wrap gap-1.5", className)}>
			{flattenedItems.map((item) => (
				<TechBadge key={item} name={item} />
			))}
		</div>
	);
}
