

import { useNavigate } from "react-router";
import Button from "../../../components/ui/Button";

export default function SidebarUserProfile() {
    const navigate = useNavigate();
    // TODO: Replace with actual user id from auth/user store
    const userId = 1;
    return (
        <div className="border-b border-[#eceef3] px-6 pb-4 pt-3 text-center">
            <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=160&q=80"
                alt="Profile avatar"
                className="mx-auto h-26 w-26 rounded-full object-cover"
            />
            <div className="mx-auto mt-2 inline-flex rounded-lg bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                Admin
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1d1d1f]">Mike</h2>
            <p className="mt-2 text-md text-[#4a4a4a]">mike@timetoprogram.com</p>
            <Button className="mt-4 w-full" onClick={() => navigate(`/user/settings`)}>
                Edit Profile
            </Button>
        </div>
    );
}
