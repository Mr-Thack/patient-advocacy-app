import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';


export const GET = async({url}) => {
  const redirectURL = 'http://localhost:5173/oauth';
  const code = await url.searchParams.get('code');

  let name = "";
  let email = "";
  let photo = "";
  
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
    email = userInfo.email;
    name = userInfo.name;
    photo = userInfo.picture;
    
    /*.v2.me.get( (err, res) => {
      console.log(res);
    });*/
  } catch(err) {
    console.log("ERROR LOGGING IN WITH GOOGLE! ", err)
  }

  throw redirect(303, '/');
}
