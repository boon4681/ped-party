import { error, redirect } from '@sveltejs/kit';

export async function load({ url, params, fetch, cookies }) {
    const code = params.room
    if (!code) {
        error(404, 'Room code not found.');
    }
    const res = await fetch("/api/room/check-by-code/" + code, {
        method: "GET"
    }).then(a => a.text()).then(a => JSON.parse(a))
    if (!res.found) error(404, 'Room code not found.');
    if (res.closed) {
        cookies.delete('ped.joined', {
            path: '*'
        })
        throw redirect(302, "/")
    }
    if (res.joined) {
        if (res.started) {
            throw redirect(302, "/play/" + res.code)
        }
    }
}
