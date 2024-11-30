"use client";

import { StepHeader } from "@/components/post-generator/step-header";

import { PostProvider, usePostContext } from "@/contexts/PostContext";

function PostGeneratorContent() {
  const { currentStep, steps } = usePostContext();

  const CurrentStepComponent = steps?.[currentStep - 1]?.component;

  return (
    <div className="w-full max-w-full p-8">
      <StepHeader />
      <CurrentStepComponent />
    </div>
  );
}

export default function PostGeneratorPage() {
  return (
    <PostProvider>
      <PostGeneratorContent />
    </PostProvider>
  );
}
