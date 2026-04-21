import AppShellLayout from "../../../layouts/AppShellLayout";
import CreateTaskContainer from "../../CreateTask/CreateTaskContainer";


export default function CreateTaskPage() {
  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        <CreateTaskContainer/>
      </section>
    </AppShellLayout> 
  );
}
