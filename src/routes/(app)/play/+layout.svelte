<script lang="ts">
    let { children } = $props();
    import { io, Socket } from "socket.io-client";
    import { onDestroy, onMount } from "svelte";
    import { MAP_CONTEXT, PLAYER_CONTEXT, PLAYER_TURN_CONTEXT, SOCKET } from "./context";
    import { writable } from "svelte/store";
    import type { MAP } from "$lib/components/ped/global/map";

    let ready = $state(false);
    let player = writable();
    let map = writable<MAP>();
    let player_turn = writable<string>();
    let socket = writable<Socket>();
    PLAYER_CONTEXT.set(player);
    MAP_CONTEXT.set(map);
    PLAYER_TURN_CONTEXT.set(player_turn);
    SOCKET.set(socket);

    onMount(() => {
        if ($socket) $socket.close();
        $socket = io({
            path: "/ped",
            autoConnect: true,
        });
        $socket.on("connect", () => {
            console.log($socket.id);
        });
        $socket.on("handshake", ({ user, map: _map_, ...rest }) => {
            console.log(rest);
            ready = true;
            $player = user;
            $map = _map_;
        });
        $socket.on("room.sync", (data) => {
            console.log("room.sync", data);
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
