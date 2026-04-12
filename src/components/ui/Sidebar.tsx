import UserProfile from "../layout/UserProfile";
import SidebarNavigation, { type NavItem } from "../layout/SidebarNavigation";
import {
	ClipboardCheck,
	LayoutDashboard,
	LogOut,
	SquarePlus,
	Users,
} from "lucide-react";

const items: NavItem[] = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Manage Tasks",
		active: true,
		icon: ClipboardCheck,
	},
	{
		label: "Create Task",
		icon: SquarePlus,
	},
	{
		label: "Team Members",
		icon: Users,
	},
	{
		label: "Logout",
		icon: LogOut,
	},
];

export default function Sidebar() {
	return (
		<aside className="flex h-full w-[340px] flex-col border-r-2 border-zinc-100 bg-white">
            <UserProfile />
			<SidebarNavigation items={items} />
		</aside>
	);
}
