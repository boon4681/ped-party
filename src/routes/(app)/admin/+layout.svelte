<script lang="ts">
    let { children } = $props();
    import { io, Socket } from "socket.io-client";
    import { onDestroy, onMount } from "svelte";
    import { MAP_CONTEXT, ROOM_CONTEXT, PLAYER_TURN_CONTEXT, SOCKET, PLAYERS_LIST_CONTEXT } from "./context";
    import { writable } from "svelte/store";
    import type { MAP } from "$lib/components/ped/global/map";

    let ready = $state(false);
    let room = writable();
    let map = writable<MAP>();
    let player_turn = writable<string>();
    let players_list = writable<any[]>();
    let socket = writable<Socket>();
    SOCKET.set(socket);
    ROOM_CONTEXT.set(room);
    MAP_CONTEXT.set(map);
    PLAYER_TURN_CONTEXT.set(player_turn);
    PLAYERS_LIST_CONTEXT.set(players_list);

    onMount(() => {
        if ($socket) $socket.close();
        $socket = io({
            path: "/ped",
            autoConnect: true,
        });
        $socket.on("connect", () => {
            console.log($socket.id);
        });
        $socket.on("sync", () => {});
        $socket.on("handshake", ({ room: _room_, map: _map_, players, ...rest }) => {
            $players_list = players;
            $room = _room_;
            $map = _map_;
            ready = true;
        });
        $socket.on("room.sync", ({ room: _room_, map: _map_, players, ...rest }) => {
            console.log(_room_, rest);
            $players_list = players;
            $room = _room_;
            $map = _map_;
        });
    });
    onDestroy(() => {
        if ($socket) {
            $socket.disconnect();
            $socket.close();
        }
        ready = false;
    });
</script>

{#if ready}
    {@render children()}
{:else}
    <div></div>
{/if}
