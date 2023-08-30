import { redirect, error } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { authdb } from '../../hooks.server';

export const GET = async({url}) => {
    const redirectURL = 'http://localhost:5173/oauth';
    const code = await url.searchParams.get('code');

  
    try {
        const oa2c = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            redirectURL
        );

        const r = await oa2c.getToken(code);
        oa2c.setCredentials(r.tokens);

        const userInfo = JSON.parse(Buffer.from(r.tokens.id_token.split('.')[1], 'base64').toString());
        console.log(userInfo);
        authdb.set(oa2c.credentials.access_token, {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            client: oa2c
        });

    } catch(err) {
        console.log("ERROR LOGGING IN WITH GOOGLE! ", err)
        throw(420, err);
    }

    throw redirect(303, '/');
}
