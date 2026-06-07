
import { useState } from "react";
import axios from "axios";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/ToastProvider";
import { updateCurrentUserPassword } from "../services/userProfile.api";

export default function UpdateUserPassword({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	const getErrorMessage = (error: unknown, fallback: string) => {
		if (axios.isAxiosError(error)) {
			const message = error.response?.data?.message;
			if (typeof message === "string" && message.trim()) {
				return message;
			}
		}

		if (error instanceof Error && error.message) {
			return error.message;
		}

		return fallback;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);

		if (formData.newPassword !== formData.confirmPassword) {
			setError("New passwords don't match");
			return;
		}

		try {
			setLoading(true);
			const response = await updateCurrentUserPassword({
				password: formData.currentPassword,
				newPassword: formData.newPassword,
			});

			setSuccess(true);
			toast.success(response.message || "Password updated successfully");
			window.setTimeout(() => {
				onClose();
				setSuccess(false);
				setFormData({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
			}, 500);
		} catch (error) {
			setError(getErrorMessage(error, "Failed to update password"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} title="Update Password" onClose={onClose} hideFooter widthClassName="w-[92vw] max-w-md">
			<div className="space-y-4">
				{error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">{error}</div>}

				{success && (
					<div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900 dark:text-green-200">
						Password updated successfully!
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						label="Current Password"
						id="currentPassword"
						name="currentPassword"
						type="password"
						value={formData.currentPassword}
						onChange={handleChange}
						required
						placeholder="Enter current password"
						autoComplete="current-password"
					/>

					<Input
						label="New Password"
						id="newPassword"
						name="newPassword"
						type="password"
						value={formData.newPassword}
						onChange={handleChange}
						required
						minLength={6}
						placeholder="Enter new password"
						autoComplete="new-password"
					/>

					<Input
						label="Confirm New Password"
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						minLength={6}
						placeholder="Confirm new password"
						autoComplete="new-password"
					/>

					<div className="flex items-center justify-end gap-3 pt-2">
						<Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
							Cancel
						</Button>
						<Button type="submit" variant="primary" loading={loading} disabled={loading}>
							{loading ? "Updating..." : "Update Password"}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
