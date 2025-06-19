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
    import SquarePen from "lucide-svelte/icons/square-pen";
    import AvatarSelector from "./(components)/avatar-selector.svelte";
    import { page } from "$app/state";
    import { toast } from "svelte-sonner";

    interface Props {
        type: string;
        color: any;
    }
    let name: string = $state("ชื่อทีม");
    let avatar: Props = $state({
        type: "kob",
        color: kobVariants["forest"],
    });
    const submit = async () => {
        const res = await fetch("/api/room/join/" + page.url.searchParams.get("code"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, ...avatar }),
        })
            .then((a) => a.json())
            .catch((a) => a.json());
        toast.success(res.message ?? "");
    };
</script>

<WaterBackground class="flex flex-col px-4">
    <div class="flex flex-col mx-auto items-center w-full max-w-md gap-4 pt-4">
        <div class="mt-12">
            <img src="/assets/gui/Ped_ Party.svg" alt="" />
        </div>
        <div class="flex flex-col w-full items-center max-w-xs mx-auto gap-6 mt-12">
            <AvatarSelector bind:type={avatar.type} bind:color={avatar.color}></AvatarSelector>
            <Input bind:value={name} placeholder="ชื่อทีม"></Input>
            <!-- <Input placeholder="รหัสผ่าน"></Input> -->
            <Button disabled={name.length == 0} onclick={submit} class="w-full" size="lg">เข้าร่วม</Button>
        </div>
    </div>
</WaterBackground>
