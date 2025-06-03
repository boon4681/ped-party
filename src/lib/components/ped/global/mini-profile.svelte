<script lang="ts">
    export const ssr = false;
    import Kob, { type KobProps } from "./avatar/kob.svelte";
    import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
    import { Motion, useMotionValue, animate, type AnimationPlaybackControls } from "svelte-motion";
    import type { PedProps } from "./avatar/ped.svelte";
    import { Avatar } from "./avatar";
    const rotate = useMotionValue(0);
    let animation: AnimationPlaybackControls;

    let props: { name: string; avatar: KobProps | PedProps } = $props();
    const click = () => {
        if (animation && animation.stop) {
            animation.stop();
        }
        let m = Math.random() - 0.5;
        if (Math.abs(m) < 0.4) {
            m *= 2;
        }
        animation = animate(rotate, [0, m * 15, m * -15, 0], {
            type: "spring",
            duration: 0.2,
            stiffness: 200,
        });
    };
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger>
        <Motion style={{ rotate }} let:motion>
            <button onclick={click} use:motion class="group w-fit origin-center">
                <div class="flex flex-col gap-2 text-white cursor-pointer">
                    <Avatar class="size-20 border-3 rounded-lg border-black" {...props.avatar}></Avatar>
                    <div class="font-semibold text-lg">{props.name}</div>
                </div>
            </button>
        </Motion>
    </ContextMenu.Trigger>
    <ContextMenu.Content>
        <ContextMenu.Item>Kick</ContextMenu.Item>
    </ContextMenu.Content>
</ContextMenu.Root>
