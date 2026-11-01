import type { Metadata } from "next";
import Agent from "./agent.mdx";

export const metadata: Metadata = {
  title: "Voice Agent | Miransas",
  description: "A self-hosted voice AI for businesses: conversation, orders and appointments.",
};

export default function AgentPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 pb-16 pt-6">
      <Agent />
    </div>
  );
}