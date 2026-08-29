import Avatar from "../../Users/components/Avatar";

export type Assignee = {
	name: string;
	profile_image?: string | null;
};

type AvatarContainerProps = {
	assignees?: Assignee[];
	size?: number;
};

export default function AvatarContainer({ assignees = [], size = 40 }: AvatarContainerProps) {
	if (!assignees.length) {
		return null;
	}

	const MAX_VISIBLE = 3;
	const overflowCount = assignees.length > MAX_VISIBLE ? assignees.length - MAX_VISIBLE : 0;
	const visibleAssignees = assignees.slice(0, MAX_VISIBLE);

	return (
		<div className="flex items-center">
			{visibleAssignees.map((assignee, index) => (
				<div key={`${assignee.name}-${index}`} className={index === 0 ? "" : "-ml-2"}>
					<Avatar
						name={assignee.name}
						profile_image={assignee.profile_image ?? undefined}
						size={size}
						className="border-2 border-white shadow-sm"
					/>
				</div>
			))}

			{overflowCount > 0 && (
				<div className="-ml-2 flex items-center justify-center rounded-full border-2 border-white bg-gray-200 font-semibold text-gray-700 shadow-sm" style={{ width: size, height: size, fontSize: size / 2.5 }}>
					+{overflowCount}
				</div>
			)}
		</div>
	);
}
