import { useEffect, useRef } from "react";
import type { MultiStateCheckboxProps } from "../types/todo-checkbox.types";

export default function MultiStateCheckbox({
  state,
  onChange,
}: MultiStateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = state === "in-progress";
    }
  }, [state]);

  const handleClick = () => {
    if (state === "not-started") onChange("in-progress");
    else if (state === "in-progress") onChange("completed");
    else onChange("not-started");
  };

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={state === "completed"}
      onChange={handleClick}
      className="cursor-pointer w-5 h-5"
    />
  );
}
