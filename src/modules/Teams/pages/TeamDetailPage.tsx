import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, Copy, RefreshCw, Trash2, UserMinus, UserPlus } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";
import Avatar from "../../Users/components/Avatar";
import { TeamsAPI, type InviteCodeDto, type TeamDto } from "../services/teams.api";
import AddTeamMemberModal from "../components/AddTeamMemberModal";
import CreateMemberModal from "../components/CreateMemberModal";

export default function TeamDetailPage() {
	const { teamId } = useParams<{ teamId: string }>();
	const navigate = useNavigate();
	const currentUser = useAuthStore((state) => state.user);
	const role = currentUser?.role?.toLowerCase();

	const [team, setTeam] = useState<TeamDto | null>(null);
	const [inviteCode, setInviteCode] = useState<InviteCodeDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAddMemberModal, setShowAddMemberModal] = useState(false);
	const [showCreateMemberModal, setShowCreateMemberModal] = useState(false);
	const [copied, setCopied] = useState(false);
	const [isRegenerating, setIsRegenerating] = useState(false);

	const canManage =
		!!team && (role === "admin" || (role === "manager" && team.created_by === currentUser?.id));

	const loadTeam = () => {
		if (!teamId) return;
		setIsLoading(true);
		setError(null);
		TeamsAPI.get(Number(teamId))
			.then((res) => setTeam(res.data))
			.catch(() => setError("Failed to load team"))
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		loadTeam();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teamId]);

	useEffect(() => {
		if (!teamId || !canManage) return;
		TeamsAPI.getInviteCode(Number(teamId))
			.then((res) => setInviteCode(res.data))
			.catch(() => undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teamId, canManage]);

	const handleCopyCode = () => {
		if (!inviteCode) return;
		navigator.clipboard.writeText(inviteCode.code).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	const handleRegenerateCode = async () => {
		if (!teamId) return;
		setIsRegenerating(true);
		try {
			const res = await TeamsAPI.regenerateInviteCode(Number(teamId));
			setInviteCode(res.data);
		} finally {
			setIsRegenerating(false);
		}
	};

	const handleRemoveMember = async (userId: number) => {
		if (!teamId) return;
		await TeamsAPI.removeMember(Number(teamId), userId);
		loadTeam();
	};

	const handleDeleteTeam = async () => {
		if (!teamId) return;
		if (!window.confirm(`Delete "${team?.name}"? This cannot be undone.`)) return;
		await TeamsAPI.remove(Number(teamId));
		navigate("/teams", { replace: true });
	};

	if (isLoading) {
		return (
			<AppShellLayout>
				<div className="px-4 py-12 text-center text-gray-500 sm:px-6 lg:px-8">Loading team...</div>
			</AppShellLayout>
		);
	}

	if (error || !team) {
		return (
			<AppShellLayout>
				<div className="px-4 py-12 text-center text-red-600 sm:px-6 lg:px-8">{error ?? "Team not found"}</div>
			</AppShellLayout>
		);
	}

	return (
		<AppShellLayout>
			<section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
				<button
					type="button"
					onClick={() => navigate("/teams")}
					className="mb-4 inline-flex items-center gap-1.5 text-base font-medium text-gray-600 hover:text-gray-900"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Teams
				</button>

				<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
					<div>
						<h2 className="text-4xl font-semibold tracking-tight text-[#111111]">{team.name}</h2>
						{team.description && <p className="mt-1 text-lg text-gray-600">{team.description}</p>}
						{team.manager_name && (
							<p className="mt-1 text-sm text-gray-500">Managed by {team.manager_name}</p>
						)}
					</div>

					{canManage && (
						<button
							type="button"
							onClick={handleDeleteTeam}
							className="inline-flex items-center gap-2 rounded-lg border-2 border-red-200 px-4 py-2.5 text-base font-medium text-red-600 transition-colors hover:bg-red-50"
						>
							<Trash2 className="h-4 w-4" />
							Delete Team
						</button>
					)}
				</div>

				{canManage && (
					<div className="mb-6 rounded-xl border-2 border-zinc-100 bg-white p-5">
						<h3 className="text-xl font-semibold text-[#111111]">Invite Code</h3>
						<p className="mt-1 text-sm text-gray-600">
							Share this code so members can join this team when they sign up.
						</p>
						<div className="mt-3 flex flex-wrap items-center gap-3">
							<code className="rounded-lg bg-[#f5f5f7] px-4 py-2.5 text-xl font-semibold tracking-widest text-[#1f1f1f]">
								{inviteCode?.code ?? "..."}
							</code>
							<button
								type="button"
								onClick={handleCopyCode}
								disabled={!inviteCode}
								className="inline-flex items-center gap-1.5 rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-50 disabled:opacity-50"
							>
								{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
								{copied ? "Copied" : "Copy"}
							</button>
							<button
								type="button"
								onClick={handleRegenerateCode}
								disabled={isRegenerating}
								className="inline-flex items-center gap-1.5 rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-50 disabled:opacity-50"
							>
								<RefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
								Regenerate
							</button>
						</div>
					</div>
				)}

				<div className="flex items-center justify-between gap-4">
					<h3 className="text-2xl font-semibold text-[#111111]">
						Members ({team.members?.length ?? 0})
					</h3>
					{canManage && (
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setShowCreateMemberModal(true)}
								className="inline-flex items-center gap-2 rounded-lg border-2 border-zinc-200 px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-zinc-50"
							>
								<UserPlus className="h-4 w-4" />
								Create Member
							</button>
							<button
								type="button"
								onClick={() => setShowAddMemberModal(true)}
								className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-base font-medium text-white hover:bg-primary-600"
							>
								<UserPlus className="h-4 w-4" />
								Add Existing
							</button>
						</div>
					)}
				</div>

				<div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{(team.members ?? []).length === 0 ? (
						<div className="col-span-full rounded-lg border-2 border-dashed border-zinc-200 py-10 text-center text-gray-500">
							No members yet.
						</div>
					) : (
						team.members?.map((member) => (
							<div
								key={member.id}
								className="flex items-center justify-between gap-3 rounded-xl border-2 border-zinc-100 bg-white p-4"
							>
								<div className="flex min-w-0 items-center gap-3">
									<Avatar name={member.name} size={40} />
									<div className="min-w-0">
										<p className="truncate text-base font-semibold text-black">{member.name}</p>
										<p className="truncate text-sm text-gray-600">{member.email}</p>
									</div>
								</div>
								{canManage && (
									<button
										type="button"
										onClick={() => handleRemoveMember(member.user_id)}
										aria-label={`Remove ${member.name}`}
										className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
									>
										<UserMinus className="h-5 w-5" />
									</button>
								)}
							</div>
						))
					)}
				</div>
			</section>

			{canManage && (
				<>
					<AddTeamMemberModal
						isOpen={showAddMemberModal}
						onClose={() => setShowAddMemberModal(false)}
						teamId={team.id}
						existingMemberUserIds={(team.members ?? []).map((m) => m.user_id)}
						onAdded={loadTeam}
					/>
					<CreateMemberModal
						isOpen={showCreateMemberModal}
						onClose={() => setShowCreateMemberModal(false)}
						teamId={team.id}
						onCreated={loadTeam}
					/>
				</>
			)}
		</AppShellLayout>
	);
}
