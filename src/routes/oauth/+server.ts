import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { addUser } from '../../hooks.server';

export async function GET({url, cookies}) {
    const redirectURL = 'http://localhost:5173/oauth';
    const code = url.searchParams.get('code');

    if (!code) {
        throw(420);
    }
  
    try {
        const oa2c = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            redirectURL
        );

        const { tokens } = await oa2c.getToken(code);

        oa2c.setCredentials(tokens);
        //@ts-ignore
        const userInfo = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64').toString());
        
        const token = tokens.access_token;
    
        // const oauth_token = tokens.access_token
        if (!token) {
            throw(420);
        }

        addUser(token, {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            //@ts-ignore
            client: oa2c
        });

        cookies.set('token', token, { path: '/' });
    } catch(err) {
        console.error("ERROR LOGGING IN WITH GOOGLE! ", err)
        throw(420);
    }

    throw redirect(303, '/');
}
