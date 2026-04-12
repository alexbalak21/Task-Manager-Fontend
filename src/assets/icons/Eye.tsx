import type { SVGProps } from "react";

export default function Eye(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M1.5 12.5C2.73 8.11 6.95 5 12 5s9.27 3.11 10.5 7.5c-1.23 4.39-5.45 7.5-10.5 7.5S2.73 16.89 1.5 12.5z"
				stroke="currentColor"
				strokeWidth="1.75"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.75" />
		</svg>
	);
}
