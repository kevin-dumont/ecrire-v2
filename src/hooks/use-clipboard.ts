import { useToast } from "@/hooks/use-toast";

export function useClipboard() {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Succès",
        description: "Le texte a été copié dans le presse-papier.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast({
        title: "Erreur",
        description: "Échec de la copie du texte.",
        variant: "destructive",
      });
    }
  };

  return { copyToClipboard };
}
