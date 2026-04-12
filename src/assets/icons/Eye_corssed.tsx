import type { SVGProps } from "react";

export default function EyeCorssed(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.09A10.94 10.94 0 0112 5c5.05 0 9.27 3.11 10.5 7.5a10.96 10.96 0 01-4.08 5.68M6.61 6.61A10.95 10.95 0 001.5 12.5a11.03 11.03 0 003.83 5.29"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
