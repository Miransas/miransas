import type { Metadata } from "next";
import Contact from "./contact.mdx";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach the Miransas team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-6 pb-16 pt-6">
      <Contact />
    </div>
  );
}