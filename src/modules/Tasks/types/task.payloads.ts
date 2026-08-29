export type CreateTaskPayload = {
  title: string;
  description: string;
  priority_id: number;
  status_id: number;
  start_date: string;
  due_date: string;
  todos: string[];
  attachments: string[];
};

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
