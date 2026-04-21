import { useState } from "react";

export function useAttachments() {
  const [attachments, setAttachments] = useState<string[]>([]);
  const [attachmentInput, setAttachmentInput] = useState("");

  const addAttachment = () => {
    if (attachmentInput.trim() === "") return;
    setAttachments(prev => [...prev, attachmentInput.trim()]);
    setAttachmentInput("");
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const resetAttachments = () => {
    setAttachments([]);
    setAttachmentInput("");
  };

  return {
    attachments,
    attachmentInput,
    setAttachmentInput,
    addAttachment,
    removeAttachment,
    resetAttachments,
  };
}
