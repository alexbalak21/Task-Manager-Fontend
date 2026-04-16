import { useEffect, useMemo } from "react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";
import TasksStatusCard from "../../../components/dashboard/TasksStatusCard";
import Donut from "../../../components/charts/Donut";
import VerticalBars from "../../../components/charts/VerticalBars";
import TaskListTable from "../../Tasks/components/TaskListTable";
import { useTasksStore } from "../../Tasks/state/tasks.store";
import { usePriorityStore } from "../../Tasks/state/priority.store";
import { useStatusStore } from "../../Tasks/state/status.store";

export default function TaskDashboard() {
  const user = useAuthStore((state) => state.user);

  const tasks = useTasksStore((state) => state.tasks);
  const loadTasks = useTasksStore((state) => state.loadTasks);

  const priorities = usePriorityStore((state) => state.priorities);
  const loadPriorities = usePriorityStore((state) => state.loadPriorities);

  const statuses = useStatusStore((state) => state.statuses);
  const loadStatuses = useStatusStore((state) => state.loadStatuses);

  // Load all reference data + tasks
  useEffect(() => {
    void loadTasks();
    void loadPriorities();
    void loadStatuses();
  }, [loadTasks, loadPriorities, loadStatuses]);

  //  useMemo: compute chart data
  const statusSlices = useMemo(() => {
    return statuses.map((status) => ({
      label: status.name,
      value: tasks.filter((task) => task.status_id === status.id).length,
      color: status.color,
    }));
  }, [statuses, tasks]);

  const priorityBars = useMemo(() => {
    return priorities.map((priority) => ({
      label: priority.name,
      value: tasks.filter((task) => task.priority_id === priority.id).length,
      color: priority.color,
    }));
  }, [priorities, tasks]);

  // Optional: avoid rendering empty charts
  if (!tasks.length || !statuses.length || !priorities.length) {
    return (
      <AppShellLayout>
        <section className="p-8 lg:p-6">
          <p>Loading dashboard...</p>
        </section>
      </AppShellLayout>
    );
  }

  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        <TasksStatusCard userName={user?.name ?? "Admin"} />

        <div className="my-6 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Donut title="Task Distribution" slices={statusSlices} />

          <VerticalBars title="Task Priority Levels" bars={priorityBars} />
        </div>

        <TaskListTable />
      </section>
    </AppShellLayout>
  );
}
