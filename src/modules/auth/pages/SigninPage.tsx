import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Eye from "../../../assets/icons/Eye";
import EyeCorssed from "../../../assets/icons/Eye_corssed";
import loginSidePanel from "../../../assets/images/login_side_panel.jpg";
import { useAuthStore } from "../state/auth.store";

export default function SigninPage() {
	const navigate = useNavigate();
	const register = useAuthStore((state) => state.register);
	const accessToken = useAuthStore((state) => state.accessToken);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [adminToken, setAdminToken] = useState("");
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
			await register(fullName, email, password);
			navigate("/home", { replace: true });
		} catch {
			setError("Registration failed. Please check your details and try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen bg-[#f3f3f5] lg:grid lg:grid-cols-[58%_42%]">
			<section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
				<p className="text-3xl font-semibold tracking-tight text-[#141414]">Task Manager</p>

				<div className="flex flex-1 items-center">
					<div className="mx-auto w-full max-w-230">
						<h1 className="text-5xl font-semibold tracking-tight text-black">Create an Account</h1>
						<p className="mt-4 text-xl leading-tight text-gray-600">
							Join us today by entering your details below.
						</p>
						<form onSubmit={onSubmit} className="mt-9 grid gap-5 md:grid-cols-2">
							<div>
								<label htmlFor="fullName" className="mb-2 block text-xl font-medium text-gray-700">
									Full Name
								</label>
								<input
									id="fullName"
									type="text"
									placeholder="John"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									autoComplete="name"
									required
									className="h-13 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-lg text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
								/>
							</div>

							<div>
								<label htmlFor="email" className="mb-2 block text-xl font-medium text-gray-700">
									Email Address
								</label>
								<input
									id="email"
									type="email"
									placeholder="john@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
									required
									className="h-13 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-lg text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
								/>
							</div>

							<div>
								<label htmlFor="password" className="mb-2 block text-xl font-medium text-gray-700">
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Min 8 Characters"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="new-password"
										required
										minLength={8}
										className="h-13 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 pr-12 text-lg text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
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

							<div>
								<label htmlFor="adminInviteToken" className="mb-2 block text-xl font-medium text-gray-700">
									Admin Invite Token
								</label>
								<input
									id="adminInviteToken"
									type="text"
									placeholder="6 Digit Code"
									value={adminToken}
									onChange={(e) => setAdminToken(e.target.value)}
									className="h-13 w-full rounded-lg border border-[#e8e8ec] bg-[#f5f5f7] px-4 text-lg text-[#1f1f1f] placeholder:text-[#9b9ba1] focus:border-[#2767e7] focus:outline-none"
								/>
							</div>
						{error ? <p className="text-sm text-red-600 md:col-span-2">{error}</p> : null}
							<div className="md:col-span-2">
								<button
									type="submit"
									disabled={isSubmitting}
									className="h-13 w-full rounded-lg bg-primary-500 text-xl font-semibold uppercase tracking-wide text-white hover:bg-primary-600"
								>
									{isSubmitting ? "Signing Up..." : "Sign Up"}
								</button>
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
