import type { Metadata } from "next";
import Careers from "./careers.mdx";

export const metadata: Metadata = {
  title: "Careers | Miransas",
  description: "Working at Miransas: how we work and how to reach us.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 py-16">
      <Careers />
    </div>
  );
}