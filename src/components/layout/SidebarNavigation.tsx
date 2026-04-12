import type { LucideIcon } from "lucide-react";

export type NavItem = {
	label: string;
	icon: LucideIcon;
	active?: boolean;
	onClick?: () => void;
};

type SidebarNavigationProps = {
	items: NavItem[];
};

export default function SidebarNavigation({ items }: SidebarNavigationProps) {
	return (
		<nav className="py-8">
			<ul className="grid gap-3">
				{items.map((item) => (
					<li key={item.label}>
						<button
							type="button"
							onClick={item.onClick}
							className={[
								"group flex w-full items-center gap-5 rounded-sm px-5 py-4 text-left text-lg",
								item.active
									? "relative bg-[#e4eaf5] text-[#32589f] before:absolute before:right-0 before:top-0 before:h-full before:w-1.25 before:bg-[#2f6de5]"
									: "text-[#151515] hover:bg-[#e9edf6]",
							].join(" ")}
						>
							<span className="shrink-0">
								<item.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
							</span>
							<span className="font-medium">{item.label}</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
