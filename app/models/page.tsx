
import Models from "./models.mdx";
import { Callout } from "@/components/provider/Callout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Models",
  description: "The AI models behind Miransas voice products, starting with Chatterbox.",
};

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Models components={{ Callout }} />
    </div>
  );
}