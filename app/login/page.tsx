"use client";
import { signIn } from "next-auth/react";
import LoginClient from "../../components/auth/login-client";

export default function LoginPage() {
  return (
   <LoginClient />
  );
}