<script lang="ts">
    import AttackBg from "./bg/attack-bg.svelte";
    import DefendBg from "./bg/defend-bg.svelte";
    import SpecialBg from "./bg/special-bg.svelte";

    interface Props {
        name: string;
        type: string;
        description: string;
        price?: number;
        image: string;
    }
    let { name, type, description, price, image }: Props = $props();
</script>

<div class="hover:shadow-xl transition-all aspect-[400/560] p-5 max-w-xs bg-white rounded-lg cursor-pointer">
    <div
        class:border-red-400={type == "attack"}
        class:border-blue-400={type == "defend"}
        class:border-yellow-400={type == "special"}
        class="flex flex-col size-full border-2 rounded-lg p-2 pointer-events-none select-none"
    >
        <div class="flex w-full items-start mb-2 h-[52px]">
            <div class="flex gap-1 items-center">
                <div class="size-10 bg-neutral-300 rounded-[50%]">
                    {#if type == "attack"}
                        <img src="/assets/items/category/Attack.png" alt="" />
                    {/if}
                    {#if type == "defend"}
                        <img src="/assets/items/category/Defend.png" alt="" />
                    {/if}
                    {#if type == "special"}
                        <img src="/assets/items/category/Special.png" alt="" />
                    {/if}
                </div>
                <div>
                    <div class="font-medium">Attack</div>
                    <div class="text-sm">{name}</div>
                </div>
            </div>
            <div class="ml-auto">
                {#if price}
                    <div class="flex flex-col items-center">
                        <img class="size-8" src="/assets/gui/momo-coin.png" alt="" />
                        <div class="text-sm">
                            {price}c
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="leading-[1.6em] text-xs mx-2 mb-2">
            {description}
        </div>
        <div class="w-full h-full flex flex-col overflow-hidden items-center justify-center relative">
            {#if type == "attack"}
                <AttackBg></AttackBg>
            {/if}
            {#if type == "defend"}
                <DefendBg></DefendBg>
            {/if}
            {#if type == "special"}
                <SpecialBg></SpecialBg>
            {/if}
            <img class="absolute" src={image} alt="" />
        </div>
    </div>
</div>
