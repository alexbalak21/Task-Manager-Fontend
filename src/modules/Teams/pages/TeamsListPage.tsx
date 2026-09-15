import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Users } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";
import { TeamsAPI, type TeamDto } from "../services/teams.api";
import CreateTeamModal from "../components/CreateTeamModal";

export default function TeamsListPage() {
	const role = useAuthStore((state) => state.user?.role?.toLowerCase());
	const canCreateTeams = role === "admin" || role === "manager";

	const [teams, setTeams] = useState<TeamDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const loadTeams = () => {
		setIsLoading(true);
		setError(null);
		TeamsAPI.list()
			.then((res) => setTeams(res.data))
			.catch(() => setError("Failed to load teams"))
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		loadTeams();
	}, []);

	return (
		<AppShellLayout>
			<section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
					<h2 className="text-4xl font-semibold tracking-tight text-[#111111]">Teams</h2>

					{canCreateTeams && (
						<button
							type="button"
							onClick={() => setShowCreateModal(true)}
							className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-primary-600"
						>
							<Plus className="h-5 w-5" strokeWidth={2} />
							<span>Create Team</span>
						</button>
					)}
				</div>

				{isLoading ? (
					<div className="py-12 text-center text-gray-500">Loading teams...</div>
				) : error ? (
					<div className="py-12 text-center text-red-600">{error}</div>
				) : teams.length === 0 ? (
					<div className="rounded-lg border-2 border-dashed border-zinc-200 py-16 text-center text-gray-500">
						{canCreateTeams
							? "No teams yet. Create your first team to get started."
							: "You're not part of any team yet."}
					</div>
				) : (
					<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
						{teams.map((team) => (
							<Link
								key={team.id}
								to={`/teams/${team.id}`}
								className="block rounded-xl border-2 border-zinc-100 bg-white p-5 transition-colors hover:border-primary-200"
							>
								<h3 className="truncate text-2xl font-semibold text-[#111111]">{team.name}</h3>
								{team.description && (
									<p className="mt-1 line-clamp-2 text-base text-gray-600">{team.description}</p>
								)}
								<div className="mt-4 flex items-center justify-between text-sm text-gray-500">
									<span className="flex items-center gap-1.5">
										<Users className="h-4 w-4" />
										{team.member_count} member{team.member_count === 1 ? "" : "s"}
									</span>
									{team.manager_name && <span>Managed by {team.manager_name}</span>}
								</div>
							</Link>
						))}
					</div>
				)}
			</section>

			<CreateTeamModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				onCreated={(team) => setTeams((prev) => [...prev, team])}
			/>
		</AppShellLayout>
	);
}
