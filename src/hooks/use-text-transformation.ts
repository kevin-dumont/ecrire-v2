import { usePostContext } from "@/contexts/PostContext";

export function useTextTransformation() {
  const { postData, setPostData } = usePostContext();

  const handleContentChange = (content: string) => {
    setPostData({ ...postData, finalPost: content });
  };

  const applyTransformation = (
    transformFn: (text: string) => string,
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    updateSelection: (start: number, end: number) => void
  ) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const transformedText = transformFn(selectedText);
      const newText =
        textarea.value.substring(0, start) +
        transformedText +
        textarea.value.substring(end);

      handleContentChange(newText);
      updateSelection(start, start + transformedText.length);
    }
  };

  return { applyTransformation, handleContentChange };
}
