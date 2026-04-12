import type { ReactNode } from "react";
import Sidebar from "../components/ui/Sidebar";
import TopBar from "../components/ui/TopBar";

type AppShellLayoutProps = {
  children: ReactNode;
};

export default function AppShellLayout({ children }: AppShellLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-800">
      <TopBar />
      <div className="flex h-[calc(100vh-86px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}