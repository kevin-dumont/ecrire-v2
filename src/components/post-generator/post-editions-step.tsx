import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
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
import { useClipboard } from "@/hooks/useClipboard";
import { useTextSelection } from "@/hooks/useTextSelection";
import { useTextTransformation } from "@/hooks/useTextTransformation";
import {
  convertToNormal,
  toggleBoldText,
  toggleItalicText,
  toggleStrikethroughText,
  toggleUnderlineText,
} from "@/services/textConversionService";
import { usePostContext } from "@/contexts/PostContext";

export function PostEditionsStep() {
  const { postData } = usePostContext();
  const { copyToClipboard } = useClipboard();
  const { textareaRef, updateSelection } = useTextSelection();
  const { applyTransformation, handleContentChange } = useTextTransformation();

  const [isExpanded, setIsExpanded] = useState(false);

  const resetContent = () => {
    const resetText = `${postData.selectedHook}\n\n${postData.selectedBody}`;
    handleContentChange(resetText);
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <Card className="p-8">
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            onClick={() =>
              applyTransformation(convertToNormal, textareaRef, updateSelection)
            }
          >
            Aa
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              applyTransformation(toggleBoldText, textareaRef, updateSelection)
            }
          >
            <Bold className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              applyTransformation(
                toggleItalicText,
                textareaRef,
                updateSelection
              )
            }
          >
            <Italic className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              applyTransformation(
                toggleUnderlineText,
                textareaRef,
                updateSelection
              )
            }
          >
            <Underline className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              applyTransformation(
                toggleStrikethroughText,
                textareaRef,
                updateSelection
              )
            }
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
            <Button
              onClick={() => copyToClipboard(postData.finalPost)}
              className="button-gradient"
            >
              <Copy className="h-5 w-5 stroke-[1.5]" /> Copier le post
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
