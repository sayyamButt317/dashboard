
import GoogleProvider from "next-auth/providers/google";


const GoogleAuth = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env. GOOGLE_CLIENT_SECRET,
      })
    ],
    session: {
      strategy: 'jwt'
    },
};

export default GoogleAuth;
