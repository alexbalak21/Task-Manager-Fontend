import AppShellLayout from "../../../layouts/AppShellLayout";
import CreateTask from "../components/CreateTask";


export default function CreateTaskPage() {
  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        <CreateTask/>
      </section>
    </AppShellLayout> 
  );
}
