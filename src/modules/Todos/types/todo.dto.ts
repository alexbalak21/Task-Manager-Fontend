export type TodoDto = {
  id: number;
  text: string;
  in_progress: boolean;
  completed: boolean;
  worked_by: number | null;
  completed_at: string | null;
  task_id: number;
  created_at: string;
  updated_at: string;
};
