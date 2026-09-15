import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, LogOut, UserPen } from "lucide-react";
import Avatar from "../../modules/Users/components/Avatar";
import EditUserProfile from "../../modules/UserProfile/partials/EditUserProfile";
import { useAuthStore } from "../../modules/auth/state/auth.store";

interface TopBarProps {
	title?: string;
}

export default function TopBar({ title = "Task Manager" }: TopBarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		setIsMenuOpen(false);
		logout();
		navigate("/login", { replace: true });
	};

	const handleEditProfile = () => {
		setIsMenuOpen(false);
		setShowEditModal(true);
	};

	return (
		<header className="h-20 w-full border-b-2 border-zinc-100 bg-white">
			<div className="flex h-full items-center justify-between px-8 sm:px-12 lg:px-16">
				<h1 className="text-2xl font-semibold leading-none tracking-tight text-[#151515]">
					{title}
				</h1>

				<div className="relative" ref={menuRef}>
					<button
						type="button"
						onClick={() => setIsMenuOpen((open) => !open)}
						className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-zinc-100"
					>
						<Avatar name={user?.name} profile_image={user?.profileImage} size={40} />
						<ChevronDown
							size={18}
							className={`mr-1 text-[#4a4a4a] transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
						/>
					</button>

					{isMenuOpen && (
						<div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-lg">
							<div className="border-b border-zinc-100 px-4 py-3">
								<p className="truncate text-sm font-semibold text-[#151515]">{user?.name}</p>
								<p className="truncate text-xs text-[#4a4a4a]">{user?.email}</p>
							</div>
							<button
								type="button"
								onClick={handleEditProfile}
								className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#151515] transition-colors hover:bg-zinc-50"
							>
								<UserPen size={16} />
								Edit Profile
							</button>
							<button
								type="button"
								onClick={handleLogout}
								className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
							>
								<LogOut size={16} />
								Logout
							</button>
						</div>
					)}
				</div>
			</div>

			{showEditModal && (
				<EditUserProfile isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
			)}
		</header>
	);
}
