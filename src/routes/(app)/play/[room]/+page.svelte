<script>
    import WheatBackground from "$lib/components/ped/global/wheat-background.svelte";
    import Profile from "$lib/components/ped/player/profile.svelte";
</script>

<WheatBackground class="flex-col items-center px-4">
    <div class="relative flex justify-center w-full">
        <Profile></Profile>
    </div>
    <div class="flex w-full max-w-lg gap-4 pt-4">
        <button class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1">
            <div class="size-16 flex justify-center items-center">
                <img class="size-12" src="/assets/gui/momo-coin.png" alt="" />
            </div>
            <div>10</div>
        </button>
        <div class="ml-auto"></div>
        <button class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1">
            <img class="size-16" src="/assets/gui/map.png" alt="" />
            <div>แผนที่</div>
        </button>
        <button class="flex flex-col items-center cursor-pointer transform transition hover:-translate-y-1">
            <img class="size-16" src="/assets/gui/backpack.png" alt="" />
            <div>กระเป๋า</div>
        </button>
    </div>
    <div class="w-full flex flex-col max-w-lg mt-8 px-4">
        <button
            class="aspect-[6/4] opacity-40 pointer-events-none select-none border-4 border-neutral-700 cursor-pointer hover:shadow-xl group rounded-2xl flex w-full bg-white/40 hover:bg-white/80 transition-all overflow-hidden"
        >
            <img
                class="w-full mt-auto transform transition translate-y-4 group-hover:translate-y-0"
                src="/assets/gui/card-btn.png"
                alt=""
            />
        </button>
        <button
            class="mt-8 p-4 cursor-pointer text-2xl bg-[#1F1B21] transition-all hover:bg-zinc-800 text-neutral-300 rounded-lg"
        >
            <div>ทอยลูกเต๋า</div>
        </button>
        <div class="text-center mt-2 text-sm">หากทอยลูกเต๋าแล้วจะถือว่าจบเทิร์น</div>
    </div>
</WheatBackground>
