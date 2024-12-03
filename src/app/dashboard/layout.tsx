"use client";

import { DependenciesProvider } from "@/contexts/DependenciesContext";
import { dependencies } from "@/config/dependencies";
import Layout from "@/components/layout/Layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DependenciesProvider dependencies={dependencies}>
      <Layout>{children}</Layout>
    </DependenciesProvider>
  );
}
