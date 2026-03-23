/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // Profil verilerini tam yetkiyle çekelim
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login, // Kullanıcı adını buraya ekliyoruz
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: any) {
      // DEBUG: Terminale bak, burada ne yazdığını gör
      console.log("Giriş denemesi - Kullanıcı Adı:", profile?.login);
      console.log("Giriş denemesi - Email:", user?.email);

      // KENDİ BİLGİLERİNİ BURAYA YAZ
      const ALLOWED_USERNAME = "sardorazimov"; // GitHub kullanıcı adın
      const ALLOWED_EMAIL = "sardorazimov2901@gmail.com";

      // Ya kullanıcı adı tutmalı ya da email. İkisinden biri varsa girersin.
      if (profile?.login === ALLOWED_USERNAME || user?.email === ALLOWED_EMAIL) {
        console.log("Giriş Başarılı! ✅");
        return true;
      }

      console.log("Yetkisiz Giriş Denemesi Engellendi! ❌");
      return false;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});