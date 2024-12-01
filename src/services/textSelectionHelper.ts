export function transformSelectedText(
  textarea: HTMLTextAreaElement,
  transformFn: (text: string) => string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  if (selectedText) {
    const transformedText = transformFn(selectedText);
    const newText =
      textarea.value.substring(0, start) +
      transformedText +
      textarea.value.substring(end);
    return newText;
  }
  return textarea.value;
}
