"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PostData } from "@/app/dashboard/post/page";
import { Target, Users, ShoppingCart } from "lucide-react";

interface PostTypeStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function PostTypeStep({
  postData,
  setPostData,
}: PostTypeStepProps) {
  const handleTypeChange = (value: "TOFU" | "MOFU" | "BOFU") => {
    setPostData({ ...postData, type: value });
  };

  const types = [
    {
      value: "TOFU",
      label: "Découvrabilité",
      description:
        "Augmentez votre visibilité et attirez de nouveaux prospects",
      icon: Target,
    },
    {
      value: "MOFU",
      label: "Génération de prospects",
      description: "Engagez votre audience et générez des leads qualifiés",
      icon: Users,
    },
    {
      value: "BOFU",
      label: "Conversion",
      description: "Convertissez vos prospects en clients",
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Quel est votre objectif avec ce post ?
        </h2>
        <p className="text-muted-foreground mb-6">
          Choisissez le type de post en fonction de votre objectif marketing
        </p>
      </div>

      <RadioGroup
        value={postData.type || undefined}
        onValueChange={handleTypeChange}
        className="grid gap-4"
      >
        {types.map((type) => (
          <div key={type.value}>
            <RadioGroupItem
              value={type.value}
              id={type.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={type.value}
              className="flex items-start space-x-4 border border-neutral-800 rounded-lg p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
            >
              <type.icon className="h-6 w-6 text-primary shrink-0" />
              <div className="space-y-1">
                <p className="font-medium leading-none">{type.label}</p>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
