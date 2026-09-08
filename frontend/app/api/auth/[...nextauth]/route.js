import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockUsers } from '@/lib/mockData';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' }
      },
      async authorize(credentials) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          if (res.ok) {
            const data = await res.json();
            return {
              id: data._id,
              email: data.email,
              name: data.username,
              role: data.role
            };
          }
        } catch (e) {
          console.error('NextAuth authorize DB lookup error:', e);
        }

        const user = mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar,
            vendorId: user.vendorId
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.vendorId = user.vendorId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.vendorId = token.vendorId;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET || 'petzio-secret-key-for-development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };