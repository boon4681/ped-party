import { error, redirect } from '@sveltejs/kit';

export async function load({ url, fetch, params, route }) {
    const code = params.room
    if (!code) {
        error(404, 'Room code not found.');
    }
    const res = await fetch("/api/room/check-by-code/" + code, {
        method: "GET"
    }).then(a => a.text()).then(a => JSON.parse(a))
    if (!res.found) error(404, 'Room code not found.');
    if (res.joined && url.pathname != "/play/" + code) {
        throw redirect(302, "/play/" + res.code)
    }
    if (!res.started) {
        throw redirect(302, "/waiting/" + res.code)
    }
    if (!res.joined) {
        throw redirect(302, "/")
    }
}
