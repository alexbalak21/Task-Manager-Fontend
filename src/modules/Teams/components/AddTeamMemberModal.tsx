import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import Avatar from "../../Users/components/Avatar";
import { getAllUsers, type UserDto } from "../../Users/services/users.api";
import { TeamsAPI } from "../services/teams.api";

type AddTeamMemberModalProps = {
	isOpen: boolean;
	onClose: () => void;
	teamId: number;
	existingMemberUserIds: number[];
	onAdded: () => void;
};

export default function AddTeamMemberModal({
	isOpen,
	onClose,
	teamId,
	existingMemberUserIds,
	onAdded,
}: AddTeamMemberModalProps) {
	const [candidates, setCandidates] = useState<UserDto[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [addingUserId, setAddingUserId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		setError(null);
		setIsLoading(true);
		getAllUsers()
			.then((users) => {
				setCandidates(
					users.filter((u) => u.role === "member" && !existingMemberUserIds.includes(u.id)),
				);
			})
			.catch(() => setError("Failed to load members"))
			.finally(() => setIsLoading(false));
	}, [isOpen, existingMemberUserIds]);

	const handleAdd = async (userId: number) => {
		setAddingUserId(userId);
		setError(null);
		try {
			await TeamsAPI.addMember(teamId, userId);
			setCandidates((prev) => prev.filter((u) => u.id !== userId));
			onAdded();
		} catch (err) {
			const apiMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
			setError(apiMessage ?? "Failed to add member");
		} finally {
			setAddingUserId(null);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			title="Add Member"
			onClose={onClose}
			hideFooter
			widthClassName="w-[98vw] max-w-[640px]"
			contentClassName="!min-h-0 !p-0"
		>
			<div className="max-h-[58vh] overflow-y-auto px-6 py-2 sm:px-7">
				{isLoading ? (
					<div className="py-8 text-center text-gray-500">Loading...</div>
				) : candidates.length === 0 ? (
					<div className="py-8 text-center text-gray-500">
						No members available to add. Everyone eligible is already on this team.
					</div>
				) : (
					candidates.map((user) => (
						<div
							key={user.id}
							className="flex items-center justify-between gap-4 border-b border-zinc-200 py-4 last:border-b-0"
						>
							<div className="flex min-w-0 items-center gap-3">
								<Avatar name={user.name} profile_image={user.profile_image} size={40} />
								<div className="min-w-0">
									<p className="truncate text-base font-semibold text-black">{user.name}</p>
									<p className="truncate text-sm text-gray-600">{user.email}</p>
								</div>
							</div>
							<button
								type="button"
								onClick={() => handleAdd(user.id)}
								disabled={addingUserId === user.id}
								className="shrink-0 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
							>
								{addingUserId === user.id ? "Adding..." : "Add"}
							</button>
						</div>
					))
				)}
				{error ? <p className="pb-4 text-sm text-red-600">{error}</p> : null}
			</div>
		</Modal>
	);
}
