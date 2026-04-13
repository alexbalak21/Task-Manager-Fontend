import AppShellLayout from "../../../layouts/AppShellLayout";
import CreateTaskForm from "../components/CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <AppShellLayout>
      <section className="p-8 lg:p-6">
        <CreateTaskForm />
      </section>
    </AppShellLayout>
  );
}
