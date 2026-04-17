interface AvatarProps {
	name?: string;
	profile_image?: string | null;
	size?: number | string; // Optional: allow custom size
	className?: string; // Optional: allow custom classes
}

const DEFAULT_SIZE = 104; // 6.5rem ~ 104px

export default function Avatar({ name = "?", profile_image, size = DEFAULT_SIZE, className = "" }: AvatarProps) {
	// Compute initials from name
	const initials = name
		? name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
		: "?";

	// Compute image src if provided
	let imgSrc: string | undefined = undefined;
	if (profile_image) {
		if (profile_image.startsWith("data:") || profile_image.startsWith("http")) {
			imgSrc = profile_image;
		} else {
			imgSrc = `data:image/jpeg;base64,${profile_image}`;
		}
	}

	const sizeStyle = {
		width: typeof size === "number" ? `${size}px` : size,
		height: typeof size === "number" ? `${size}px` : size,
	};

	return (
		<>
			{imgSrc ? (
				<img
					src={imgSrc}
					alt="Profile avatar"
					className={`rounded-full object-cover ${className}`}
					style={sizeStyle}
				/>
			) : (
				<div
					className={`flex items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-600 select-none ${className}`}
					style={{ ...sizeStyle, fontSize: typeof size === "number" ? `${size / 2.6}px` : undefined }}
				>
					{initials}
				</div>
			)}
		</>
	);
}
