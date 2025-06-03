<script lang="ts">
    let { children } = $props();
    import { io } from "socket.io-client";
    import { onDestroy } from "svelte";

    const socket = io({
        path: "/ws",
        autoConnect: true,
    });
    socket.on("connect", () => {
        console.log(socket.id);
    });

    onDestroy(() => {
        socket.close();
    });
</script>

{@render children()}
