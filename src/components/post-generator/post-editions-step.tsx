import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { PostPreview } from "./post-preview";

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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <Card className="p-8">
        <Textarea
          value={postData.finalPost}
          onChange={(e) => handleContentChange(e.target.value)}
          className="min-h-[200px] "
        />

        <div className="flex justify-between mt-4">
          <Button onClick={handleBack} disabled={currentStep === 1}>
            Retour
          </Button>
          <Button onClick={copyToClipboard} className="button-gradient">
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5 stroke-[1.5]" /> Copié !
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5 stroke-[1.5]" /> Copier le post
              </>
            )}
          </Button>
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
