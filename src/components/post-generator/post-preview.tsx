import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
  Eye,
  EyeOff,
  ImageIcon,
  Smartphone,
  Laptop,
} from "lucide-react";
import { PostData } from "@/entities/PostData";

interface PostPreviewProps {
  postData: PostData;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PostPreview({
  postData,
  isExpanded,
  setIsExpanded,
}: PostPreviewProps) {
  const [showImage, setShowImage] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const getDisplayText = () => {
    if (isExpanded) {
      return postData.finalPost;
    }

    const maxLines = isMobileView ? 2 : 3;
    const lines = postData.finalPost.split("\n");
    let visibleText = "";
    let lineCount = 0;

    for (let line of lines) {
      if (lineCount >= maxLines) break;
      if (line.trim() === "" && lineCount === maxLines - 1) break; // Skip empty last line
      visibleText += line + "\n";
      lineCount++;
    }

    if (lineCount >= maxLines && lines.length > maxLines) {
      visibleText = visibleText.trimEnd();
    }

    return visibleText.trimEnd();
  };

  const shouldShowSeeMore = () => {
    if (isExpanded) return false;
    const maxLines = isMobileView ? 2 : 3;
    const lines = postData.finalPost.split("\n");
    return (
      lines.length > maxLines ||
      (lines.length === maxLines && lines[maxLines - 1].trim() !== "")
    );
  };

  return (
    <div className="hidden lg:flex flex-col gap-2 flex-[0.75]">
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? (
            <>
              <EyeOff className="h-4 w-4 stroke-[1.5]" />
              Version pliée
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 stroke-[1.5]" />
              Version dépliée
            </>
          )}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="link"
            size="sm"
            onClick={() => setShowImage((curr) => !curr)}
          >
            {!showImage ? "Avec Image" : "Sans Image"}
            <ImageIcon className="h-4 w-4 stroke-[1.5]" />
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsMobileView(!isMobileView)}
          >
            {isMobileView ? (
              <>
                <Laptop className="h-4 w-4 stroke-[1.5]" />
                Desktop
              </>
            ) : (
              <>
                <Smartphone className="h-4 w-4 stroke-[1.5]" />
                Mobile
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border border-zinc-200 dark:border-zinc-700">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-[15px]">John Doe</h3>
                <span className="text-sm text-muted-foreground">• 1er</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Digital Marketing Expert
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <span>1j</span>
                <span>•</span>
                <span>Modifié</span>
                <span>•</span>
                <svg
                  className="w-3 h-3 text-muted-foreground"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 8H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2.5C9.72589 4.37247 10.7514 6.83247 11 9.4C11.0002 10.2676 10.8502 11.1303 10.5547 11.9547C10.2592 12.7791 9.82281 13.5533 9.26395 14.2447"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2.5C6.27411 4.37247 5.24864 6.83247 5 9.4C4.99976 10.2676 5.14978 11.1303 5.44531 11.9547C5.74084 12.7791 6.17719 13.5533 6.73605 14.2447"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="whitespace-pre-wrap text-[14px] leading-[1.4]">
            {postData.finalPost ? (
              <div className="inline-block">
                <span>{getDisplayText()}</span>
                {shouldShowSeeMore() && !isExpanded && (
                  <>
                    <span className="inline-block w-3"></span>
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-primary hover:underline text-[14px] font-medium"
                    >
                      ... plus
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">
                Votre post apparaîtra ici...
              </div>
            )}
          </div>

          {showImage && (
            <div className="relative aspect-[1.91/1] w-full rounded-lg overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1579403124614-197f69d8187b"
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <ThumbsUp className="h-4 w-4 stroke-[1.5]" />
              <span>24</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>8 commentaires</span>
              <span>•</span>
              <span>3 partages</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <Button
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="mr-2 h-5 w-5 stroke-[1.5]" />
              J'aime
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="mr-2 h-5 w-5 stroke-[1.5]" />
              Commenter
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground"
            >
              <Repeat2 className="mr-2 h-5 w-5 stroke-[1.5]" />
              Partager
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground"
            >
              <Send className="mr-2 h-5 w-5 stroke-[1.5]" />
              Envoyer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
