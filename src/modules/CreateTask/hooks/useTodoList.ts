import { useState, type KeyboardEvent } from "react";

export interface TodoItem {
  id: string;
  text: string;
}

interface UseTodoListResult {
  todoItems: TodoItem[];
  todoInput: string;
  handleTodoInput: (value: string) => void;
  handleAddTodo: () => void;
  handleRemoveTodo: (id: string) => void;
  handleTodoKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  resetTodoList: () => void;
}

export function useTodoList(): UseTodoListResult {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState("");

  const handleTodoInput = (value: string) => {
    setTodoInput(value);
  };

  const handleAddTodo = () => {
    const trimmed = todoInput.trim();
    if (!trimmed) {
      return;
    }

    setTodoItems((prev) => [...prev, { id: Date.now().toString(), text: trimmed }]);
    setTodoInput("");
  };

  const handleRemoveTodo = (id: string) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTodoKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();
    handleAddTodo();
  };

  const resetTodoList = () => {
    setTodoItems([]);
    setTodoInput("");
  };

  return {
    todoItems,
    todoInput,
    handleTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleTodoKeyDown,
    resetTodoList,
  };
}
