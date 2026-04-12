import { Link } from "react-router";
import { useAuthStore } from "../../auth/state/auth.store";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Home</h1>
          <p className="mt-1 text-gray-600">
            Welcome{user?.name ? `, ${user.name}` : ""}.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
      </header>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-700">You are successfully logged in.</p>
        <Link
          to="/tasks"
          className="mt-4 inline-flex text-sm font-semibold text-[#2767e7] hover:underline"
        >
          Go to Tasks
        </Link>
      </section>
    </main>
  );
}