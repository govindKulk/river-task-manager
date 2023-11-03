import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import  GithubProvider  from "next-auth/providers/github";

import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'
import { signIn } from "next-auth/react";
import NextAuth from "next-auth/next";
export const authOptions : AuthOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text"
                },
                password: {
                    label: "password",
                    type: "password"
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error ("Invalid Credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid Credentials");
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user?.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error("Invalid Credentials");
                }

                return user
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),

    ],


    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: '/'
    },

    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);