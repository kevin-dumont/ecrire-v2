export type PostData = {
  type: "TOFU" | "MOFU" | "BOFU" | null;
  ideas: string;
  selectedHook: string;
  selectedBody: string;
  tone: string;
  finalPost: string;
  size: "short" | "medium" | "long";
};
