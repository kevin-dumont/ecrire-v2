'use server';

import { PostData } from "@/app/dashboard/post/page";

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function generateHooks(type: PostData["type"], subject: string) {
  try {
    if (!CLAUDE_API_KEY) {
      throw new Error("API key not configured");
    }

    const typeDesc = getTypeDescription(type);
    const prompt = [
      'Tu es un expert en marketing digital et en rédaction de posts LinkedIn.',
      `Je veux que tu génères 5 accroches différentes pour un post LinkedIn sur le sujet suivant: "${subject}".`,
      `Le post est de type ${type} (${typeDesc}).`,
      '',
      'Les accroches doivent:',
      '- Être accrocheuses et donner envie de lire la suite',
      `- Être adaptées au type de contenu (${type})`,
      '- Être sur 2 lignes maximum',
      '- Utiliser un ton professionnel mais pas trop formel',
      '- Inclure des émojis pertinents (1 ou 2 maximum)',
      '- La première ligne doit être courte et percutante',
      '- La deuxième ligne doit créer du suspense et se terminer par "..."',
      '',
      'Format de réponse souhaité:',
      '- Une accroche toutes les deux lignes',
      '- Séparer chaque accroche par une ligne vide',
      '- Pas de numérotation',
      '- Pas d\'explications supplémentaires'
    ].join('\n');

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call Claude API");
    }

    const data = await response.json();
    const content = data.content[0].text;
    const hooks = content
      .split("\n\n")
      .map(hook => hook.trim())
      .filter(Boolean);

    return { hooks };
  } catch (error) {
    console.error("Error generating hooks:", error);
    return { error: "Failed to generate hooks" };
  }
}

export async function generateBody(postData: PostData) {
  try {
    if (!CLAUDE_API_KEY) {
      throw new Error("API key not configured");
    }

    const typeDesc = getTypeDescription(postData.type);
    const prompt = [
      'Tu es un expert en marketing digital et en rédaction de posts LinkedIn.',
      'Je veux que tu génères 3 versions différentes du corps principal d\'un post LinkedIn.',
      '',
      'Contexte:',
      `- Type de post: ${postData.type} (${typeDesc})`,
      `- Sujet: "${postData.subject}"`,
      `- Idées clés: "${postData.ideas}"`,
      `- Accroche choisie: "${postData.selectedHook}"`,
      '',
      'Le corps du post doit:',
      '- Développer le sujet de manière structurée',
      `- Être adapté au type de contenu (${postData.type})`,
      '- Utiliser des listes à puces ou une numérotation',
      '- Inclure des émojis pertinents',
      '- Faire entre 800 et 1200 caractères',
      '- Être écrit dans un style professionnel mais engageant',
      '',
      'Format de réponse souhaité:',
      '- Séparer chaque version par trois tirets (---)',
      '- Pas d\'explications supplémentaires'
    ].join('\n');

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call Claude API");
    }

    const data = await response.json();
    const content = data.content[0].text;
    const bodies = content
      .split("---")
      .map((body) => body.trim())
      .filter(Boolean);

    return { bodies };
  } catch (error) {
    console.error("Error generating body:", error);
    return { error: "Failed to generate body" };
  }
}

export async function generateConclusions(postData: PostData) {
  try {
    if (!CLAUDE_API_KEY) {
      throw new Error("API key not configured");
    }

    const typeDesc = getTypeDescription(postData.type);
    const prompt = [
      'Tu es un expert en marketing digital et en rédaction de posts LinkedIn.',
      'Je veux que tu génères 3 conclusions différentes pour un post LinkedIn.',
      '',
      'Contexte:',
      `- Type de post: ${postData.type} (${typeDesc})`,
      `- Sujet: "${postData.subject}"`,
      `- Corps du post: "${postData.selectedBody}"`,
      '',
      'La conclusion doit:',
      '- Être composée de 2 à 6 lignes',
      '- Inclure un call-to-action adapté au type de post',
      '- Encourager l\'engagement (commentaires, likes, partages)',
      '- Utiliser 2-3 émojis pertinents',
      '- Être cohérente avec le ton du post',
      '- Terminer par une question ou une invitation claire',
      '',
      'Format de réponse souhaité:',
      '- Séparer chaque conclusion par une ligne vide',
      '- Pas de numérotation',
      '- Pas d\'explications supplémentaires'
    ].join('\n');

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call Claude API");
    }

    const data = await response.json();
    const content = data.content[0].text;
    const conclusions = content
      .split("\n\n")
      .map(conclusion => conclusion.trim())
      .filter(Boolean);

    return { conclusions };
  } catch (error) {
    console.error("Error generating conclusions:", error);
    return { error: "Failed to generate conclusions" };
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