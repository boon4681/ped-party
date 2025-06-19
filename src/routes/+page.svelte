<script lang="ts">
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
    import { Avatar } from "$lib/components/ped/global/avatar";
    import { kobVariants } from "$lib/components/ped/global/avatar/kob.svelte";
    import { pedVariants } from "$lib/components/ped/global/avatar/ped.svelte";
    import { Viewport } from "$lib/game/viewport";
    import { Assets, Graphics, Sprite } from "pixi.js";
    import { onDestroy, onMount } from "svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { watch } from "runed";

    let disabled = $state(true);
    let code = $state("");

    const check = async () => {
        if (code.length != 6) return (disabled = false);
        const res = await fetch("/api/room/check-by-code/" + code).then((a) => a.json());
        disabled = !res.found;
    };
</script>

<WaterBackground class="flex flex-col">
    <div class="flex flex-col mx-auto items-center w-full max-w-md gap-4 pt-4">
        <div class="mt-12">
            <img src="/assets/gui/Ped_ Party.svg" alt="" />
        </div>
        <div class="flex flex-col w-full max-w-xs mx-auto gap-6 mt-12">
            <Input bind:value={code} onchange={check} placeholder="โค้ดห้อง"></Input>
            <Button href="/join?code={code}" {disabled} size="lg">เข้าร่วม</Button>
        </div>
    </div>
</WaterBackground>
