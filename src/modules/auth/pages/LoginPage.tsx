import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import loginSidePanel from "../../../assets/images/login_side_panel.jpg";
import { useAuthStore } from "../state/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (accessToken) {
    return <Navigate to="/tasks" replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/tasks", { replace: true });
    } catch {
      setError("Login failed. Check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f3f5] lg:grid lg:grid-cols-[58%_42%]">
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
        <p className="text-2xl font-semibold tracking-tight text-[#141414]">Task Manager</p>

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[620px]">
            <h1 className="text-5xl font-semibold tracking-tight text-[#191919] sm:text-[3.45rem]">Welcome Back</h1>
            <p className="mt-2 text-[1.75rem] leading-tight text-[#333333] sm:text-[2rem]">
              Please enter your details to log in
            </p>

            <form onSubmit={onSubmit} className="mt-10 grid gap-5">
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] text-lg"
              />

              <div>
                <label htmlFor="password" className="mb-2 block text-[1.35rem] font-medium text-[#2f2f2f]">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 Characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    minLength={8}
                    className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] pr-12 text-lg"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                        <path
                          d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.09A10.94 10.94 0 0112 5c5.05 0 9.27 3.11 10.5 7.5a10.96 10.96 0 01-4.08 5.68M6.61 6.61A10.95 10.95 0 001.5 12.5a11.03 11.03 0 003.83 5.29"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                        <path
                          d="M1.5 12.5C2.73 8.11 6.95 5 12 5s9.27 3.11 10.5 7.5c-1.23 4.39-5.45 7.5-10.5 7.5S2.73 16.89 1.5 12.5z"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.75" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="mt-1 h-[52px] w-full rounded-lg bg-[#2767e7] text-xl font-semibold uppercase tracking-wide text-white hover:bg-[#1f57c7]"
              >
                Login
              </Button>
            </form>

            <p className="mt-5 text-[1.6rem] text-[#303030]">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-[#2767e7] underline-offset-2 hover:underline">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </section>

      <aside className="relative hidden min-h-screen overflow-hidden lg:block">
        <img
          src={loginSidePanel}
          alt="Task collaboration panel"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
    </main>
  );
}
