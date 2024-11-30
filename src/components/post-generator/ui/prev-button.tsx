import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { usePostContext } from "@/contexts/PostContext";

export function PrevButton() {
  const { setCurrentStep, currentStep } = usePostContext();

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <Button variant="outline" onClick={handlePrev}>
        <ArrowLeft className="h-5 w-5 stroke-[1.5]" /> Retour
      </Button>
    </div>
  );
}
