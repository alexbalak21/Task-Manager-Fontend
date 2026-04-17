


import { useState } from "react";
import Button from "../../../components/ui/Button";
import EditUserModal from "../pages/EditUserModal";
import Avatar from "./Avatar";


interface SidebarUserProfileProps {
    name: string;
    email: string;
    profile_image: string;
    userId: number | string;
}

export default function SidebarUserProfile({ name, email, profile_image, userId }: SidebarUserProfileProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    return (
        <div className="border-b border-gray-200 px-6 pb-4 pt-3 text-center">
           < Avatar name={name} profile_image={profile_image} size={120} className="mx-auto" />
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
