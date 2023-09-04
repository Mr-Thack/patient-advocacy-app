import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';


export const actions = {
	OAuth2: async({}) => {
		const redirectURL = "http://localhost:5173/oauth";

		const oa2 = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectURL);

		const authURL = oa2.generateAuthUrl({
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'openid',
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/chat.spaces',
				'https://www.googleapis.com/auth/chat.messages',
                'https://www.googleapis.com/auth/chat.spaces'
			].join(" "),
			prompt: 'consent',
			include_granted_scopes: true
		});

		throw redirect(302, authURL);
	}
}
