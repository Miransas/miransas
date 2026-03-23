import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BlogEditor from "@/components/blog/blog-editor";

export default async function NewBlogPage() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="">
      <BlogEditor />
    </div>
  );
}