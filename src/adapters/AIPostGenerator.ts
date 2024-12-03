import { PostGeneratorPort } from "@/ports/PostGeneratorPort";
import { PostData } from "@/entities/PostData";
import { accroches } from "@/data/accroches";

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = process.env.NEXT_PUBLIC_ANTHROPIC_API_URL ?? "";

export class AIPostGenerator implements PostGeneratorPort {
  async generateHooks(
    postData: PostData
  ): Promise<{ hooks: string[]; error?: string }> {
    try {
      if (!CLAUDE_API_KEY) {
        throw new Error("API key not configured");
      }

      const typeDesc = getTypeDescription(postData.type);
      const response = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: "Tu es un expert en création de contenu LinkedIn, chargé de rédiger des posts qui attirent une large audience et deviennent viraux, tout en apportant une grande valeur à ta communauté.",
            },
            {
              type: "text",
              text: "Utilise uniquement du texte (pas d'emojis, pas de mise en forme de texte comme le gras, l'italique, le souligné, etc..) et n'utilise pas de hashtags.",
            },
            {
              type: "text",
              text: "Les accroches doivent:\n- constituée de 2 lignes séparées par un saut de ligne\n- être accrocheuses, courtes et directes pour capter immédiatement l'attention\n- susciter la curiosité pour inciter à cliquer sur 'Voir plus' et lire le post en entier\n- être sur 2 lignes maximum\n- Contenir 75% du message du sujet du post",
            },
            {
              type: "text",
              text:
                "Voici 1000 accroches dont tu dois t'inspirer le plus possible :\n" +
                accroches,
            },
            {
              type: "text",
              text: "Format de réponse souhaité:\n- du json et rien que du jsons\n- dans ce json, rien d'autre qu'un tableau de string\n- le tableau doit contenir les 5 accroches\n- pas d'explications ni avant, ni après le JSON",
            },
            {
              type: "text",
              text: 'Exemple de format attendu:\n["Accroche ligne 1\\nAccroche ligne 2", "Accroche ligne 1\\nAccroche ligne 2", "Accroche ligne 1\\nAccroche ligne 2", "Accroche ligne 1\\nAccroche ligne 2", "Accroche ligne 1\\nAccroche ligne 2"]',
            },
            {
              type: "text",
              text: "Quand il y a un 'Voici' au début de la deuxième ligne d'accroche, tu dois mettre un ' :' à la fin de la ligne, voire, plus occasionnellement, un ' 👇'.",
            },
          ],
          messages: [
            {
              role: "user",
              content: `Je veux que tu génères 5 accroches différentes pour un post LinkedIn sur le sujet suivant: "${postData.ideas}". Le post est de type ${postData.type} (${typeDesc}), avec un ton ${postData.tone}.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const hooks = JSON.parse(data.content[0].text);

      return { hooks };
    } catch (error) {
      console.error("Error generating hooks:", error);
      return { hooks: [], error: "Failed to generate hooks" };
    }
  }

  async generateBody(
    postData: PostData
  ): Promise<{ bodies?: string[]; error?: string }> {
    try {
      if (!CLAUDE_API_KEY) {
        throw new Error("API key not configured");
      }

      const typeDesc = getTypeDescription(postData.type);
      const prompt = [
        "Tu es un expert en marketing digital et en rédaction de posts LinkedIn.",
        "Je veux que tu génères 3 versions différentes d'un post LinkedIn complet.",
        "",
        "Contexte:",
        `- Type de post: ${postData.type} (${typeDesc})`,
        `- Sujet: "${postData.ideas}"`,
        `- Accroche choisie: "${postData.selectedHook}"`,
        `- Ton: "${postData.tone}"`,
        `- Taille: "${postData.size}"`,
        "",
        "Le corps du post doit:",
        "- Développer le sujet de manière structurée",
        `- Être adapté au type de contenu (${postData.type})`,
        "- Utiliser des listes à puces ou une numérotation",
        "- Inclure des émojis pertinents",
        "- Faire entre 800 et 1200 caractères",
        "- Être écrit dans un style professionnel mais engageant",
        "- Se terminer par une conclusion et un call-to-action pertinent",
        "",
        "Format de réponse souhaité:",
        "- Séparer chaque version par trois tirets (---)",
        "- Pas d'explications supplémentaires",
        "",
        "Voici 1000 accroches pour inspiration:",
        accroches,
      ].join("\n");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "anthropic-beta": "prompt-caching-2024-07-31",
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const content = data.content[0].text;
      const bodies = content
        .split("---")
        .map((body: string) => body.trim())
        .filter(Boolean);

      return { bodies };
    } catch (error) {
      console.error("Error generating body:", error);
      return { error: "Failed to generate body" };
    }
  }
}

function getTypeDescription(type: string | null): string {
  switch (type) {
    case "TOFU":
      return "contenu de découverte pour attirer de nouveaux prospects";
    case "MOFU":
      return "contenu de considération pour engager les prospects";
    case "BOFU":
      return "contenu de conversion pour transformer les prospects en clients";
    default:
      return "";
  }
}
