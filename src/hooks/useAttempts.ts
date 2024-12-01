import { useState } from "react";

interface UseAttemptsProps {
  maxAttempts: number;
}

export function useAttempts({ maxAttempts }: UseAttemptsProps) {
  const [attempts, setAttempts] = useState(0);

  const increment = () => {
    if (attempts < maxAttempts) {
      setAttempts((prev) => prev + 1);
    }
  };

  const reset = () => {
    setAttempts(0);
  };

  const hasLeft = attempts < maxAttempts;
  const remaining = maxAttempts - attempts;

  return {
    attempts,
    increment,
    reset,
    hasLeft,
    remaining,
  };
}
