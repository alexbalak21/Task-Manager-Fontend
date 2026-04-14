import type { ReactNode } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
	isOpen: boolean;
	title: string;
	children?: ReactNode;
	onClose: () => void;
	onCancel?: () => void;
	onDone?: () => void;
	cancelText?: string;
	doneText?: string;
	doneDisabled?: boolean;
	doneLoading?: boolean;
	hideFooter?: boolean;
	widthClassName?: string;
	contentClassName?: string;
};

export default function Modal({
	isOpen,
	title,
	children,
	onClose,
	onCancel,
	onDone,
	cancelText = "Cancel",
	doneText = "Done",
	doneDisabled = false,
	doneLoading = false,
	hideFooter = false,
	widthClassName = "w-[96vw] max-w-4xl",
	contentClassName = "",
}: ModalProps) {
	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
			return;
		}

		onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 p-3 sm:items-center sm:p-6"
			role="dialog"
			aria-modal="true"
			aria-label={title}
			onClick={onClose}
		>
			<div
				className={`${widthClassName} max-h-[94vh] overflow-hidden rounded-xl bg-[#f6f6f8] shadow-[0_20px_60px_rgba(0,0,0,0.18)]`}
				onClick={(event) => event.stopPropagation()}
			>
				<header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 sm:px-8">
					<h2 className="text-2xl font-semibold text-zinc-900">{title}</h2>
					<button
						type="button"
						aria-label="Close modal"
						className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
						onClick={onClose}
					>
						<X size={22} />
					</button>
				</header>

				<div
					className={`min-h-[58vh] overflow-auto p-6 sm:p-8 ${contentClassName}`.trim()}
				>
					{children}
				</div>

				{!hideFooter && (
					<footer className="flex items-center justify-end gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
						<button
							type="button"
							className="rounded-lg border border-zinc-200 bg-zinc-100 px-7 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-700 transition-colors hover:bg-zinc-200"
							onClick={handleCancel}
						>
							{cancelText}
						</button>
						<button
							type="button"
							disabled={doneDisabled || doneLoading}
							className="rounded-lg bg-primary-500 px-7 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-550 disabled:cursor-not-allowed disabled:opacity-55"
							onClick={onDone}
						>
							{doneLoading ? "Saving..." : doneText}
						</button>
					</footer>
				)}
			</div>
		</div>
	);
}
