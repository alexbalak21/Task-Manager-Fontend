
import { useState } from "react";
import { useParams } from "react-router";
import { useUsersStore } from "../state/users.store";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

export default function EditUserPage() {
	const { userId } = useParams();
	const user = useUsersStore((state) => state.users.find((u) => String(u.id) === String(userId)));
	const updateUser = useUsersStore((state) => state.updateUser);
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [profileImage, setProfileImage] = useState(user?.profileImage || "");
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!user) return <div className="p-8">User not found.</div>;

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				setProfileImage(ev.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setProfileImage("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		await updateUser({
			id: user.id,
			name,
			email,
			profileImage,
		});
		setIsSubmitting(false);
		// Optionally show a toast here
	};

	const handleChangePassword = async () => {
		// Implement password change logic here, e.g., call API
		setShowPasswordModal(false);
		setNewPassword("");
		// Optionally show a toast here
	};

	return (
		<div className="max-w-xl mx-auto p-8">
			<h2 className="text-2xl font-bold mb-6">Edit User</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block mb-2 font-medium">Name</label>
					<Input value={name} onChange={e => setName(e.target.value)} required />
				</div>
				<div>
					<label className="block mb-2 font-medium">Email</label>
					<Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label className="block mb-2 font-medium">Profile Image</label>
					{profileImage ? (
						<div className="mb-2 flex items-center gap-4">
							<img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border" />
							<Button type="button" variant="secondary" onClick={handleRemoveImage}>Remove</Button>
						</div>
					) : null}
					<Input type="file" accept="image/*" onChange={handleImageChange} />
				</div>
				<div>
					<Button type="button" variant="secondary" onClick={() => setShowPasswordModal(true)}>
						Change Password
					</Button>
				</div>
				<Button type="submit" loading={isSubmitting}>
					Save Changes
				</Button>
			</form>

			{showPasswordModal && (
				<Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Change Password">
					<div className="space-y-4">
						<Input
							type="password"
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							placeholder="New Password"
						/>
						<div className="flex gap-2 justify-end">
							<Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
							<Button onClick={handleChangePassword} disabled={!newPassword}>Update</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}
