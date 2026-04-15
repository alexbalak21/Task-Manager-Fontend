import { FileText } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import TeamMemeberCard from "../components/TeamMemberCard";

type TeamMember = {
	name: string;
	email: string;
	avatarUrl: string;
	pendingCount: number;
	inProgressCount: number;
	completedCount: number;
};

const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Dustin",
		email: "dustin@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
		pendingCount: 0,
		inProgressCount: 2,
		completedCount: 1,
	},
	{
		name: "John Paul",
		email: "john@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
		pendingCount: 0,
		inProgressCount: 2,
		completedCount: 2,
	},
	{
		name: "Mary Jane",
		email: "mary@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
		pendingCount: 3,
		inProgressCount: 0,
		completedCount: 0,
	},
	{
		name: "James Dean",
		email: "james@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
		pendingCount: 3,
		inProgressCount: 1,
		completedCount: 1,
	},
	{
		name: "Anna Grace",
		email: "anna@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
		pendingCount: 3,
		inProgressCount: 0,
		completedCount: 0,
	},
	{
		name: "Mark Lee",
		email: "mark@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
		pendingCount: 2,
		inProgressCount: 2,
		completedCount: 0,
	},
	{
		name: "Emma Rose",
		email: "emma@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80",
		pendingCount: 2,
		inProgressCount: 2,
		completedCount: 1,
	},
	{
		name: "Luke Ryan",
		email: "luke@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
		pendingCount: 4,
		inProgressCount: 0,
		completedCount: 0,
	},
	{
		name: "Mia Belle",
		email: "mia@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
		pendingCount: 3,
		inProgressCount: 1,
		completedCount: 0,
	},
	{
		name: "Adam Cole",
		email: "adam@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
		pendingCount: 4,
		inProgressCount: 3,
		completedCount: 1,
	},
	{
		name: "Lily May",
		email: "lily@timetoprogram.com",
		avatarUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
		pendingCount: 5,
		inProgressCount: 1,
		completedCount: 0,
	},
];

export default function TeamMembersPage() {
	return (
		<AppShellLayout>
			<section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
					<h2 className="text-4xl font-semibold tracking-tight text-[#111111]">Team Members</h2>

					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-lg bg-lime-100 px-4 py-3 text-lg font-medium text-[#42541e] transition-colors hover:bg-lime-200"
					>
						<FileText className="h-5 w-5" strokeWidth={2} />
						<span>Download Report</span>
					</button>
				</div>

				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{TEAM_MEMBERS.map((member) => (
						<TeamMemeberCard
							key={member.email}
							name={member.name}
							email={member.email}
							avatarUrl={member.avatarUrl}
							pendingCount={member.pendingCount}
							inProgressCount={member.inProgressCount}
							completedCount={member.completedCount}
							roleLabel="Member"
						/>
					))}
				</div>
			</section>
		</AppShellLayout>
	);
}
