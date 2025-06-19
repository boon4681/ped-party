<script lang="ts">
    import { page } from "$app/state";
    import Dotdotdot from "$lib/components/ped/global/dotdotdot.svelte";
    import MiniProfile from "$lib/components/ped/global/mini-profile.svelte";
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
    import { onDestroy } from "svelte";
    let players = $state<any[]>([]);
    let sync = setInterval(async () => {
        players = await fetch(`/api/room/list/${page.params.room}/players`).then((a) => a.json());
        console.log(players)
    }, 500);
    onDestroy(() => {
        clearInterval(sync);
    });
</script>

<WaterBackground class="flex-col items-center p-12 pt-20">
    <div class="text-7xl text-white text-center">
        <Dotdotdot text="กำลังรอเริ่มเกม"></Dotdotdot>
    </div>
    <div class="mt-12 gap-6 flex flex-wrap w-full max-w-3xl mx-auto">
        <div class="text-2xl text-white text-center w-full">
            ผู้เล่นในห้องตอนนี้ {players.length}
        </div>
        <!-- {#each players as player}
            <MiniProfile {...player.profile} admin={false}></MiniProfile>
        {/each} -->
    </div>
</WaterBackground>
