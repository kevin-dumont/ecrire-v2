import { PostGeneratorPort } from "@/ports/PostGeneratorPort";
import { PostData } from "@/entities/PostData";

export class MockPostGenerator implements PostGeneratorPort {
  async generateHooks(
    postData: PostData
  ): Promise<{ hooks: string[]; error?: string }> {
    return {
      hooks: [
        "Mock hook 1",
        "Mock hook 2",
        "Mock hook 3",
        "Mock hook 4",
        "Mock hook 5",
      ],
    };
  }

  async generateBody(
    postData: PostData
  ): Promise<{ bodies?: string[]; error?: string }> {
    return {
      bodies: ["Mock body 1", "Mock body 2", "Mock body 3"],
    };
  }
}
