import { PostGeneratorPort } from "@/ports/PostGeneratorPort";
import { PostData } from "@/entities/PostData";
import { generateHooks } from "@/lib/claude/generateHooks";
import { generateBodies } from "@/lib/claude/generateBodies";

export class AIPostGenerator implements PostGeneratorPort {
  async generateHooks(
    postData: PostData
  ): Promise<{ hooks: string[]; error?: string }> {
    return await generateHooks(postData);
  }

  async generateBody(
    postData: PostData
  ): Promise<{ bodies?: string[]; error?: string }> {
    return await generateBodies(postData);
  }
}
