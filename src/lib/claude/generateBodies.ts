"use server";

import { PostData } from "@/entities/PostData";
import { getTypeDescription } from "./getTypeDescription";
import { posts } from "./posts";

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function generateBodies(postData: PostData) {
  try {
    if (!CLAUDE_API_KEY) {
      throw new Error("API key not configured");
    }

    const typeDesc = getTypeDescription(postData.type);

    const createPostRequest = () => {
      return fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 4096,
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
              text: "Un post doit être aéré, facile à lire avec des sauts de ligne. Parfois contenir des listes avec soit des '-' soit des '→' soit numérotées comme '1. 2. 3.'.",
            },
            {
              type: "text",
              text: "Suis cette méthode de post en 3 étapes :",
            },
            {
              type: "text",
              text: "1. Les deux premières lignes (séparées par un saut de ligne) doivent être accrocheuses, courtes et directes pour capter immédiatement l'attention.",
            },
            {
              type: "text",
              text: "Elles doivent aussi susciter la curiosité pour inciter à cliquer sur 'Voir plus' et lire le post en entier.",
            },
            {
              type: "text",
              text: "2. Le corps du post doit être en plusieurs paragraphes (mais pas trop longs). Il doit raconter une histoire et/ou aborder un sujet.",
            },
            {
              type: "text",
              text: "3. Conclure avec une phrase percutante (sans indiquer que c'est une conclusion).",
            },
            {
              type: "text",
              text: `Inspire-toi des exemples suivants pour le style et la structure des posts (ils sont séparés par '-----') :\n${posts
                .split("-----")
                .slice(0, 10)
                .sort(() => Math.random() - 0.5)
                .join("\n-----\n")}`,
            },
          ],
          messages: [
            {
              role: "user",
              content: `Écris un post de type ${
                postData.type
              } (${typeDesc}) dans un style: "${
                postData.tone
              }" qui commence par l'accroche "${
                postData.selectedHook
              }" et qui parle du sujet "${postData.ideas}."
              Taille du post souhaitée: "${postData.size}" (${
                postData.size === "short"
                  ? "300-500"
                  : postData.size === "medium"
                  ? "500-1000"
                  : "1000-1600"
              } caractères)`,
            },
          ],
        }),
      }).then((response) => response.json());
    };

    // Make three parallel API calls
    const responses = await Promise.all([
      createPostRequest(),
      createPostRequest(),
      createPostRequest(),
    ]);

    console.log("responses", responses);

    // Extract and process the text from each response
    const bodies = responses.map((data) => {
      if (
        !data.content ||
        !Array.isArray(data.content) ||
        data.content.length === 0
      ) {
        throw new Error("Unexpected API response format");
      }
      return data.content[0].text.trim();
    });

    return { bodies };
  } catch (error) {
    console.error("Error generating body:", error);
    return { error: "Failed to generate body" };
  }
}
