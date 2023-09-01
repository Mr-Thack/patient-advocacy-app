

/** @type {import('./types').PageServerLoad} */
export function load({cookies}) {
    return {
        name: authdb.get(cookies.get('token')).name
    }
}
