<script lang="ts">
    import { Avatar } from "../global/avatar";
    import Heart from "lucide-svelte/icons/heart";

    interface Props {
        name: string;
        profile: {
            type: any;
            color: any;
        };
        health: number;
        max_health: number;
    }

    let props: Props = $props();
</script>

<div class="bg-white text-xl flex items-center rounded-b-2xl absolute p-3 w-full max-w-lg mx-auto">
    <Avatar
        class="size-12 shrink-0 border-3 rounded-lg border-black"
        type={props.profile.type}
        color={props.profile.color}
    ></Avatar>
    <div class="ml-2 mr-auto">{props.name}</div>
    <div class="flex gap-2">
        <Heart fill="#C43E3E"></Heart>
        <div>{props.health} / {props.max_health}</div>
    </div>
</div>
<div class="pt-[72px]"></div>
