<script module lang="ts">
    type Color = {
        background?: string;
        body: string;
        beak: string;
        beakStroke: string;
    };
    export type PedProps = {
        type: "ped";
        class?: string;
    } & (
        | {
              color?: Color;
          }
        | {
              variant: keyof typeof pedVariants;
          }
    );

    export const pedVariants = {
        classic: { background: "#3C9F9C", body: "#FFB648", beak: "#D98712", beakStroke: "#312A21" },
        ocean: { background: "#0D47A1", body: "#42A5F5", beak: "#1976D2", beakStroke: "#0D47A1" },
        rose: { background: "#880E4F", body: "#F06292", beak: "#C2185B", beakStroke: "#880E4F" },
        sunset: { background: "#BF360C", body: "#FF8A65", beak: "#E64A19", beakStroke: "#BF360C" },
        mallard: { background: "#2D5016", body: "#8FBC8F", beak: "#FFA500", beakStroke: "#8B4513" },
        royal: { background: "#4A148C", body: "#BA68C8", beak: "#7B1FA2", beakStroke: "#4A148C" },
        forest: { background: "#1B5E20", body: "#66BB6A", beak: "#388E3C", beakStroke: "#1B5E20" },
        midnight: { background: "#212121", body: "#616161", beak: "#424242", beakStroke: "#212121" },
    };
</script>

<script lang="ts">
    import { cn } from "$lib/utils";
    let { class: className, ...rests }: PedProps = $props();
    let restsProps = "variant" in rests ? { ...rests, color: pedVariants[rests.variant] } : rests;
</script>

<svg
    class={cn("select-none", className)}
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_30_120)">
        <rect width="200" height="200" fill={restsProps.color?.background ?? "#3C9F9C"} />
        <rect
            x="-5"
            y="34"
            width="212"
            height="352"
            rx="106"
            fill={restsProps.color?.body ?? "#FFB648"}
            stroke="black"
            stroke-width="10"
        />
        <circle cx="145.122" cy="90.1216" r="12.1216" transform="rotate(180 145.122 90.1216)" fill={"black"} />
        <circle cx="56.1216" cy="90.1216" r="12.1216" transform="rotate(180 56.1216 90.1216)" fill={"black"} />
        <path
            d="M100.5 109.5C109.923 109.5 118.55 110.637 124.903 112.533C128.064 113.477 130.803 114.65 132.809 116.065C134.747 117.434 136.5 119.402 136.5 122C136.5 124.598 134.747 126.566 132.809 127.935C130.803 129.35 128.064 130.523 124.903 131.467C118.55 133.363 109.923 134.5 100.5 134.5C91.0769 134.5 82.4496 133.363 76.0967 131.467C72.9363 130.523 70.197 129.35 68.1914 127.935C66.2529 126.566 64.5 124.598 64.5 122C64.5 119.402 66.2529 117.434 68.1914 116.065C70.197 114.65 72.9363 113.477 76.0967 112.533C82.4496 110.637 91.0769 109.5 100.5 109.5Z"
            fill={restsProps.color?.beak ?? "#D98712"}
            stroke={restsProps.color?.beakStroke ?? "#312A21"}
            stroke-width="5"
        />
    </g>
    <defs>
        <clipPath id="clip0_30_120">
            <rect width="201" height="201" fill="white" />
        </clipPath>
    </defs>
</svg>
