import { useState, useRef, useEffect } from "react";

export function useTextSelection() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const updateSelection = (start: number, end: number) => {
    setSelection({ start, end });
  };

  useEffect(() => {
    if (selection && textareaRef.current) {
      const { start, end } = selection;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(start, end);
    }
  }, [selection]);

  return { textareaRef, updateSelection };
}
