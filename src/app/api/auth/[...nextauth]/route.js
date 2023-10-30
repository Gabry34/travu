import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs-react";
import mongoose from "mongoose";
import User from "@/app/models/user";
import UserInfo from "@/app/models/userInfo";
import connectMongoDB from "@/app/lib/mongodb";

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          return null;
        }

        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add other providers if needed
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      console.log(profile);
      try {
        await connectMongoDB();

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          const user = await User.create({
            name: profile.given_name,
            email: profile.email,
            hashedPassword: "no password: registered with google",
          });
          const userInfo = await UserInfo.create({
            email: profile.email,
            image: profile.picture,
            biography: "no biography",
            likedPosts: [],
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
