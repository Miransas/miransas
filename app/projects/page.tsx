import type { Metadata } from "next";
import Projects from "./projects.mdx";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything built under the Miransas name and where it stands.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 py-16">
      <Projects />
    </div>
  );
}