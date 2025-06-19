<script>
    import { createPlayMomoCoin } from "$lib/audio";
    import Card from "$lib/components/ped/global/card/card.svelte";
    import Dotdotdot from "$lib/components/ped/global/dotdotdot.svelte";
    import { FullScreenDialog } from "$lib/components/ped/global/fullscreen-dialog";
    import { Map } from "$lib/components/ped/global/map/index";
    import WheatBackground from "$lib/components/ped/global/wheat-background.svelte";
    import Wheel from "$lib/components/ped/global/wheel/wheel.svelte";
    import Profile from "$lib/components/ped/player/profile.svelte";
    import { Header } from "$lib/components/ui/alert-dialog";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { items } from "$lib/game/items";
    import { MAP_DATA } from "$lib/game/map-data";
    import { MAP_CONTEXT, PLAYER_CONTEXT, PLAYER_TURN_CONTEXT } from "../context";

    let me_context = PLAYER_CONTEXT.get();
    let map_context = MAP_CONTEXT.get();
    let player_turn_context = PLAYER_TURN_CONTEXT.get();
    let me = $derived($me_context);
    let map = $derived($map_context);
    let player_turn = $derived($player_turn_context);
    let open_map = $state(false);
    let open_backpack = $state(false);
    const playMomoCoin = createPlayMomoCoin(1);
    $effect(() => {
        console.log(me);
    });
</script>

<WheatBackground class="flex-col items-center px-4">
    <div class="relative flex justify-center w-full">
        <Profile {...me}></Profile>
    </div>
    <div class="flex w-full max-w-lg gap-4 pt-4">
        <button
            onclick={playMomoCoin}
            class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1"
        >
            <div class="size-16 flex justify-center items-center">
                <img class="size-12" src="/assets/gui/momo-coin.png" alt="" />
            </div>
            <div>{me.coins}</div>
        </button>
        <div class="ml-auto"></div>
        <button
            onclick={() => (open_map = true)}
            class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1"
        >
            <img class="size-16" src="/assets/gui/map.png" alt="" />
            <div>แผนที่</div>
        </button>
        <button
            onclick={() => (open_backpack = true)}
            class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1"
        >
            <img class="size-16" src="/assets/gui/backpack.png" alt="" />
            <div>กระเป๋า</div>
        </button>
        <button
            onclick={() => (open_backpack = true)}
            class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1"
        >
            <img class="size-16" src="/assets/gui/shop-temp.png" alt="" />
            <div>ร้านค้า</div>
        </button>
    </div>
    {#if player_turn == me.id}
        <div class="w-full flex flex-col max-w-lg mt-8 px-4">
            <button
                class="aspect-[6/4] opacity-40 pointer-events-none select-none border-4 border-neutral-700 cursor-pointer hover:shadow-xl group rounded-2xl flex w-full bg-white/40 hover:bg-white/80 transition-all overflow-hidden"
            >
                <img
                    class="w-full mt-auto transform transition translate-y-4 group-hover:translate-y-0"
                    src="/assets/gui/card-btn.png"
                    alt=""
                />
            </button>
            <button
                class="mt-8 p-4 cursor-pointer text-2xl bg-[#1F1B21] transition-all hover:bg-zinc-800 text-neutral-300 rounded-lg"
            >
                <div>ทอยลูกเต๋า</div>
            </button>
            <div class="text-center mt-2 text-sm">หากทอยลูกเต๋าแล้วจะถือว่าจบเทิร์น</div>
        </div>
    {:else}
        <div class="my-[10%] text-2xl text-amber-950/50 font-bold">
            <Dotdotdot text={"กำลังรอเพื่อนเล่น"}></Dotdotdot>
        </div>
    {/if}
</WheatBackground>

<FullScreenDialog.Root bind:open={open_map}>
    <FullScreenDialog.Content trapFocus={false}>
        <Map {map} {me}></Map>
    </FullScreenDialog.Content>
</FullScreenDialog.Root>

<FullScreenDialog.Root bind:open={open_backpack}>
    <FullScreenDialog.Content>
        <FullScreenDialog.Header class="border-amber-800/30">กระเป๋า</FullScreenDialog.Header>
        <!-- <Wheel></Wheel> -->
        <ScrollArea type="always" orientation="horizontal" class="w-full h-full pt-4">
            <div class="mx-auto gap-4 flex px-6">
                {#each items as item}
                    <Card {...item}></Card>
                {/each}
            </div>
        </ScrollArea>
    </FullScreenDialog.Content>
</FullScreenDialog.Root>
