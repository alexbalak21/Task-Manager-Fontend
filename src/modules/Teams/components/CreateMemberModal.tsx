import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { api } from "../../../services/api";

type CreateMemberModalProps = {
	isOpen: boolean;
	onClose: () => void;
	teamId: number;
	onCreated: () => void;
};

export default function CreateMemberModal({ isOpen, onClose, teamId, onCreated }: CreateMemberModalProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const reset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setError(null);
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleDone = async () => {
		if (!name.trim() || !email.trim() || password.length < 8) {
			setError("Name, email, and an 8+ character password are required");
			return;
		}

		setIsSubmitting(true);
		setError(null);
		try {
			await api.post("/api/users", {
				name: name.trim(),
				email: email.trim(),
				password,
				role: "member",
				team_id: teamId,
			});
			onCreated();
			reset();
			onClose();
		} catch (err) {
			const apiMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
			setError(apiMessage ?? "Failed to create member");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			title="Create New Member"
			onClose={handleClose}
			onCancel={handleClose}
			onDone={handleDone}
			doneText={isSubmitting ? "Creating..." : "Create"}
			doneLoading={isSubmitting}
			size="sm"
		>
			<div className="space-y-4 px-1">
				<div>
					<label htmlFor="memberName" className="mb-2 block text-lg font-medium text-gray-700">
						Full Name
					</label>
					<input
						id="memberName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Jane Doe"
						className="h-12 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-base text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
					/>
				</div>
				<div>
					<label htmlFor="memberEmail" className="mb-2 block text-lg font-medium text-gray-700">
						Email Address
					</label>
					<input
						id="memberEmail"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="jane@example.com"
						className="h-12 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-base text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
					/>
				</div>
				<div>
					<label htmlFor="memberPassword" className="mb-2 block text-lg font-medium text-gray-700">
						Temporary Password
					</label>
					<input
						id="memberPassword"
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Min 8 characters"
						className="h-12 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-base text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
					/>
				</div>
				{error ? <p className="text-sm text-red-600">{error}</p> : null}
			</div>
		</Modal>
	);
}
