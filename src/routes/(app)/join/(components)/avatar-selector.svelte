<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import SquarePen from "lucide-svelte/icons/square-pen";
    import { Avatar } from "$lib/components/ped/global/avatar";
    import { pedVariants } from "$lib/components/ped/global/avatar/ped.svelte";
    import { kobVariants } from "$lib/components/ped/global/avatar/kob.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

    let open: boolean = $state(false);

    let { type = $bindable("kob"), color = $bindable(kobVariants["forest"]) }: { type: string; color: any } = $props();

    const select = (_type: string, kv: Record<string, any>, variant: string) => {
        return () => {
            open = false;
            type = _type + "";
            color = kv[variant];
        };
    };
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger>
        {#snippet child({ props })}
            <div class="flex flex-col items-center">
                <button class="size-20 relative cursor-pointer rounded-md border-4 border-black" {...props}>
                    <SquarePen class="p-1 bg-black text-white rounded-[50%] absolute -top-3 -right-3"></SquarePen>
                    {#if type && color}
                        {#key type}
                            <Avatar class="size-full rounded" type={(type + "") as any} {color}></Avatar>
                        {/key}
                    {:else}
                        <Avatar class="size-full rounded" type="kob"></Avatar>
                    {/if}
                </button>
                <div class="text-xs mt-2">(เปลี่ยน โปรไฟล์)</div>
            </div>
        {/snippet}
    </Dialog.Trigger>
    <Dialog.Content class="px-0">
        <Dialog.Header class="px-4">
            <Dialog.Title>Select your avatar</Dialog.Title>
            <Dialog.Description></Dialog.Description>
        </Dialog.Header>
        <ScrollArea class="max-h-[512px]">
            <div class="flex justify-center px-4 flex-wrap gap-2 w-full">
                {#each Object.keys(pedVariants) as variant}
                    <button class="mr-auto outline-none cursor-pointer" onclick={select("ped", pedVariants, variant)}>
                        <Avatar class="size-20 rounded-md border-4 border-black" type="ped" variant={variant as any}
                        ></Avatar>
                        <div class="text-xs text-center">Ped {variant}</div>
                    </button>
                {/each}
                {#each Object.keys(kobVariants) as variant}
                    <button class="mr-auto outline-none cursor-pointer" onclick={select("kob", kobVariants, variant)}>
                        <Avatar class="size-20 rounded-md border-4 border-black" type="kob" variant={variant as any}
                        ></Avatar>
                        <div class="text-xs text-center">Kob {variant}</div>
                    </button>
                {/each}
            </div>
        </ScrollArea>
    </Dialog.Content>
</Dialog.Root>
