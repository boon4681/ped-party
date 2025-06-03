<script module lang="ts">
    type Color = {
        background?: string;
        body: string;
        mouth: string;
    };
    export type KobProps = {
        type: "kob";
        class?: string;
    } & (
        | {
              color?: Color;
          }
        | {
              variant: keyof typeof kobVariants;
          }
    );

    export const kobVariants = {
        forest: { background: "#3C9F9C", body: "#9BC250", mouth: "#4B5D27" },
        ocean: { background: "#1E40AF", body: "#60A5FA", mouth: "#1E3A8A" },
        sunset: { background: "#BE185D", body: "#F472B6", mouth: "#831843" },
        fire: { background: "#DC2626", body: "#F87171", mouth: "#991B1B" },
        golden: { background: "#D97706", body: "#FBBF24", mouth: "#92400E" },
        purple: { background: "#7C3AED", body: "#A78BFA", mouth: "#5B21B6" },
        mint: { background: "#059669", body: "#6EE7B7", mouth: "#047857" },
        galaxy: { background: "#1F2937", body: "#6B7280", mouth: "#111827" },
    };
</script>

<script lang="ts">
    import { cn } from "$lib/utils";
    let { class: className, ...rests }: KobProps = $props();
    let restsProps = "variant" in rests ? { ...rests, color: kobVariants[rests.variant] } : rests;
</script>

<svg
    class={cn("select-none", className)}
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g clip-path="url(#clip0_30_115)">
        <rect width="200" height="200" fill={restsProps.color?.background ?? "#3C9F9C"} />
        <path
            d="M-14.8936 92.8701C-58.5852 130.863 -47.5 195 -47.5 217L244 217C249.5 186 246 124.5 213.062 92.8702C209.737 89.6765 220.79 81.6252 214.962 66.3583C207.526 46.8785 190.028 40.5099 174.442 46.4891C153.376 54.5705 158.459 65.7349 151.5 60.673C132 46.4891 73.5 46.4891 47 60.673C43.4734 62.5606 38.0387 46.8978 17.1428 44.8222C-3.7532 42.7466 -20.4635 58.2676 -21.7778 71.5C-23.8517 92.3794 -12.3901 90.6932 -14.8936 92.8701Z"
            fill={restsProps.color?.body ?? "#9BC250"}
            stroke="black"
            stroke-width="10"
        />
        <circle cx="184.217" cy="75.4223" r="12.1216" transform="rotate(-165 184.217 75.4223)" fill="black" />
        <circle cx="17.0489" cy="75.4223" r="12.1216" transform="rotate(-165 17.0489 75.4223)" fill="black" />
        <path
            d="M85.7941 111.154L85.9543 111.541C87.6689 115.684 93.2925 116.281 95.8383 112.59V112.59C98.0254 109.418 102.674 109.313 105.002 112.382L105.308 112.786C108.12 116.492 113.893 115.747 115.672 111.448L115.794 111.154"
            stroke={restsProps.color?.mouth ?? "black"}
            stroke-width="6"
            stroke-linecap="round"
        />
    </g>
    <defs>
        <clipPath id="clip0_30_115">
            <rect width="201" height="201" fill="white" />
        </clipPath>
    </defs>
</svg>
