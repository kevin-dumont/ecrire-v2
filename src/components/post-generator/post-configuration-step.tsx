"use client";

import { CustomRadioGroup } from "@/components/ui/custom-radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Target, Users, ShoppingCart, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostContext } from "@/contexts/PostContext";
import { Card } from "@/components/ui/card";
import { NextButton } from "./ui/next-button";

const types = [
  {
    value: "TOFU",
    label: "Acquérir des leads (TOFU)",
    description:
      "Acquérir de la visibilité et une grande découvrabilité avec un post grand public",
    icon: Target,
  } as const,
  {
    value: "MOFU",
    label: "Acquérir des prospects (MOFU)",
    description:
      "Générez des prospects qualifiés avec du contenu à valeur ajoutée",
    icon: Users,
  } as const,
  {
    value: "BOFU",
    label: "Convertir en clients (BOFU)",
    description:
      "Convertissez vos prospects en clients avec des offres ciblées",
    icon: ShoppingCart,
  } as const,
];

const tones = [
  { value: "normal", label: "Normal" },
  { value: "serieux", label: "Sérieux" },
  { value: "humour", label: "Humour" },
  { value: "provocateur", label: "Provocateur" },
];

const sizes = [
  { value: "short", label: "Court" },
  { value: "medium", label: "Moyen" },
  { value: "long", label: "Long" },
];

export default function PostConfigurationStep() {
  const { postData, setPostData } = usePostContext();

  const validateStep = () => {
    return (
      postData.type !== null && postData.ideas !== "" && postData.tone !== ""
    );
  };

  const handleTypeChange = (value: "TOFU" | "MOFU" | "BOFU") => {
    setPostData({ ...postData, type: value });
  };

  const handleIdeasChange = (ideas: string) => {
    setPostData({ ...postData, ideas });
  };

  const handleToneChange = (tone: string) => {
    setPostData({ ...postData, tone });
  };

  const handleSizeChange = (size: "short" | "medium" | "long") => {
    setPostData({ ...postData, size });
  };

  return (
    <Card className="p-8">
      <div>
        <Label className="mb-3">Type de Post</Label>
        <CustomRadioGroup<"TOFU" | "MOFU" | "BOFU">
          options={types}
          selectedValue={postData.type || undefined}
          onValueChange={handleTypeChange}
        />
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
              placeholder={`Ex: Comment créer un post LinkedIn\n- Une accroche qui interpelle\n- Une histoire personnelle\n...`}
              rows={6}
            />
          </div>

          <div className="flex gap-4">
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

            <div>
              <Label htmlFor="size" className="mt-6 mb-3">
                Taille du Post
              </Label>
              <Select onValueChange={handleSizeChange} defaultValue="long">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Taille" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <NextButton validateStep={validateStep} />
        </div>
      </div>
    </Card>
  );
}
