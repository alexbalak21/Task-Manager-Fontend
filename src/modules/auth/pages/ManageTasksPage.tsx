import { FileText } from "lucide-react";
import AppShellLayout from "../../../layouts/AppShellLayout";
import TaskCard from "../../Tasks/components/TaskCard";
import { useEffect, useMemo, useState } from "react";

import { useUsersStore } from "../../Users/state/users.store";
import { useTasksStore } from "../../Tasks/state/tasks.store";
import { useStatusStore } from "../../Tasks/state/status.store";
import { usePriorityStore } from "../../Tasks/state/priority.store";

export default function ManageTasksPage() {
  const { users, loadUsers } = useUsersStore();

  const tasks = useTasksStore((s) => s.tasks);
  const loadTasks = useTasksStore((s) => s.loadTasks);

  const statuses = useStatusStore((s) => s.statuses);
  const loadStatuses = useStatusStore((s) => s.loadStatuses);

  const priorities = usePriorityStore((s) => s.priorities);
  const loadPriorities = usePriorityStore((s) => s.loadPriorities);

  const [activeFilter, setActiveFilter] = useState<number | "all">("all");

  // Load all data
  useEffect(() => {
    loadUsers();
    loadTasks();
    loadStatuses();
    loadPriorities();
  }, [loadUsers, loadTasks, loadStatuses, loadPriorities]);

 
  //  Dynamic Filters (useMemo)
  const filters = useMemo(() => {
    const counts = statuses.map((status) => ({
      label: status.name,
      id: status.id,
      count: tasks.filter((t) => t.status_id === status.id).length,
    }));

    const total = tasks.length;

    return [
      { label: "All", id: "all", count: total },
      ...counts,
    ];
  }, [tasks, statuses]);

  //  Filtered Tasks (useMemo)
  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((t) => t.status_id === activeFilter);
  }, [tasks, activeFilter]);

  
  //  Map backend → TaskCard props

  const mappedTasks = useMemo(() => {
    return filteredTasks.map((task) => {
      const status = statuses.find((s) => s.id === task.status_id);
      const priority = priorities.find((p) => p.id === task.priority_id);

      // Map assignees: provide { name, profile_image } for TaskCard
      const assignees = (task.users && users && users.length)
        ? task.users.map((uid) => {
            const user = users.find((u) => u.id === uid);
            let name = "";
            if (user && user.name) {
              const parts = user.name.trim().split(" ");
              name = parts.length > 1
                ? `${parts[0][0]}${parts[1][0]}`
                : parts[0][0];
              name = name.toUpperCase();
            } else {
              name = typeof uid === "number" ? `U${uid}` : String(uid);
            }
            return {
              name,
              profile_image: user?.profile_image || "",
            };
          })
        : [];

      return {
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        statusLabel: status?.name ?? "Unknown",
        priorityLabel: priority?.name ?? "Unknown",
        totalTasks: task.total_todos ?? (task.todos?.length ?? 0),
        completedTasks: task.completed_todos ?? 0,
        startDate: task.start_date ?? "",
        dueDate: task.due_date ?? "",
        attachmentsCount: task.attachments?.length ?? 0,
        assignees,
      };
    });
  }, [filteredTasks, statuses, priorities, users]);

 
  // Loading guard

  if (!tasks.length || !statuses.length || !priorities.length) {
    return (
      <AppShellLayout>
        <section className="p-8">
          <p>Loading tasks...</p>
        </section>
      </AppShellLayout>
    );
  }

  return (
    <AppShellLayout>
      <section className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight text-[#111827]">
            My Tasks
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            {/* Filters */}
            <nav className="flex items-center gap-4 text-lg text-gray-600">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => {
                    if (filter.id === "all") {
                      setActiveFilter("all");
                    } else {
                      setActiveFilter(Number(filter.id));
                    }
                  }}
                  className={[
                    "inline-flex items-center gap-3 border-b-2 pb-2 font-medium transition-colors",
                    activeFilter === filter.id
                      ? "border-primary-500 text-primary-500"
                      : "border-transparent text-gray-600 hover:text-gray-800",
                  ].join(" ")}
                >
                  <span>{filter.label}</span>
                  <span
                    className={[
                      "inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-sm font-semibold",
                      activeFilter === filter.id
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-500",
                    ].join(" ")}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-lime-100 px-4 py-3 text-lg font-medium text-[#42541e] hover:bg-lime-200"
            >
              <FileText className="h-5 w-5" strokeWidth={2} />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mappedTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </section>
    </AppShellLayout>
  );
}
