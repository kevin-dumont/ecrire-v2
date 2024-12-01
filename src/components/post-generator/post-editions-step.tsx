import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, RefreshCcw, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { PostPreview } from "./post-preview";
import { PrevButton } from "./ui/prev-button";

export function PostEditionsStep() {
  const { toast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const { postData, setPostData, currentStep, setCurrentStep } =
    usePostContext();

  const handleContentChange = (content: string) => {
    setPostData({ ...postData, finalPost: content });
  };

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

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <Card className="p-8">
        <Textarea
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
