import { useState, useRef, useEffect } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Check,
  RefreshCcw,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { PostPreview } from "./post-preview";
import { PrevButton } from "./ui/prev-button";
import {
  toggleBoldText,
  toggleItalicText,
  toggleUnderlineText,
  toggleStrikethroughText,
  convertToNormal,
} from "@/services/textConversionService";

export function PostEditionsStep() {
  const { toast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const { postData, setPostData } = usePostContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [selection, setSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const handleContentChange = (content: string) => {
    setPostData({ ...postData, finalPost: content });
  };

  useEffect(() => {
    if (selection && textareaRef.current) {
      const { start, end } = selection;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(start, end);
    }
  }, [postData.finalPost, selection]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(postData.finalPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Post copié !",
      description: "Le contenu a été copié dans le presse-papier.",
    });
  };

  const resetContent = () => {
    const resetText = `${postData.selectedHook}\n\n${postData.selectedBody}`;
    handleContentChange(resetText);
  };

  const applyTransformation = (transformFn: (text: string) => string) => {
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
      setSelection({ start, end: start + transformedText.length });
    }
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <Card className="p-8">
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            onClick={() => applyTransformation(convertToNormal)}
          >
            Aa
          </Button>
          <Button
            variant="outline"
            onClick={() => applyTransformation(toggleBoldText)}
          >
            <Bold className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => applyTransformation(toggleItalicText)}
          >
            <Italic className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => applyTransformation(toggleUnderlineText)}
          >
            <Underline className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => applyTransformation(toggleStrikethroughText)}
          >
            <Strikethrough className="h-5 w-5" />
          </Button>
        </div>
        <Textarea
          ref={textareaRef}
          value={postData.finalPost}
          onChange={(e) => handleContentChange(e.target.value)}
          className="min-h-[200px] "
        />

        <div className="flex justify-between mt-4 items-end">
          <PrevButton />

          <div className="flex gap-2 items-end">
            <Button onClick={resetContent} variant="outline">
              <RefreshCcw className="h-5 w-5 stroke-[1.5]" />
              Réinitialiser le contenu
            </Button>
            <Button onClick={copyToClipboard} className="button-gradient">
              {copied ? (
                <>
                  <Check className="h-5 w-5 stroke-[1.5]" /> Copié !
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 stroke-[1.5]" /> Copier le post
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-3 bg-neutral-50 dark:bg-neutral-900">
        <PostPreview
          postData={postData}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </Card>
    </div>
  );
}
