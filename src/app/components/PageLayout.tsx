"use client";

import { ReactNode } from "react";
import PageLayout from "@/components/layout/PageLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
