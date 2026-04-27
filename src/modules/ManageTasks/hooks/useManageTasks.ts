import { useMemo, useState } from "react";
import { useUsersStore } from "../../Users/state/users.store";
import { useTasksStore } from "../../Tasks/state/tasks.store"; 
import { useStatusStore } from "../../Tasks/state/status.store"; 
import { usePriorityStore } from "../../Priority/store/priority.store";

export function useManageTasks() {
  const { users } = useUsersStore();
  const tasks = useTasksStore((s) => s.tasks);
  const statuses = useStatusStore((s) => s.statuses);
  const priorities = usePriorityStore((s) => s.priorities);

  const [activeFilter, setActiveFilter] = useState<number | "all">("all");

  const filters = useMemo(() => {
    const counts = statuses.map((status) => ({
      label: status.name,
      id: status.id,
      count: tasks.filter((t) => t.status_id === status.id).length,
    }));

    return [
      { label: "All", id: "all", count: tasks.length },
      ...counts,
    ];
  }, [tasks, statuses]);

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((t) => t.status_id === activeFilter);
  }, [tasks, activeFilter]);

  const mappedTasks = useMemo(() => {
    return filteredTasks.map((task) => {
      const status = statuses.find((s) => s.id === task.status_id);
      const priority = priorities.find((p) => p.id === task.priority_id);

      const assignees = task.users?.map((uid: number) => {
        const user = users.find((u) => u.id === uid);
        const initials = user?.name
          ? user.name.split(" ").map((p) => p[0]).join("").toUpperCase()
          : `U${uid}`;

        return {
          name: initials,
          profile_image: user?.profile_image || "",
        };
      }) ?? [];

      return {
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        statusLabel: status?.name ?? "Unknown",
        statusColor: status?.color ?? "#0D9488",
        priorityLabel: priority?.name ?? "Unknown",
        priorityColor: priority?.color ?? "#64748B",
        totalTasks: task.total_todos ?? task.todos?.length ?? 0,
        completedTasks: task.completed_todos ?? 0,
        startDate: task.start_date ?? "",
        dueDate: task.due_date ?? "",
        attachmentsCount: task.attachments?.length ?? 0,
        assignees,
      };
    });
  }, [filteredTasks, statuses, priorities, users]);

  return {
    filters,
    activeFilter,
    setActiveFilter,
    mappedTasks,
  };
}
