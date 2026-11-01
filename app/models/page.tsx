"use client";

import Models from "./models.mdx";
import { Callout } from "@/components/provider/Callout";

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Models components={{ Callout }} />
    </div>
  );
}