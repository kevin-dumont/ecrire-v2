import { Button } from "@/components/ui/button";
import { usePostContext } from "@/contexts/PostContext";
import { ArrowRight } from "lucide-react";

interface NextButtonProps {
  validateStep: () => boolean;
}

export function NextButton({ validateStep }: NextButtonProps) {
  const { setCurrentStep, currentStep } = usePostContext();

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Button onClick={handleNext} disabled={!validateStep()}>
      Suivant <ArrowRight className="h-5 w-5 stroke-[1.5]" />
    </Button>
  );
}
