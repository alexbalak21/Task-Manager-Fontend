import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Eye from "../../../assets/icons/Eye";
import EyeCorssed from "../../../assets/icons/Eye_corssed";
import loginSidePanel from "../../../assets/images/login_side_panel.jpg";
import { useAuthStore } from "../state/auth.store";

export default function SigninPage() {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [adminToken, setAdminToken] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (accessToken) {
		return <Navigate to="/tasks" replace />;
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		// Registration API is not integrated yet.
		navigate("/login", { replace: true });
	};

	return (
		<main className="min-h-screen bg-[#f3f3f5] lg:grid lg:grid-cols-[58%_42%]">
			<section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
				<p className="text-3xl font-semibold tracking-tight text-[#141414]">Task Manager</p>

				<div className="flex flex-1 items-center">
					<div className="mx-auto w-full max-w-[920px]">
						<h1 className="text-5xl font-semibold tracking-tight text-[#191919]">Create an Account</h1>
						<p className="mt-4 text-xl leading-tight text-[#333333]">
							Join us today by entering your details below.
						</p>

						<div className="mt-8 flex justify-center">
							<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#e9eef9] text-[#2f6de5]">
								<svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" aria-hidden="true">
									<circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" />
									<path d="M6 19a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
								</svg>
								<span className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#2f6de5] text-white">
									<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
										<path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</span>
							</div>
						</div>

						<form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
							<Input
								id="fullName"
								type="text"
								placeholder="John"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								autoComplete="name"
								required
								className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] text-lg"
								label="Full Name"
							/>

							<Input
								id="email"
								type="email"
								placeholder="john@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] text-lg"
								label="Email Address"
							/>

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
										autoComplete="new-password"
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

							<Input
								id="adminInviteToken"
								type="text"
								placeholder="6 Digit Code"
								value={adminToken}
								onChange={(e) => setAdminToken(e.target.value)}
								className="h-[54px] rounded-lg border-[#e8e8ec] bg-[#f5f5f7] text-lg"
								label="Admin Invite Token"
							/>

							<div className="md:col-span-2">
								<Button
									type="submit"
									loading={isSubmitting}
									disabled={isSubmitting}
									className="h-[52px] w-full rounded-lg bg-[#2767e7] text-xl font-semibold uppercase tracking-wide text-white hover:bg-[#1f57c7]"
								>
									Sign Up
								</Button>
							</div>
						</form>

						<p className="mt-5 text-xl text-[#303030]">
							Already have an account?{" "}
							<Link to="/login" className="font-semibold text-[#2767e7] underline-offset-2 hover:underline">
								Login
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
