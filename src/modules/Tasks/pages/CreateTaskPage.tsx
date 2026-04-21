import AppShellLayout from "../../../layouts/AppShellLayout";
import TaskFormContainer from "../../TaskForm/TaskFormContainer";


export default function CreateTaskPage() {
  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        <TaskFormContainer />
      </section>
    </AppShellLayout> 
  );
}
