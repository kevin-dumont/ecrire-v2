"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostData } from "@/app/dashboard/post/page";
import { Target, Users, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostConfigurationStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function PostConfigurationStep({
  postData,
  setPostData,
}: PostConfigurationStepProps) {
  const handleTypeChange = (value: "TOFU" | "MOFU" | "BOFU") => {
    const updatedData = { ...postData, type: value };
    setPostData(updatedData);
  };

  const handleIdeasChange = (ideas: string) => {
    const updatedData = { ...postData, ideas };
    setPostData(updatedData);
  };

  const handleToneChange = (tone: string) => {
    const updatedData = { ...postData, tone };
    setPostData(updatedData);
  };

  const types = [
    {
      value: "TOFU",
      label: "TOFU",
      description: "Visibilité et découvrabilité",
      icon: Target,
    },
    {
      value: "MOFU",
      label: "MOFU",
      description: "Générez des prospects",
      icon: Users,
    },
    {
      value: "BOFU",
      label: "BOFU",
      description: "Convertir en clients",
      icon: ShoppingCart,
    },
  ];

  const tones = [
    { value: "normal", label: "Normal" },
    { value: "serieux", label: "Sérieux" },
    { value: "humour", label: "Humour" },
    { value: "provocateur", label: "Provocateur" },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Configuration du post</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Définissez les paramètres de votre post
        </p>
      </div>

      <div>
        <Label className="mb-3">Type de Post</Label>
        <RadioGroup
          value={postData.type || undefined}
          onValueChange={handleTypeChange}
          className="flex gap-2"
        >
          {types.map((type) => (
            <div key={type.value} className="flex-1">
              <RadioGroupItem
                value={type.value}
                id={type.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={type.value}
                className="flex items-start space-x-2 border border-neutral-800 rounded-lg p-3 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary mb-0"
              >
                <type.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-medium leading-none">{type.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-6 mt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject" className="mt-6 mb-3">
              Sujet et idées
            </Label>

            <Textarea
              value={postData.ideas}
              onChange={(e) => handleIdeasChange(e.target.value)}
              placeholder={`Ex: Comment créer un post LinkedIn\n- Une accroche qui interpelle\n- Une histoire personnelle\n- Des paragraphes courts\n- Un call-to-action`}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="tone" className="mt-6 mb-3">
              Ton du Post
            </Label>
            <Select onValueChange={handleToneChange} defaultValue="normal">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
