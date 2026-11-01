import type { Metadata } from "next";
import Developers from "./developers.mdx";

export const metadata: Metadata = {
  title: "Developers",
  description: "Tools, platform plans and how we build at Miransas.",
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 py-16">
      <Developers />
    </div>
  );
}