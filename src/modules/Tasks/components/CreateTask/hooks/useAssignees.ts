import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../../../auth/state/auth.store";
import { useUsersStore } from "../../../../Users/state/users.store";
import type { SelectableUser } from "../../../../Users/components/SelectUsersModal";

export interface AssignedMember {
  id: string;
  name: string;
}

interface UseAssigneesResult {
  assignedMembers: AssignedMember[];
  users: SelectableUser[];
  loading: boolean;
  usersError: string | null;
  isMembersModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  removeAssignedMember: (id: string) => void;
  handleSelectMembers: (selected: SelectableUser[]) => void;
  resetAssignees: () => void;
}

export function useAssignees(): UseAssigneesResult {
  const currentUser = useAuthStore((state) => state.user);
  const allUsers = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const usersError = useUsersStore((state) => state.error);
  const loadUsers = useUsersStore((state) => state.loadUsers);

  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([]);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const users = useMemo(
    () =>
      allUsers
        .filter((u) => u.id !== currentUser?.id && u.role !== "admin")
        .map((u) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          profile_image: u.profile_image ?? "",
        })),
    [allUsers, currentUser?.id],
  );

  const openModal = () => {
    setIsMembersModalOpen(true);
  };

  const closeModal = () => {
    setIsMembersModalOpen(false);
  };

  const removeAssignedMember = (id: string) => {
    setAssignedMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSelectMembers = (selected: SelectableUser[]) => {
    setAssignedMembers(selected.map((user) => ({ id: user.id, name: user.name })));
  };

  const resetAssignees = () => {
    setAssignedMembers([]);
  };

  return {
    assignedMembers,
    users,
    loading,
    usersError,
    isMembersModalOpen,
    openModal,
    closeModal,
    removeAssignedMember,
    handleSelectMembers,
    resetAssignees,
  };
}
