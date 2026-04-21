export type TaskDto = {
  id: number;
  title: string;
  description: string | null;
  priority_id: number;
  status_id: number;
  start_date: string | null;
  due_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  users: number[];
  todos: number[];
  attachments: number[];
  completed_todos: number;
  total_todos: number;
};