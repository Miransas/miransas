import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginClient from "@/components/auth/login-client";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");
  return <LoginClient />;
}