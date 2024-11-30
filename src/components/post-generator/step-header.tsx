import { usePostContext } from "@/contexts/PostContext";
import { Progress } from "@/components/ui/progress";

export function StepHeader() {
  const { currentStep } = usePostContext();

  const stepTitles = [
    {
      title: "Configuration du post",
      description: "Choisissez les paramètres de votre post",
    },
    {
      title: "Choisissez votre accroche",
      description: "Générez une accroche pour votre post",
    },
    {
      title: "Contenu du post",
      description: "Générez un contenu pour votre post",
    },
    {
      title: "Édition du post",
      description: "Éditez votre post avant de le publier",
    },
  ];

  const progressPercentage =
    ((currentStep - 1) / (stepTitles.length - 1)) * 90 + 10;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-2">
          {stepTitles[currentStep - 1].title}
          <span className="text-muted-foreground ml-2 font-normal text-lg">
            (étape {currentStep} sur {stepTitles.length})
          </span>
        </h1>
      </div>
      <h2 className="text-muted-foreground font-normal text-lg mb-4">
        {stepTitles[currentStep - 1].description}
      </h2>
      <div className="mb-6">
        <Progress value={progressPercentage} />
      </div>
    </>
  );
}
