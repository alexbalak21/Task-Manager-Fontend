import AppShellLayout from "../../../layouts/AppShellLayout";
import { useEffect } from "react";
import { useUsersStore } from "../../Users/state/users.store";
import { useTasksStore } from "../../Tasks/state/tasks.store";
import { useStatusStore } from "../../Tasks/state/status.store";
import { usePriorityStore } from "../../Tasks/state/priority.store";

import { useManageTasks } from "../hooks/useManageTasks";
import { TaskFilters } from "../components/TaskFilters";
import { TaskGrid } from "../layout/TaskGrid";

export default function ManageTasksPage() {
  const { loadUsers } = useUsersStore();
  const loadTasks = useTasksStore((s) => s.loadTasks);
  const loadStatuses = useStatusStore((s) => s.loadStatuses);
  const loadPriorities = usePriorityStore((s) => s.loadPriorities);

  const { filters, activeFilter, setActiveFilter, mappedTasks } = useManageTasks();

  useEffect(() => {
    loadUsers();
    loadTasks();
    loadStatuses();
    loadPriorities();
  }, []);

  return (
    <AppShellLayout>
      <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight text-[#111827]">
            My Tasks
          </h2>

          <TaskFilters
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={id => setActiveFilter(id === "all" ? "all" : Number(id))}
          />
        </div>

        <TaskGrid tasks={mappedTasks} />
      </section>
    </AppShellLayout>
  );
}
