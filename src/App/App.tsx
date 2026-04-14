import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "10px",
            background: "#ffffff",
            color: "#111827",
            border: "1px solid #e5e7eb",
          },
        }}
      />
    </AppProviders>
  );
}

export default App;
