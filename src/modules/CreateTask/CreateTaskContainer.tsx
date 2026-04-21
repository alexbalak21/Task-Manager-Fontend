import SelectUsersModal from "../Users/components/SelectUsersModal";
import TaskTitleInput from "./components/TaskTitleInput";
import TaskDescriptionInput from "./components/TaskDescriptionInput";
import TaskPrioritySelect from "./components/TaskPrioritySelect";
import TaskDueDateInput from "./components/TaskDueDateInput";
import TaskAssignees from "./components/TaskAssignees";
import TaskTodoList from "./components/TaskTodoList";
import TaskAttachments from "./components/TaskAttachments";

import { useTaskForm } from "./hooks/useTaskForm";
import { useTodoList } from "./hooks/useTodoList";
import { useAttachments } from "./hooks/useAttachments";
import { useAssignees } from "./hooks/useAssignees";

export default function CreateTaskContainer() {
  // -------------------------
  // TODO LIST HOOK
  // -------------------------
  const {
    todoItems,
    todoInput,
    handleTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleTodoKeyDown,
    resetTodoList,
  } = useTodoList();

  // -------------------------
  // ATTACHMENTS HOOK
  // -------------------------
  const {
    attachments,
    attachmentInput,
    setAttachmentInput,
    addAttachment,
    removeAttachment,
    resetAttachments,
  } = useAttachments();

  // -------------------------
  // ASSIGNEES HOOK
  // -------------------------
  const {
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
  } = useAssignees();

  // -------------------------
  // FORM HOOK
  // -------------------------
  const { formData, handleInputChange, handleSubmit, isSubmitting, error } =
    useTaskForm({
      assignedMembers,
      todoItems,
      attachments,
      onSuccess: () => {
        resetTodoList();
        resetAttachments();
        resetAssignees();
      },
    });

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-sm">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Create Task
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <TaskTitleInput value={formData.title} onChange={handleInputChange} />

        {/* DESCRIPTION */}
        <TaskDescriptionInput
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* PRIORITY / DATE / ASSIGN */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TaskPrioritySelect
            value={formData.priority}
            onChange={handleInputChange}
          />

          <TaskDueDateInput
            value={formData.dueDate}
            onChange={handleInputChange}
          />

          <TaskAssignees
            assignedMembers={assignedMembers}
            loading={loading}
            onRemove={removeAssignedMember}
            onOpenModal={openModal}
          />
        </div>

        {/* TODO LIST */}
        <TaskTodoList
          TodoItems={todoItems}
          input={todoInput}
          onInput={handleTodoInput}
          onAdd={handleAddTodo}
          onRemove={handleRemoveTodo}
          onKeyDown={handleTodoKeyDown}
        />

        {/* ATTACHMENTS */}
        <TaskAttachments
          attachments={attachments}
          input={attachmentInput}
          onInput={setAttachmentInput}
          onAdd={addAttachment}
          onRemove={removeAttachment}
        />

        {/* ERRORS */}
        {usersError && (
          <p className="text-sm font-medium text-red-600">{usersError}</p>
        )}

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-450 py-3 font-semibold text-white"
        >
          {isSubmitting ? "CREATING TASK..." : "CREATE TASK"}
        </button>
      </form>

      {/* USERS MODAL */}
      <SelectUsersModal
        isOpen={isMembersModalOpen}
        onClose={closeModal}
        users={users}
        defaultSelectedIds={assignedMembers.map((m) => m.id)}
        onDone={handleSelectMembers}
      />
    </div>
  );
}
