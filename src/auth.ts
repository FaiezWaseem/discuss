import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import GitHub from "@auth/core/providers/github";


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error('Missing Github OAuth Credentials');
}


export const { handlers : { GET , POST}, auth , signOut, signIn} = NextAuth({
    trustHost : true,
    adapter : PrismaAdapter(db),
    providers : [
        GitHub({
            clientId : GITHUB_CLIENT_ID,
            clientSecret : GITHUB_CLIENT_SECRET
        })
    ],
    callbacks : {
        // usually not needed but here we are fixing a bug in nextAuth
        async session({ session , user} : any){
            if(session && user){
                session.user.id = user.id
            }
            return session;
        }
    }
})