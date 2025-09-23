import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";   // ✅ import JWT type
import { Session } from "next-auth";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.AUTH_FACEBOOK_ID!,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {

                    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
                    const response = await fetch(`${baseUrl}/api/auth/validate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (response.ok) {
                        const user = await response.json();
                        return user;
                    } else {
                        console.error("Validation failed:", response.status, response.statusText);
                        return null;
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/signIn',
    },
    callbacks: {
        // async jwt({ token, user }: { token: any; user: any }) {
        //     if (user) {
        //         token.id = user.id;
        //         token.name = user.name;
        //         token.email = user.email;
        //     }
        //     return token;
        // },
        async jwt({ token, user }: { token: JWT; user?: unknown }) {
            if (user && typeof user === "object" && "id" in user) {
                token.id = (user as { id: string }).id;
                token.name = (user as { name?: string }).name;
                token.email = (user as { email?: string }).email;
            }
            return token;
        },
        // async session({ session, token }: { session: any; token: any }) {
        //     if (token) {
        //         session.user.id = token.id as string;
        //         session.user.name = token.name as string;
        //         session.user.email = token.email as string;
        //     }
        //     return session;
        // },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token) {
                (session.user as { id?: string }).id = token.id as string;
                session.user.name = token.name ?? null;
                session.user.email = token.email ?? null;
            }
            return session;
        }
    },
}

export const {
    auth,
    handlers: { GET, POST },
} = NextAuth(authConfig);











