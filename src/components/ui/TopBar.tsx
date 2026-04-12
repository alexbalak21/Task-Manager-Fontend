interface TopBarProps {
	title?: string;
}

export default function TopBar({ title = "Task Manager" }: TopBarProps) {
	return (
		<header className="h-[80px] w-full border-b-2 border-zinc-100 bg-white">
			<div className="flex h-full items-center px-8 sm:px-12 lg:px-16">
				<h1 className="text-2xl font-semibold leading-none tracking-tight text-[#151515]">
					{title}
				</h1>
			</div>
		</header>
	);
}
