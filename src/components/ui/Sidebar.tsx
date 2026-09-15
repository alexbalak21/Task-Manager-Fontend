import SidebarNavigation, { type NavItem } from "../layout/SidebarNavigation";
import {
	ClipboardCheck,
	LayoutDashboard,
	SquarePlus,
	Users,
	UsersRound,
} from "lucide-react";
import { useAuthStore } from "../../modules/auth/state/auth.store";

export default function Sidebar() {
	const user = useAuthStore((state) => state.user);
	const isAdmin = user?.role?.toLowerCase() === "admin";

	const items: NavItem[] = [
		{
			label: "Dashboard",
			icon: LayoutDashboard,
			to: "/home",
		},
		{
			label: "Manage Tasks",
			icon: ClipboardCheck,
			to: "/tasks",
		},
		{
			label: "Teams",
			icon: UsersRound,
			to: "/teams",
		},
		...(isAdmin
			? [
				{
					label: "Create Task",
					icon: SquarePlus,
					to: "/tasks/create",
				},
				{
					label: "Team Members",
					icon: Users,
					to: "/team-members",
				},
			  ]
			: []),
	];

	return (
		<aside className="flex h-full w-85 flex-col border-r-2 border-zinc-100 bg-white">
			<SidebarNavigation items={items} />
		</aside>
	);
}
