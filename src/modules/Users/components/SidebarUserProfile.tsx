


import { useState } from "react";
import Button from "../../../components/ui/Button";
import EditUserModal from "../pages/EditUserModal";


interface SidebarUserProfileProps {
    name: string;
    email: string;
    profile_image: string;
    userId: number | string;
}

export default function SidebarUserProfile({ name, email, profile_image, userId }: SidebarUserProfileProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    console.log("profile_image:", profile_image);
    return (
        <div className="border-b border-gray-200 px-6 pb-4 pt-3 text-center">
            {profile_image ? (
                <img
                    src={
                        !profile_image
                            ? '/default-avatar.png'
                            : profile_image.startsWith('data:') || profile_image.startsWith('http')
                                ? profile_image
                                : `data:image/jpeg;base64,${profile_image}`
                    }
                    alt="Profile avatar"
                    className="mx-auto h-26 w-26 rounded-full object-cover"
                />
            ) : (
                <div className="mx-auto h-26 w-26 flex items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-600 select-none" style={{ width: '6.5rem', height: '6.5rem' }}>
                    {name ? name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?"}
                </div>
            )}
            <div className="mx-auto mt-2 inline-flex rounded-lg bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                Admin
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1d1d1f]">{name}</h2>
            <p className="mt-2 text-md text-[#4a4a4a]">{email}</p>
            <Button className="mt-4 w-full" onClick={() => setShowEditModal(true)}>
                Edit Profile
            </Button>
            {showEditModal && (
                <EditUserModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    userId={userId}
                />
            )}
        </div>
    );
}
