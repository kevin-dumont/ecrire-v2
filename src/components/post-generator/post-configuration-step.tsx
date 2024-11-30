"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  },
  {
    value: "MOFU",
    label: "Acquérir des prospects (MOFU)",
    description:
      "Générez des prospects qualifiés avec du contenu à valeur ajoutée",
    icon: Users,
  },
  {
    value: "BOFU",
    label: "Convertir en clients (BOFU)",
    description:
      "Convertissez vos prospects en clients avec des offres ciblées",
    icon: ShoppingCart,
  },
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
  const { postData, setPostData, setCurrentStep, currentStep } =
    usePostContext();

  const validateStep = () => {
    return (
      postData.type !== null && postData.ideas !== "" && postData.tone !== ""
    );
  };

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

  const handleSizeChange = (size: string) => {
    const updatedData = { ...postData, size };
    setPostData(updatedData);
  };

  return (
    <Card className="p-8">
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
                className="flex items-start space-x-2 border bg-accent hover:bg-accent/50 dark:border-neutral-800 rounded-lg p-3 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary mb-0"
              >
                <type.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="space-y-1.5">
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

        <NextButton validateStep={validateStep} />
      </div>
    </Card>
  );
}
