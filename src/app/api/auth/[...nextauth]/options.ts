import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          prisma.$connect();
        } catch (error) {
          throw new Error("Error al conectar a la base de datos");
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        prisma.$disconnect();
        if (!user) {
          throw new Error("No existe el usuario ingresado.");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.password as string
        );
        user!.password = "";
        if (!isCorrectPassword) {
          throw new Error("Contraseña Incorrecta.");
        }

        if (user && isCorrectPassword) {
          return user as User;
        } else {
          throw new Error("Error al iniciar sesión");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
