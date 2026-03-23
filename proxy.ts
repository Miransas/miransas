///proxy.ts
// middleware.ts (veya proxy.ts)
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Sadece default olarak dışa aktar, Next.js bunu bekler
export default NextAuth(authConfig).auth;

export const config = {
  // api, _next/static vb. hariç her tetiklenmede çalışır
  matcher: [
     
    "/admin/:path*",
    //  "/agent/:path*", --- IGNORE ---
  ],
  
};
