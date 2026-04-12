interface TopBarProps {
	title?: string;
}

export default function TopBar({ title = "Task Manager" }: TopBarProps) {
	return (
		<header className="h-[86px] w-full border-b border-[#e6e8ee] bg-[#f3f3f5]">
			<div className="flex h-full items-center px-8 sm:px-12 lg:px-16">
				<h1 className="text-[44px] font-semibold leading-none tracking-tight text-[#151515]">
					{title}
				</h1>
			</div>
		</header>
	);
}
