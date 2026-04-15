type TeamMemeberCardProps = {
	name?: string;
	email?: string;
	roleLabel?: string;
	avatarUrl?: string;
	pendingCount?: number;
	inProgressCount?: number;
	completedCount?: number;
};

const DEFAULT_AVATAR =
	"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80";

function StatTile({
	label,
	value,
	className,
}: {
	label: string;
	value: number;
	className: string;
}) {
	return (
		<div className="rounded-2xl bg-[#f7f8fc] px-5 py-4">
			<p className={`text-xl font-semibold leading-none ${className}`}>{value}</p>
			<p className={`mt-2 text-base font-semibold ${className}`}>{label}</p>
		</div>
	);
}

export default function TeamMemberCard({
	name = "Mary Jane",
	email = "mary@timetoprogram.com",
	avatarUrl = DEFAULT_AVATAR,
	pendingCount = 3,
	inProgressCount = 0,
	completedCount = 0,
}: TeamMemeberCardProps) {
	return (
		<article className="w-full max-w-140 rounded-2xl border border-[#edf0f5] bg-white p-5 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.45)]">
			<div className="flex items-center gap-4">
				<img
					src={avatarUrl}
					alt={`${name} avatar`}
					className="h-16 w-16 rounded-full object-cover ring-4 ring-[#edf3ff]"
				/>

				<div>
					<h3 className="text-2xl font-semibold tracking-tight text-[#171717]">{name}</h3>
					<p className="mt-1 text-lg text-[#6b7280]">{email}</p>
				</div>
			</div>

			<div className="mt-5 grid gap-3 sm:grid-cols-3">
				<StatTile label="Pending" value={pendingCount} className="text-[#6c4ce1]" />
				<StatTile label="In Progress" value={inProgressCount} className="text-[#15aabf]" />
				<StatTile label="Completed" value={completedCount} className="text-[#5a4fcf]" />
			</div>
		</article>
	);
}
