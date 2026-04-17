import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import Modal from "../../../components/ui/Modal";

import Avatar from "./Avatar";

export type SelectableUser = {
	id: string;
	name: string;
	email: string;
	profile_image: string;
};

type SelectUsersModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onDone?: (selectedUsers: SelectableUser[]) => void;
	users: SelectableUser[];
	defaultSelectedIds?: string[];
};




export default function SelectUsersModal({
	isOpen,
	onClose,
	onDone,
	users,
	defaultSelectedIds = [],
}: SelectUsersModalProps) {
	const sourceUsers = users;
	const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
	const wasOpenRef = useRef(false);

	useEffect(() => {
		if (isOpen && !wasOpenRef.current) {
			setSelectedIds(defaultSelectedIds);
		}

		wasOpenRef.current = isOpen;
	}, [defaultSelectedIds, isOpen]);

	const toggleSelection = (userId: string) => {
		setSelectedIds((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId],
		);
	};

	const handleDone = () => {
		const selectedUsers = sourceUsers.filter((user) => selectedIds.includes(user.id));
		onDone?.(selectedUsers);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			title="Select Users"
			onClose={onClose}
			onCancel={onClose}
			onDone={handleDone}
			widthClassName="w-[98vw] max-w-[860px]"
			contentClassName="!min-h-0 !p-0"
		>
			<div className="max-h-[58vh] overflow-y-auto px-6 sm:px-7">
				{sourceUsers.length === 0 ? (
					<div className="py-8 text-center text-gray-500">No users available.</div>
				) : (
					sourceUsers.map((user) => {
						const isSelected = selectedIds.includes(user.id);
						return (
							<label
								key={user.id}
								className="flex cursor-pointer items-center justify-between gap-4 border-b border-zinc-200 py-5"
							>
								<div className="flex min-w-0 items-center gap-4">
									<Avatar
										name={user.name}
										profile_image={user.profile_image}
										size={48}
										className="h-12 w-12"
									/>
									<div className="min-w-0">
										<p className="truncate text-2xl font-semibold leading-none text-black">
											{user.name}
										</p>
										<p className="mt-2 truncate text-xl text-gray-600">{user.email}</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => toggleSelection(user.id)}
									aria-pressed={isSelected}
									aria-label={`Select ${user.name}`}
									className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 transition-colors ${
									isSelected
										? "border-primary-500 bg-primary-500 text-white"
										: "border-zinc-400 bg-white text-transparent"
									}`}
								>
									<Check size={16} strokeWidth={3} />
								</button>
							</label>
						);
					})
				)}
			</div>
		</Modal>
	);
}
