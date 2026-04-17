import { useState } from "react";

interface UseAttachmentsResult {
  attachments: string[];
  handleAddAttachment: () => void;
  handleRemoveAttachment: (index: number) => void;
  resetAttachments: () => void;
}

export function useAttachments(): UseAttachmentsResult {
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddAttachment = () => {
    const link = prompt("Enter file link:");
    if (!link) {
      return;
    }

    const trimmed = link.trim();
    if (!trimmed) {
      return;
    }

    setAttachments((prev) => [...prev, trimmed]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const resetAttachments = () => {
    setAttachments([]);
  };

  return {
    attachments,
    handleAddAttachment,
    handleRemoveAttachment,
    resetAttachments,
  };
}
