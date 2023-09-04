import { chat } from '@googleapis/chat';
import { getUser } from '../../hooks.server';
import { redirect, json } from '@sveltejs/kit';
import type { OAuth2Client } from 'google-auth-library';

export async function GET({cookies}) {
    const token = cookies.get('token');
    
    if (!token) {
        // [TODO] change to /login
        throw redirect(303, '/signup');
    }

    const user = getUser(token);

    if (!user) {
        throw redirect(303, '/signup');
    }
    
    const auth: OAuth2Client = user.client;

    const chats = chat({version: "v1", auth: auth});
    

    return json((await chats.spaces.list()).data);
}
