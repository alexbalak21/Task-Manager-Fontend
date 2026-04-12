import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";
import TasksStatusCard from "../../../components/dashboard/TasksStatusCard";
import Donut from "../../../components/charts/Dount";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppShellLayout>
      <section className="p-8 lg:p-10">
        <TasksStatusCard userName={user?.name ?? "Admin"} />

<Donut title="Task Distribution" slices={[
          { label: "Pending", value: 10, color: "#f59e0b" },
          { label: "In Progress", value: 15, color: "#3b82f6" },
          { label: "Completed", value: 20, color: "#10b981" },
          { label: "On Hold", value: 5, color: "#8b5cf6" },
          { label: "Cancelled", value: 2, color: "#ef4444" }
        ]} />
      </section>
    </AppShellLayout>
  );
}