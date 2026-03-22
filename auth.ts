// auth.ts
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" }, // JWT'yi burada da zorluyoruz
  callbacks: {
    ...authConfig.callbacks,
    // JWT oluşurken veritabanındaki ID'yi token'ın içine atıyoruz
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    // Token'daki ID'yi alıp session.user.id'ye eşitliyoruz
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
});