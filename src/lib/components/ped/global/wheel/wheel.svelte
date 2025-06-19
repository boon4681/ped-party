<script lang="ts">
    import * as d3 from "d3";
    import { onDestroy, onMount } from "svelte";
    import { createPlayTick } from "../../../../audio";
    import type { WheelSegment } from ".";

    let ref: HTMLDivElement;
    let spin_disabled = $state(false);
    let currentRotation = 0;
    let g: d3.Selection<SVGGElement, unknown, null, undefined>;
    let data: d3.PieArcDatum<WheelSegment>[];
    let size = 320;
    let transition: d3.Transition<SVGGElement, unknown, null, undefined>;
    const playTick = createPlayTick(1);
    let {
        segments = [
            { label: "1", weight: 1, color: "#3369E8" },
            { label: "2", weight: 1, color: "#D50F25" },
        ],
    } = $props();

    function spin() {
        if (spin_disabled) return;
        spin_disabled = true;
        const randomSpins = 7 + Math.random() * 10 + 20 / segments.length;
        const randomAngle = Math.random() * 360;
        const totalRotation = randomSpins * 360 + randomAngle;

        const newRotation = currentRotation + totalRotation;
        let now: WheelSegment | null = null;
        transition = g
            .transition()
            .duration(4000) // 7 second spin duration
            .ease(d3.easeCubicOut) // Smooth easing out
            .attrTween("transform", () => {
                const i = d3.interpolate(currentRotation, newRotation);
                return (t) => {
                    if (now != getWinningSegment(i(t))) {
                        playTick();
                    }
                    now = getWinningSegment(i(t));
                    return `translate(${size / 2}, ${size / 2}) rotate(${i(t)})`;
                };
            })
            .on("end", () => {
                currentRotation = newRotation % 360;
                const winningSegment = getWinningSegment(currentRotation);
                console.log(winningSegment);
                spin_disabled = false;
                //TODO
            });
    }

    function getWinningSegment(finalAngle: number) {
        const correctedAngle = (360 - (finalAngle % 360)) % 360;
        const correctedAngleRad = correctedAngle * (Math.PI / 180);

        const winningSegmentData = data.find(
            (d) => correctedAngleRad >= d.startAngle && correctedAngleRad < d.endAngle,
        );
        return winningSegmentData ? winningSegmentData.data : segments[0]; // Fallback to first segment
    }

    onMount(() => {
        const container = d3.select(ref);
        const radius = size / 2;
        const svg = container.append("svg");
        svg.attr("viewBox", `0 0 ${size} ${size}`);
        g = svg.append("g").attr("transform", `translate(${size / 2}, ${size / 2})`);

        const pie = d3
            .pie<WheelSegment>()
            .value((d) => d.weight)
            .sort(null);

        const arc = d3
            .arc()
            .innerRadius(radius * 0.2) // Creates a donut chart look
            .outerRadius(radius * 0.9);

        const labelArc = d3
            .arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.8);

        data = pie(segments);

        const segmentGroups = g.selectAll("g.segment").data(data).enter().append("g").attr("class", "segment");

        segmentGroups
            .append("path")
            .attr("d", arc as any)
            .attr("fill", (d) => d.data.color);
        // .attr("stroke", "#1a202c")
        // .style("stroke-width", "1px");

        segmentGroups
            .append("text")
            .attr("transform", (d) => {
                const [x, y] = labelArc.centroid(d as any);
                const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) - 90;
                return `translate(${x}, ${y}) rotate(${angle})`;
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .style("font-size", `${Math.max(10, size / 30)}px`)
            .style("font-weight", "bold")
            .style("pointer-events", "none")
            .style("user-select", "none")
            .attr("fill", "white")
            .text((d) => d.data.label);

        const circle = g.append("g");
        circle
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radius * 0.21)
            .attr("fill", "white");
        // .attr("stroke", "#1a202c")
        // .style("stroke-width", "4px");
        // circle.append("text").attr("x", -14).attr("y", 4).text("Spin");
        svg.on("click", () => {
            spin();
        });
    });

    onDestroy(() => {
        if (g) g.selectAll("*").interrupt();
        ref.remove();
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
    role="button"
    bind:this={ref}
    class="wheel relative cursor-pointer w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] mb-8 flex items-center justify-center overflow-hidden"
>
    <div class="wheel-pointer size-full"></div>
</div>

<style>
    :global(.wheel svg) {
        width: 100%;
        height: 100%;
        @apply drop-shadow-xl;
    }
    .wheel-pointer {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        border-top: 40px solid #ef4444; /* red-500 */
        z-index: 10;
    }
</style>
