import { AIPostGenerator } from "@/adapters/AIPostGenerator";
import { MockPostGenerator } from "@/adapters/MockPostGenerator";
import { AuthAdapter } from "@/adapters/AuthAdapter";
import { Dependencies } from "@/contexts/Dependencies";

const isDevelopment = process.env.NODE_ENV === "development";

export const dependencies: Dependencies = {
  postGenerator: false //isDevelopment
    ? new MockPostGenerator()
    : new AIPostGenerator(),
  auth: new AuthAdapter(),
};
