<script lang="ts">
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
    import { Avatar } from "$lib/components/ped/global/avatar";
    import { kobVariants } from "$lib/components/ped/global/avatar/kob.svelte";
    import { pedVariants } from "$lib/components/ped/global/avatar/ped.svelte";
    import { Viewport } from "$lib/game/viewport";
    import { Assets, Graphics, Sprite } from "pixi.js";
    import { onDestroy, onMount } from "svelte";
</script>

<WaterBackground>
    <div class="flex flex-col mx-auto items-center w-full max-w-lg gap-4 pt-4">
        <div>
            <img src="/assets/gui/Ped_ Party.svg" alt="" />
        </div>
    </div>
</WaterBackground>
