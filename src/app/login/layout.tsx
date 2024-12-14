"use client";

import { DependenciesProvider } from "@/contexts/DependenciesContext";
import { dependencies } from "@/config/dependencies";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DependenciesProvider dependencies={dependencies}>
      {children}
    </DependenciesProvider>
  );
}
