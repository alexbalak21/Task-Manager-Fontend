import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { TeamsAPI, type TeamDto } from "../services/teams.api";

type CreateTeamModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onCreated: (team: TeamDto) => void;
};

export default function CreateTeamModal({ isOpen, onClose, onCreated }: CreateTeamModalProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const reset = () => {
		setName("");
		setDescription("");
		setError(null);
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleDone = async () => {
		if (!name.trim()) {
			setError("Team name is required");
			return;
		}

		setIsSubmitting(true);
		setError(null);
		try {
			const res = await TeamsAPI.create(name.trim(), description.trim() || undefined);
			onCreated(res.data);
			reset();
			onClose();
		} catch (err) {
			const apiMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
			setError(apiMessage ?? "Failed to create team");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			title="Create Team"
			onClose={handleClose}
			onCancel={handleClose}
			onDone={handleDone}
			doneText={isSubmitting ? "Creating..." : "Create"}
			doneLoading={isSubmitting}
			size="sm"
		>
			<div className="space-y-4 px-1">
				<div>
					<label htmlFor="teamName" className="mb-2 block text-lg font-medium text-gray-700">
						Team Name
					</label>
					<input
						id="teamName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Engineering"
						className="h-12 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-base text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
					/>
				</div>
				<div>
					<label htmlFor="teamDescription" className="mb-2 block text-lg font-medium text-gray-700">
						Description <span className="text-gray-400">(optional)</span>
					</label>
					<textarea
						id="teamDescription"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="What does this team work on?"
						rows={3}
						className="w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 py-3 text-base text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
					/>
				</div>
				{error ? <p className="text-sm text-red-600">{error}</p> : null}
			</div>
		</Modal>
	);
}
