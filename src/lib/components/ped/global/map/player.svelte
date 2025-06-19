<script lang="ts">
    import { getContext } from "svelte";
    import { Avatar } from "../avatar";
    import Heart from "lucide-svelte/icons/heart";
    import type { Writable } from "svelte/store";

    interface Props {
        name: string;
        profile: {
            type: any;
            color: any;
        };
        health: number;
        max_health: number;
        context_target: string;
    }

    let props: Props = $props();
    let position = getContext(props.context_target) as Writable<[number, number]>;
</script>

<div class="flex justify-center transition-all" style="transform: translate({$position[0]}px,{$position[1] - 40}px) translateX(-50%);">
    <div
        data-focus
        class="absolute flex flex-col data-[focus]:z-10 transition-all data-[focus]:-translate-y-4 shadow-lg"
    >
        <div class="text-[9px] text-nowrap bg-white/90 rounded p-1 mb-0.5">{props.name}</div>
        <Avatar
            class="size-8 shrink-0 border-2 rounded-md border-black"
            type={props.profile.type}
            color={props.profile.color}
        ></Avatar>
    </div>
</div>
