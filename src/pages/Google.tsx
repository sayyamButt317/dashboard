
import GoogleProvider from "next-auth/providers/google";


const options = {
    providers: [
      GoogleProvider({
        clientId: '776126691534-bnidrosldb7qeblmvi89l7loorfpgr54.apps.googleusercontent.com',
        clientSecret: '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',
      })
    ],
    session: {
      strategy: 'jwt'
    },
};

export default options;
