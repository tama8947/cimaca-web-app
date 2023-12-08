import bcrypt from 'bcrypt';
import { type NextAuthOptions, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prismaInstance } from '../../services/db/prisma';

const prisma = prismaInstance;

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

        const user = await prisma.users.findFirst({
          where: {
            email: credentials?.email
          },
          include: {
            role: {
              include: {
                roles_modules_permissions: {
                  include: {
                    module: true
                  }
                }
              }
            }
          }
        });

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
      const userStr = user as User;
      if (user !== undefined) token.role = userStr.role;
      return token;
    },
    async session ({ session, token }) {
      const userStr = session.user as User;
      if (session.user !== undefined) userStr.role = token.role;
      return session;
    }
  }
};
