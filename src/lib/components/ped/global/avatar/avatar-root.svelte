<script lang="ts">
    import type { Component } from "svelte";
    import Kob, { type KobProps } from "./kob.svelte";
    import Ped from "./ped.svelte";
    import type { PedProps } from "./ped.svelte";

    type Props = KobProps | PedProps;
    let props: Props = $props();

    const avatars: Record<Props["type"], Component<any, {}, "">> = {
        kob: Kob,
        ped: Ped,
    };
    const AvatarRenderer = avatars[props.type];
</script>
<AvatarRenderer {...props}></AvatarRenderer>

<!-- {#if props.type == "kob"}
    <Kob {...props}></Kob>
{:else if props.type == "ped"}
    <Ped {...props}></Ped>
{/if} -->
