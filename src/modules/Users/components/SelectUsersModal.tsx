import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import Modal from "../../../components/ui/Modal";

export type SelectableUser = {
	id: string;
	name: string;
	email: string;
	avatarUrl: string;
};

type SelectUsersModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onDone?: (selectedUsers: SelectableUser[]) => void;
	users?: SelectableUser[];
	defaultSelectedIds?: string[];
};

const DEFAULT_USERS: SelectableUser[] = [
	{
		id: "2",
		name: "John Paul",
		email: "john@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
	},
	{
		id: "3",
		name: "Mary Jane",
		email: "mary@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
	},
	{
		id: "4",
		name: "James Dean",
		email: "james@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
	},
	{
		id: "5",
		name: "Anna Grace",
		email: "anna@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
	},
	{
		id: "6",
		name: "Mark Lee",
		email: "mark@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
	},
	{
		id: "7",
		name: "Emma Rose",
		email: "emma@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80",
	},
];

export default function SelectUsersModal({
	isOpen,
	onClose,
	onDone,
	users,
	defaultSelectedIds = [],
}: SelectUsersModalProps) {
	const sourceUsers = useMemo(() => users ?? DEFAULT_USERS, [users]);
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
				{sourceUsers.map((user) => {
					const isSelected = selectedIds.includes(user.id);

					return (
						<label
							key={user.id}
							className="flex cursor-pointer items-center justify-between gap-4 border-b border-zinc-200 py-5"
						>
							<div className="flex min-w-0 items-center gap-4">
								<img
									src={user.avatarUrl}
									alt={`${user.name} avatar`}
									className="h-12 w-12 rounded-full object-cover"
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
				})}
			</div>
		</Modal>
	);
}
