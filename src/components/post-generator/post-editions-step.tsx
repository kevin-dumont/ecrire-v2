import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PostEditionsStep() {
  const { postData, setPostData } = usePostContext();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Édition du post</h2>
        <p className="text-muted-foreground mb-6">
          Modifiez et copiez le contenu de votre post
        </p>
      </div>

      <Textarea
        value={postData.finalPost}
        onChange={(e) => handleContentChange(e.target.value)}
        className="min-h-[400px]"
      />

      <div className="flex justify-center mt-4">
        <Button
          variant="default"
          onClick={copyToClipboard}
          className="button-gradient"
        >
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
    </div>
  );
}
