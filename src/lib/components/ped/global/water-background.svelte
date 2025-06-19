<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    let { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<div class={cn("background w-full h-screen relative flex", className)}>
    {@render children?.()}
    <!-- <div class="mt-auto p-2 absolute bottom-0">made by boon4681</div> -->
</div>

<style>
    .background {
        background-color: #52a5bf;
    }
</style>
