import type { Metadata } from "next";
import Support from "./support.mdx";

export const metadata: Metadata = {
  title: "Support | Miransas",
  description: "Answers to common questions and how to reach the Miransas team.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 pb-16 pt-6">
      <Support />
    </div>
  );
}