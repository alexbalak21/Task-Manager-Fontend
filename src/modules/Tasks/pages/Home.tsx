import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";
import TasksStatusCard from "../../../components/dashboard/TasksStatusCard";
import Donut from "../../../components/charts/Dount";
import VerticalBars from "../../../components/charts/VerticalBars";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppShellLayout>
      <section className="p-8 lg:p-10">
        <TasksStatusCard userName={user?.name ?? "Admin"} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Donut
            title="Task Distribution"
            slices={[
              { label: "Pending", value: 12, color: "#F0B100" },
              { label: "Awaiting", value: 6, color: "#FE9A00" },
              { label: "In Progress", value: 7, color: "#2B7FFF" },
              { label: "Completed", value: 21, color: "#00A63E" },
            ]}
          />
          {/* ["Low", "Medium", "High", "Critical"] */}
          <VerticalBars
            title="Task Priority Levels"
            bars={[
              { label: "Low", value: 5, color: "#10B26C" },
              { label: "Medium", value: 6, color: "#F28B00" },
              { label: "High", value: 7, color: "#FF0F57" },
              { label: "Critical", value: 3, color: "#FF0000" },
            ]}
          />
        </div>
      </section>
    </AppShellLayout>
  );
}