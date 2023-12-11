import bcrypt from 'bcrypt'
import NextAuth , {AuthOptions} from 'next-auth'
import  CredentialsProvider from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/app/libs/prismadb'


export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers : [
        Github({
            clientId : process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string,
        }),
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name:'credentials',
            credentials : {
                email : {lable : 'email' , type : 'text'},
                password : {lable : 'password' , type : 'password'},
            },
            async authorize(credentials)  {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Inavalied Credentials');
                }
                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials.email
                    }
                });
                
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalied Credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword) {
                    throw new Error('Invalied Credentials')
                }

                return user;
            }
        })
    ],
    debug : process.env.NODE_ENV === 'development',
    session : {
        strategy : 'jwt'
    },
    secret : process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST};