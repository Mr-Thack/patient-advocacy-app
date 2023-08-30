import { building } from '$app/environment';



type GOA2C = {
    credentials: {
        access_token: string;
        refresh_token: string;
        scope: string;
        token_type: string;
        id_token: string;
        expiry_date: string;
    }
}

type AuthUser = {
   name: string;
   email: string;
   picture: string;
   client: GOA2C;
}

export const authdb: Map<String, AuthUser> = new Map()
global.authdb = authdb;

if (!building) {
    // init();
    console.log('Starting up....');
}


