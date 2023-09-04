import { getUser } from '../../hooks.server';

/** @type {import('./types').PageServerLoad} */
export function load({cookies}) {
    console.log(getUser(cookies.get('token')));
    return {
        name: "Anonymous User"
    }
}
