import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleAuthProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "./database/mongoClientPromise";
import { userModel } from "./models/user-model";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(client, { databaseName: process.env.DATABASE_NAME }),
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password Mismatch");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      },
    }),

    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});


//hiiiiiiiiii

function test(){
console.log("hiii")
}