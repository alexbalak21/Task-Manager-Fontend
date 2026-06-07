import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/ToastProvider";
import Avatar from "../../Users/components/Avatar";
import { useAuthStore } from "../../auth/state/auth.store";
import { Pencil, Upload, X } from "lucide-react";
import EditableField from "../components/EditableField";
import UpdateUserPassword from "./UpdateUserPassword";
import {
	deleteProfileImage,
	normalizeUserProfile,
	updateCurrentUserProfile,
	uploadProfileImage,
} from "../services/userProfile.api";

interface EditUserProfileProps {
	isOpen: boolean;
	onClose: () => void;
}

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

export default function EditUserProfile({ isOpen, onClose }: EditUserProfileProps) {
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const toast = useToast();
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [imageUploading, setImageUploading] = useState(false);
	const [imageDeleting, setImageDeleting] = useState(false);

	useEffect(() => {
		if (!isOpen || !user) {
			return;
		}

		setName(user.name);
		setEmail(user.email);
		setProfileImage(user.profileImage ?? null);
		setError(null);
	}, [isOpen, user]);

	const handleProfileFieldSave = async (payload: { name?: string; email?: string }) => {
		if (!user) {
			throw new Error("User information is not available yet");
		}

		setError(null);
		const updated = normalizeUserProfile(await updateCurrentUserProfile(payload));
		setUser({ ...user, ...updated });
		setName(updated.name);
		setEmail(updated.email);
	};

	const handleImageDelete = async () => {
		if (!user) {
			return;
		}

		setImageDeleting(true);
		setError(null);

		try {
			const response = await deleteProfileImage();
			if (response.success) {
				setProfileImage(null);
				setUser({ ...user, profileImage: null });
			} else {
				throw new Error(response.message || "Failed to delete image");
			}
		} catch (error) {
			setError(getErrorMessage(error, "Failed to delete image"));
		} finally {
			setImageDeleting(false);
		}
	};

	const handleImageUpload = async (file: File) => {
		if (!user) {
			return;
		}

		setImageUploading(true);
		setError(null);

		try {
			const response = await uploadProfileImage(file);
			if (response.success && response.profileImage) {
				setProfileImage(response.profileImage);
				setUser({ ...user, profileImage: response.profileImage });
				toast.success(response.message || "Profile image uploaded successfully");
			} else {
				throw new Error(response.message || "Failed to upload image");
			}
		} catch (error) {
			setError(getErrorMessage(error, "Failed to upload image"));
		} finally {
			setImageUploading(false);
		}
	};

	if (!user) {
		return (
			<Modal isOpen={isOpen} onClose={onClose} title="Update Profile" hideFooter>
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600" />
						<p className="mt-2 text-gray-600">Loading user information...</p>
					</div>
				</div>
			</Modal>
		);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Update Profile" hideFooter widthClassName="w-[96vw] max-w-3xl">
			<div className="space-y-8">
				<div className="flex justify-center">
					<div className="relative group">
						<Avatar name={name || user.name} profile_image={profileImage ?? undefined} size={96} />
						<div className="mt-3 flex justify-center">
							<div className="flex gap-1 rounded-full bg-white/80 p-1 shadow-md transition-opacity opacity-80 hover:opacity-100 dark:bg-gray-800/80">
								<label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(event) => {
											const file = event.target.files?.[0];
											if (file) {
												void handleImageUpload(file);
												event.target.value = "";
											}
										}}
										disabled={imageUploading}
									/>
									<Upload className="h-6 w-6 text-gray-500" />
								</label>
								{profileImage && (
									<button
										type="button"
										className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
										onClick={() => void handleImageDelete()}
										aria-label="Remove profile image"
										disabled={imageDeleting}
									>
										<X className="h-6 w-6 text-gray-500" />
									</button>
								)}
							</div>
						</div>
						<div className="mt-2 text-center text-sm text-gray-500">
							{imageUploading ? "Uploading image..." : imageDeleting ? "Removing image..." : "Profile image"}
						</div>
					</div>
				</div>

				{error && (
					<div className="rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">
						{error}
					</div>
				)}

				<div className="space-y-4">
					<EditableField
						label="Name"
						type="text"
						value={name}
						onSave={async (newValue) => {
							await handleProfileFieldSave({ name: newValue });
						}}
					/>
					<EditableField
						label="Email"
						type="email"
						value={email}
						onSave={async (newValue) => {
							await handleProfileFieldSave({ email: newValue });
						}}
					/>

					<div className="flex items-center gap-4">
						<strong className="w-28 text-center text-gray-700 dark:text-gray-300">Password:</strong>
						<div className="flex flex-1 items-center justify-between">
							<span className="text-gray-900 dark:text-white">••••••••</span>
							<button
								type="button"
								onClick={() => setShowPasswordModal(true)}
								className="ms-5 rounded-md p-1 hover:bg-gray-100"
							>
								<Pencil className="h-5 w-5 text-gray-500" />
							</button>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button type="button" variant="secondary" onClick={onClose}>
						Cancel
					</Button>
				</div>

				{showPasswordModal && <UpdateUserPassword isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />}
			</div>
		</Modal>
	);
}
