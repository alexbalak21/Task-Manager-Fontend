import { useEffect, useState } from "react";

type UseAttachmentsParams = {
  initialAttachments?: string[];
};

export function useAttachments({ initialAttachments = [] }: UseAttachmentsParams = {}) {
  const [attachments, setAttachments] = useState<string[]>(initialAttachments);
  const [attachmentInput, setAttachmentInput] = useState("");

  useEffect(() => {
    setAttachments(initialAttachments);
  }, [initialAttachments]);

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
