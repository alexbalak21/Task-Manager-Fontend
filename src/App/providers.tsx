import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../modules/auth/state/auth.store";
import { useTheme } from "../hooks/useTheme";
import { ToastProvider } from "../components/ui/ToastProvider";

type AppProvidersProps = {
	children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
	const hydrate = useAuthStore((state) => state.hydrate);
	useTheme();

	useEffect(() => {
		hydrate();
	}, [hydrate]);

	return <ToastProvider>{children}</ToastProvider>;
}
