import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { type NextAuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name        : 'Credentials',
      credentials : {
        email    : { label: 'Email', type: 'text' },
        password : { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        try {
          await prisma.$connect();
        } catch (error) {
          throw new Error('Error al conectar a la base de datos');
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          }
        });
        await prisma.$disconnect();
        if (user === null || user === undefined) {
          throw new Error('No existe el usuario ingresado.');
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.password
        );
        user.password = '';
        if (!isCorrectPassword) {
          throw new Error('Contraseña Incorrecta.');
        }
        return user as User;
      }
    })
  ],
  session: {
    strategy : 'jwt',
    maxAge   : 2 * 60 * 60
  },
  callbacks: {
    async jwt ({ token, user }) {
      token.role = user.role;
      return token;
    },
    async session ({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};
