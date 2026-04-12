type SidebarItem = {
	label: string;
	active?: boolean;
	icon: React.ReactNode;
};

const items: SidebarItem[] = [
	{
		label: "Dashboard",
		icon: (
			<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
				<rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
				<rect x="14" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
				<rect x="4" y="14" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
				<rect x="14" y="14" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
			</svg>
		),
	},
	{
		label: "Manage Tasks",
		active: true,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
				<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
				<path d="M8 4.5V2.8M16 4.5V2.8M8 11.8l2.3 2.3 5.1-5.1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		label: "Create Task",
		icon: (
			<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
				<rect x="3.8" y="3.8" width="16.4" height="16.4" rx="2" stroke="currentColor" strokeWidth="1.75" />
				<path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
			</svg>
		),
	},
	{
		label: "Team Members",
		icon: (
			<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
				<circle cx="8.5" cy="9" r="2.7" stroke="currentColor" strokeWidth="1.75" />
				<circle cx="16.5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.75" />
				<path d="M3.5 18.6a5.1 5.1 0 0110.2 0M13.6 18.6a3.8 3.8 0 017.6 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
			</svg>
		),
	},
	{
		label: "Logout",
		icon: (
			<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
				<path d="M10.5 4.5H6.8A1.8 1.8 0 005 6.3v11.4a1.8 1.8 0 001.8 1.8h3.7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
				<path d="M14 8l4 4-4 4M8.5 12H18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
];

export default function Sidebar() {
	return (
		<aside className="flex h-full w-[340px] flex-col border-r border-[#e6e8ee] bg-[#f3f3f5]">
			<div className="border-b border-[#eceef3] px-6 pb-8 pt-12 text-center">
				<img
					src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=160&q=80"
					alt="Profile avatar"
					className="mx-auto h-32 w-32 rounded-full object-cover"
				/>
				<div className="mx-auto mt-4 inline-flex rounded-lg bg-[#2f6de5] px-5 py-1.5 text-xl font-semibold text-white">
					Admin
				</div>
				<h2 className="mt-4 text-5xl font-semibold tracking-tight text-[#1d1d1f]">Mike</h2>
				<p className="mt-2 text-[1.75rem] text-[#4a4a4a]">mike@timetoprogram.com</p>
			</div>

			<nav className="px-4 py-8">
				<ul className="grid gap-3">
					{items.map((item) => (
						<li key={item.label}>
							<button
								type="button"
								className={[
									"group flex w-full items-center gap-5 rounded-sm px-4 py-4 text-left text-[2rem]",
									item.active
										? "relative bg-[#e4eaf5] text-[#32589f] before:absolute before:right-0 before:top-0 before:h-full before:w-[5px] before:bg-[#2f6de5]"
										: "text-[#151515] hover:bg-[#e9edf6]",
								].join(" ")}
							>
								<span className="shrink-0">{item.icon}</span>
								<span className="font-medium">{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
