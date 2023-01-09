import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions={
    providers: [
      
      ]
}


export default NextAuth(authOptions)