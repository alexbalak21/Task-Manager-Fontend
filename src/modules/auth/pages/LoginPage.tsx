import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import loginSidePanel from "../../../assets/images/login_side_panel.jpg";
import Eye from "../../../assets/icons/Eye";
import EyeCorssed from "../../../assets/icons/Eye_corssed";
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
    return <Navigate to="/home" replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/home", { replace: true });
    } catch {
      setError("Login failed. Check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f3f5] lg:grid lg:grid-cols-[58%_42%]">
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
        <p className="text-3xl font-semibold tracking-tight text-[#141414]">Task Manager</p>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[620px]">
            <h1 className="text-center text-5xl font-semibold tracking-tight text-[#191919]">Welcome Back</h1>
            <p className="mt-4 text-center text-xl leading-tight text-[#333333]">
              Please enter your details to log in
            </p>

            <form onSubmit={onSubmit} className="mt-10 grid gap-5">
                <div>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] text-lg"
                label="Email"
              />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-xl font-medium text-gray-700">
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
                    {showPassword ? <EyeCorssed className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
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

            <p className="mt-5 text-xl text-[#303030]">
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
