<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    let { children, class: className }: { children?: Snippet; class?: string } = $props();
</script>

<div class={cn("background w-full h-screen relative flex", className)}>
    {@render children?.()}
</div>

<style>
    .background {
        background-color: #EFD8A2;
    }
</style>
