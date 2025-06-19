<script>
    import { page } from "$app/state";
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<WaterBackground>
    <div class="mx-auto flex flex-col items-center mt-12">
        <h1 style="font-size: 2em">{page.status} {page.error?.message}</h1>
        <span style="font-size: 10em">🫠</span>
        <Button href="/">กลับ หน้าหลัก</Button>
    </div>

</WaterBackground>
