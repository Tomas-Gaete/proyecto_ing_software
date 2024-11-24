import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				/*  :(   */
				let user = null;
				user = { email: credentials.email as string, id: "69"};
				// return user object with their profile data or null if no user is found
				return new Promise((resolve) => resolve(user));
			},
		}),
	],
});
