"use client";

import { PostData } from "@/app/dashboard/post/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface SubjectStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function SubjectStep({
  postData,
  setPostData,
}: SubjectStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Que souhaitez-vous écrire ?
        </h2>
        <p className="text-muted-foreground mb-12 text-sm">
          Décrivez le sujet principal et ajoutez vos idées clés
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="subject">Sujet principal</Label>
          <Input
            id="subject"
            value={postData.subject}
            onChange={(e) =>
              setPostData({ ...postData, subject: e.target.value })
            }
            placeholder="Ex: Les bonnes pratiques du marketing digital"
          />
        </div>

        <div>
          <Label>Idées clés</Label>
          <Textarea
            value={postData.ideas}
            onChange={(e) =>
              setPostData({ ...postData, ideas: e.target.value })
            }
            placeholder={`Ex:\n1. Les bonnes pratiques du marketing digital\n2. Les outils de marketing digital\n3. Les stratégies de marketing digital`}
            rows={6}
          />
        </div>
      </div>
    </div>
  );
}
