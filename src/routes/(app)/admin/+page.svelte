<script>
    import { createPlayMomoCoin } from "$lib/audio";
    import Card from "$lib/components/ped/global/card/card.svelte";
    import Dotdotdot from "$lib/components/ped/global/dotdotdot.svelte";
    import { FullScreenDialog } from "$lib/components/ped/global/fullscreen-dialog";
    import { Map } from "$lib/components/ped/global/map/index";
    import WheatBackground from "$lib/components/ped/global/wheat-background.svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import Wheel from "$lib/components/ped/global/wheel/wheel.svelte";
    import Profile from "$lib/components/ped/player/profile.svelte";
    import { Header } from "$lib/components/ui/alert-dialog";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { items } from "$lib/game/items";
    import { MAP_DATA } from "$lib/game/map-data";
    import { MAP_CONTEXT, ROOM_CONTEXT, PLAYER_TURN_CONTEXT, SOCKET } from "./context";
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
    import MiniProfile from "$lib/components/ped/global/mini-profile.svelte";
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    let room_context = ROOM_CONTEXT.get();
    let map_context = MAP_CONTEXT.get();
    let player_turn_context = PLAYER_TURN_CONTEXT.get();
    let socket_context = SOCKET.get();

    let socket = $derived($socket_context);
    let room = $derived($room_context);
    let map = $derived($map_context);
    onMount(() => {
        console.log(room);
    });
</script>

{#if room.status == "waiting-room"}
    <WaterBackground class="flex-col items-center p-12 pt-20">
        <Button class="fixed top-4 right-4" onclick={() => socket.emit("setup")}>เริ่มเกม</Button>
        <div class="text-7xl text-white text-center">
            <Dotdotdot text="กำลังรอผู้เล่น"></Dotdotdot>
        </div>
        <div class="mt-12 gap-6 flex flex-wrap w-full max-w-3xl mx-auto">
            {#each room.players as player}
                <MiniProfile {...player.profile} admin={true}></MiniProfile>
            {/each}
        </div>
    </WaterBackground>
{:else}
    <WheatBackground>
        <div class=""></div>
        {#if map}
            <Map {map} focus={[window.innerWidth / 2, window.innerHeight / 2]}></Map>
        {/if}
    </WheatBackground>
    <!-- <AlertDialog.Root open={room.status == "setup"}>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>พร้อมจะเริ่มเกมหรือยัง?</AlertDialog.Title>
                <AlertDialog.Description
                    >ถ้าพร้อมแล้วก็มาเริ่มเล่นเกมกันกด continue เพื่อเริ่มเกม</AlertDialog.Description
                >
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Action onclick={() => socket.emit("setup")}>Continue</AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root> -->
{/if}
