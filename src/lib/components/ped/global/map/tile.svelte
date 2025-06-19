<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { type HTMLAttributes } from "svelte/elements";
    import { type Writable } from "svelte/store";
    import type { TILE } from ".";

    let { tile, onclick }: { tile: TILE } & HTMLAttributes<HTMLDivElement> = $props();
    let src = $state("");
    let active_tiles = getContext("map.active.tiles") as Writable<number[]>;
    let active = $derived.by(() => {
        return $active_tiles.includes(tile[0]);
    });

    onMount(() => {
        switch (tile[3]) {
            case "empty": {
                // img.attr("href", "/assets/tiles/3-foundation_tundra.png");
                // img.attr("transform", `rotate(90) translate(-40,-40)`);
                // img.attr("href", "/assets/boon-tiles/skull.png");
                break;
            }
            case "heal": {
                // img.attr("href", "/assets/tiles/heal.png");
                src = "/assets/boon-tiles/heal.png";
                // img.attr("href", "/assets/boon-tiles/heal.png");
                // img_g.attr("transform", "scale(0.3)");
                break;
            }
            case "trophy": {
                src = "/assets/tiles/trophy.png";
                // img.attr("href", "/assets/tiles/trophy.png");
                break;
            }
            case "death": {
                src = "/assets/boon-tiles/skull.png";
                // img.attr("href", "/assets/boon-tiles/skull.png");
                // img_g.attr("transform", "scale(0.3)");
                // hex.style("fill", "#272626");
                // img.attr("href", "/assets/tiles/dead.png");
                break;
            }
            case "monster": {
                src = "/assets/boon-tiles/monster.png";
                // img.attr("href", "/assets/boon-tiles/monster.png");
                // img_g.attr("transform", "scale(0.3)");
                // img.attr("href", "/assets/tiles/monster.png");
                break;
            }
            case "dice": {
                src = "/assets/boon-tiles/wheel.png";
                // img.attr("href", "/assets/boon-tiles/wheel.png");
                // img_g.attr("transform", "scale(0.3)");
                break;
            }
            case "chest": {
                src = "/assets/boon-tiles/chest.png";
                // img.attr("href", "/assets/tiles/chest.png");
                // img.attr("href", "/assets/boon-tiles/chest.png");
                // img_g.attr("transform", "scale(0.3)");
                break;
            }
            case "boss.momo": {
                src = "/assets/tiles/momo.png";
                // img.attr("href", "/assets/tiles/momo.png");
                break;
            }
            case "boss.poom": {
                src = "/assets/tiles/poom.png";
                // img.attr("href", "/assets/tiles/poom.png");
                break;
            }
            default:
            // const text = g.append("text");
            // text.text("t:" + tile[3]);
            // text.attr("font-size", "0.7em");
        }
    });
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    data-active={active}
    role="button"
    class="tile group absolute flex items-center justify-center select-none data-[active=true]:-translate-y-4"
    style="transform: translate({tile[1]}px,{tile[2]}px) translateX(-50%);"
    {onclick}
>
    <div class="absolute transition-all flex items-center justify-center select-none group-data-[active=true]:-translate-y-[6px]">
        {#if src}
            <div class="tile-inner transition-all absolute size-12 border-2 border-black rounded-[50%] bg-[#AEDC73]"></div>
            <img class:size-6={src.search("boon-tiles") > -1} class="size-12 absolute max-w-none" {src} alt="" />
        {:else}
            <div class="tile-inner transition-all absolute size-8 border-2 border-black rounded-[50%] bg-[#AEDC73]"></div>
            <div class="absolute text-sm">{tile[0]}</div>
        {/if}
    </div>
</div>

<!-- <div>
    <div>
        <img class="size-12" {src} alt="" />
    </div>
    <div></div>
</div> -->
<style>
    [data-active="true"] .tile-inner {
        box-shadow: 0px 6px 0px 0px #000000;
    }
</style>
