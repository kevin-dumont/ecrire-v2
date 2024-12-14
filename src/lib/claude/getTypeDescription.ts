export function getTypeDescription(type: string | null): string {
  switch (type) {
    case "TOFU":
      return "contenu de découverte pour attirer de nouveaux prospects";
    case "MOFU":
      return "contenu de considération pour engager les prospects";
    case "BOFU":
      return "contenu de conversion pour transformer les prospects en clients. On va utiliser des techniques de copywriting comme AIDA ou PAS (sans préciser qu'on les utilise, sans titrer chaque étape)";
    default:
      return "";
  }
}
