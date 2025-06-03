<script lang="ts">
    import { onMount } from "svelte";

    let { text, delay = 1000 }: { text: string; delay?: number } = $props();

    let i = 0;
    let dot = $state("");
    onMount(() => {
        const it = setInterval(() => {
            dot = new Array(i).fill(".").join("");
            i++;
            if (i > 3) i = 0;
        }, delay);
        return () => {
            clearInterval(it);
        };
    });
</script>

<span>{text}</span>{dot}
