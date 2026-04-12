import { Link } from "react-router";
import AppShellLayout from "../../../layouts/AppShellLayout";
import { useAuthStore } from "../../auth/state/auth.store";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppShellLayout>
      <section className="p-8 lg:p-10">
        <h2 className="text-3xl font-semibold text-[#1b1b1b]">Home</h2>
        <p className="mt-2 text-lg text-gray-600">Welcome{user?.name ? `, ${user.name}` : ""}.</p>

        <div className="mt-6 rounded-xl border border-[#e6e8ee] bg-white p-6">
          <p className="text-gray-700">Main content area</p>
          <Link to="/tasks" className="mt-4 inline-flex text-sm font-semibold text-[#2767e7] hover:underline">
            Go to Tasks
          </Link>
        </div>
      </section>
    </AppShellLayout>
  );
}