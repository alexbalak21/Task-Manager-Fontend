export type CheckboxState = "not-started" | "in-progress" | "completed";


export interface MultiStateCheckboxProps {
  state: CheckboxState;
  onChange: (newState: CheckboxState) => void;
}
