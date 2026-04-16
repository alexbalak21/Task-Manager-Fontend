import SidebarNavigation, { type NavItem } from "../layout/SidebarNavigation";
import {
	ClipboardCheck,
	LayoutDashboard,
	LogOut,
	SquarePlus,
	Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../modules/auth/state/auth.store";
import SidebarUserProfile from "../../modules/Users/components/SidebarUserProfile";

export default function Sidebar() {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);

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
			label: "Create Task",
			icon: SquarePlus,
			to: "/tasks/create",
		},
		{
			label: "Team Members",
			icon: Users,
			to: "/team-members",
		},
		{
			label: "Logout",
			icon: LogOut,
			onClick: () => {
				logout();
				navigate("/login", { replace: true });
			},
		},
	];

	return (
		<aside className="flex h-full w-85 flex-col border-r-2 border-zinc-100 bg-white">
			<SidebarUserProfile
				name={user?.name || ""}
				email={user?.email || ""}
				profile_image={user?.profileImage || ""}
				userId={user?.id || ""}
			/>
			<SidebarNavigation items={items} />
		</aside>
	);
}
