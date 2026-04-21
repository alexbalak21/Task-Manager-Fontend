

import TaskCard from "../../Tasks/components/TaskCard";
import type { TaskCardProps } from "../../Tasks/components/TaskCard";

type TaskGridProps = {
  tasks: TaskCardProps[];
};

export function TaskGrid({ tasks }: TaskGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} description={task.description ?? ""} />
      ))}
    </div>
  );
}
    