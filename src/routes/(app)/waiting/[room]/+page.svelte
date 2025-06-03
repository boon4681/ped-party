<script lang="ts">
    import Dotdotdot from "$lib/components/ped/global/dotdotdot.svelte";
    import MiniProfile from "$lib/components/ped/global/mini-profile.svelte";
    import WaterBackground from "$lib/components/ped/global/water-background.svelte";
</script>

<WaterBackground class="flex-col items-center p-12 pt-20">
    <div class="text-7xl text-white text-center">
        <Dotdotdot text="กำลังรอผู้เล่น"></Dotdotdot>
    </div>
    <div class="mt-12 gap-6 flex flex-wrap w-full max-w-3xl mx-auto">
        <MiniProfile name="กูหล่อมาก" avatar={{ type: "kob", variant: "forest" }}></MiniProfile>
        <MiniProfile name="ลุงบ็อบ" avatar={{ type: "ped", variant: "classic" }}></MiniProfile>
    </div>
</WaterBackground>
