import { PostGeneratorPort } from "@/ports/PostGeneratorPort";
import { AuthPort } from "@/ports/AuthPort";

export interface Dependencies {
  postGenerator: PostGeneratorPort;
  auth: AuthPort;
}
