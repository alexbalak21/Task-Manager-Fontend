

import TaskCard from "../../Tasks/components/TaskCard";
import type { TaskCardProps } from "../../Tasks/components/TaskCard";
import { Link } from "react-router";

type TaskGridProps = {
  tasks: TaskCardProps[];
};

export function TaskGrid({ tasks }: TaskGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task, index) => {
        const key = task.id ?? index;

        if (!task.id) {
          return <TaskCard key={key} {...task} description={task.description ?? ""} />;
        }

        return (
          <Link
            key={key}
            to={`/tasks/${task.id}/edit`}
            className="block transition-transform hover:-translate-y-0.5"
          >
            <TaskCard {...task} description={task.description ?? ""} />
          </Link>
        );
      })}
    </div>
  );
}
    