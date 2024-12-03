import { PostData } from "@/contexts/PostData";

export interface PostGeneratorPort {
  generateHooks(
    postData: PostData
  ): Promise<{ hooks: string[]; error?: string }>;
  generateBody(
    postData: PostData
  ): Promise<{ bodies?: string[]; error?: string }>;
}