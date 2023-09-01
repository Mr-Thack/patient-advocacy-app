import { building } from '$app/environment';
import type OAuth2Client from 'google-auth-library';




export type AuthUser = {
   name: string;
   email: string;
   picture: string;
   client: typeof OAuth2Client;
}

export type AuthDB = Map<String, AuthUser>

const authdb: AuthDB = new Map()

export function addUser(token: String, userData: AuthUser) {
    authdb.set(token, userData);
}

export function getUser(token: String) : AuthUser | undefined {
    return authdb.get(token);
}


if (!building) {
    // init();
    console.log('Starting up....');
}


