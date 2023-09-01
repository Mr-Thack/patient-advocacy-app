import google from 'googleapis';


export function GET({cookies}) {
    const token = cookies.get('token');
    
    const user = authdb.get(token);

    if (!user) {
        console.log("ERROR");
        return new Response("HELP");
    }
    
    const auth = user.client;

    try {
        const chats = new google.chat_v1.Chat({key: token});
        console.log(chats.spaces.list());
    } catch(err) {
        console.log(err);
    }
    return new Response("");
}
