import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { dbConnect } from '@/lib/dbConnect';
import WaterReading from '@/models/WaterReading';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const connection = await dbConnect();
        if (!connection) {
          console.warn('Database unavailable during credential authorization.');
          return null;
        }

        const user = await WaterReading.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          lastName: user.last_name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
