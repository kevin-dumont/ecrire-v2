import { AIPostGenerator } from "@/adapters/AIPostGenerator";
import { MockPostGenerator } from "@/adapters/MockPostGenerator";
import { Dependencies } from "@/contexts/Dependencies";

const isDevelopment = process.env.NODE_ENV === "development";

export const dependencies: Dependencies = {
  postGenerator: isDevelopment
    ? new MockPostGenerator()
    : new AIPostGenerator(),
};
