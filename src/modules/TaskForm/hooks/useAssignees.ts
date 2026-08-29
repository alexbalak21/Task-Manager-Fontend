import { useEffect, useMemo, useState } from "react";
import { useToast } from "../../../components/ui/ToastProvider";
import { useAuthStore } from "../../auth/state/auth.store";
import { useUsersStore } from "../../Users/state/users.store";
import type { SelectableUser } from "../../Users/components/SelectUsersModal";
import { UserTasksAPI } from "../../UserTasks/services/userTasks.api";

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

type UseAssigneesParams = {
  initialAssignedMembers?: AssignedMember[];
  mode?: "create" | "edit";
  taskId?: number;
};

export function useAssignees({
  initialAssignedMembers = [],
  mode = "create",
  taskId,
}: UseAssigneesParams = {}): UseAssigneesResult {
  const toast = useToast();
  const currentUser = useAuthStore((state) => state.user);
  const allUsers = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const usersError = useUsersStore((state) => state.error);
  const loadUsers = useUsersStore((state) => state.loadUsers);

  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>(initialAssignedMembers);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    setAssignedMembers(initialAssignedMembers);
  }, [initialAssignedMembers]);

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

  const removeAssignedMember = async (id: string) => {
    const nextMembers = assignedMembers.filter((member) => member.id !== id);

    if (mode === "edit" && taskId) {
      try {
        await UserTasksAPI.unassignUserFromTask(Number(id), taskId);
        setAssignedMembers(nextMembers);
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not remove assignment";
        toast.error("Assignment update failed", message);
        return;
      }
    }

    setAssignedMembers(nextMembers);
  };

  const handleSelectMembers = async (selected: SelectableUser[]) => {
    const nextMembers = selected.map((user) => ({ id: user.id, name: user.name }));

    if (mode === "edit" && taskId) {
      const previousIds = new Set(assignedMembers.map((member) => Number(member.id)));
      const nextIds = new Set(nextMembers.map((member) => Number(member.id)));

      try {
        await Promise.all([
          ...nextMembers
            .filter((member) => !previousIds.has(Number(member.id)))
            .map((member) => UserTasksAPI.assignUserToTask(Number(member.id), taskId)),
          ...assignedMembers
            .filter((member) => !nextIds.has(Number(member.id)))
            .map((member) => UserTasksAPI.unassignUserFromTask(Number(member.id), taskId)),
        ]);

        setAssignedMembers(nextMembers);
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not update assignments";
        toast.error("Assignment update failed", message);
        return;
      }
    }

    setAssignedMembers(nextMembers);
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
