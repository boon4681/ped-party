<script lang="ts">
    import { onDestroy, onMount, mount, unmount, flushSync, setContext } from "svelte";
    import * as d3 from "d3";
    import type { MAP, TILE } from ".";
    import concaveman from "concaveman";
    import { mulberry32, roundedPolygonPath } from "./util";
    import { Avatar } from "../avatar";
    import { detectMp4 } from "pixi.js";
    import { generateHexagonPath, generateHexGrid } from "./hex";
    import { appendTile } from "./tile";
    import Player from "./player.svelte";
    import { watch } from "runed";
    import { writable } from "svelte/store";
    import Tile from "./tile.svelte";
    interface Props {
        map: MAP;
        focus?: [number, number];
        me?: any;
    }
    let { map, focus = [0, 0], me }: Props = $props();
    let panX = 0;
    let panY = 0;
    let k = 1;
    let tiles: TILE[] = $state(JSON.parse(JSON.stringify(map.tiles)));
    let ref: HTMLElement;
    let mount_table = new Set<any>();
    let update = $state(false);
    const active_tiles = writable<number[]>([]);
    const svg = d3.create("svg");
    const main = svg.append("g");
    const zoom = d3.zoom().scaleExtent([0.6, 8]).on("zoom", zoomed) as any;
    const html = d3.create("div").attr("class", "map-layer-0");
    const html_main = html.append("div").attr("class", "g");
    let tile: TILE | undefined = undefined;
    const position = writable(tile ? [tile[1], tile[2]] : [0, 0]);
    setContext("map.active.tiles", active_tiles);
    function dragstarted() {
        d3.select(ref).raise();
    }

    const createDragged = (node: any) => {
        return (event: any, d: any) => {
            d[1] = event.x;
            d[2] = event.y;
            node.attr("transform", `translate(${d[1]},${d[2]})`);
        };
    };

    const createDragEnd = (node: any) => {
        return (event: any, d: any) => {
            console.log(d);
            navigator.clipboard.writeText(JSON.stringify(d) + ",");
        };
    };

    function zoomed({ transform }: any) {
        panX = transform.x;
        panY = transform.y;
        k = transform.k;
        main.attr("transform", transform);
        html_main.style("transform", `translate(${transform.x}px,${transform.y}px) scale(${transform.k})`);
        updateSHADOW();
    }

    function appendAllEdge(tiles: TILE[]) {
        const rnd = mulberry32(1000);
        for (const link of map.links) {
            const source = tiles.find((a) => a[0] == link[0]);
            const target = tiles.find((a) => a[0] == link[1]);
            if (source && target) {
                const lineGenerator = d3
                    .line()
                    .x((p) => p[0])
                    .y((p) => p[1])
                    .curve(d3.curveCardinal.tension(0.2));
                const line = main.append("path");
                const middle = [
                    (source[1] + target[1]) / 2 + (rnd() - 0.5) * 20,
                    (source[2] + target[2]) / 2 + (rnd() - 0.5) * 20,
                ] as [number, number];
                line.attr(
                    "d",
                    lineGenerator([
                        [source[1], source[2]],
                        [target[1], target[2]],
                    ]),
                );
                line.attr("fill", "none");
                line.attr("stroke", "#0000004F");
                // line.attr("stroke-width", "1.5");
                line.attr("stroke-width", "2");
                // line.attr("stroke-dasharray", "3,3");

                // const circle = main.append("circle")
                // circle.attr("cx",middle[0])
                // circle.attr("cy",middle[1])
                // circle.attr("r","2")
                // circle.attr("fill","#AEDC73")
                // circle.attr("stroke","black")

                // const line = main.append("line");
                // line.attr("stroke-width", "1.5");
                // line.attr("stroke-dasharray", "3,3");
                // line.style("stroke", "#FFFFFF4F");
                // line.style("stroke", "#0000009F");
                // line.attr("x1", source[1]);
                // line.attr("y1", source[2]);
                // line.attr("x2", target[1]);
                // line.attr("y2", target[2]);
            }
        }
    }

    function updateSHADOW() {
        // svg.attr("style", `filter: drop-shadow(0px ${16 * k}px #402412)`);
    }

    function focused() {
        const { width, height } = ref.getBoundingClientRect();
        let [x, y] = focus;
        let scale = k;

        svg.transition()
            .duration(750)
            .call(
                zoom.transform,
                d3.zoomIdentity.translate(width / 2 - scale * x, height / 2 - scale * y).scale(scale),
            );
    }

    onMount(() => {
        svg.call(zoom);
        ref.appendChild(svg.node()!);
        ref.appendChild(html.node()!);
        updateSHADOW();
        // svg.on("click", (e) => {
        //     console.log([Math.max(...map.tiles.map((a) => a[0])) + 1, e.x - panX, e.y - panY, ""]);
        // });
        focused();
        const center = map.tiles.map((a) => [a[1], a[2]]).reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
        center[0] = center[0] / map.tiles.length;
        center[1] = center[1] / map.tiles.length;

        const polygon = concaveman(JSON.parse(JSON.stringify(map.tiles.map((a) => [a[1], a[2]]))), 4).map((a) => {
            let x = a[0] - center[0];
            let y = a[1] - center[1];
            let d = Math.sqrt(x ** 2 + y ** 2);
            let dx = (x / d) * 100;
            let dy = (y / d) * 100;

            a[0] += dx;
            a[1] += dy;
            return a;
        });
        {
            let dirtThickness = 60;
            const v = polygon.map((a) => [a[0], a[1]]).slice(0, -1);
            const bottomPoints = v.map((point) => [point[0], point[1] + dirtThickness]);
            const dirtPathData = [
                ...v,
                ...bottomPoints.slice().reverse(), // Use slice() to avoid modifying the original
            ];
            const path = main.append("path");
            path.attr("d", roundedPolygonPath(dirtPathData as any, 20));
            path.attr("fill", "#0000001c");
        }
        {
            let dirtThickness = 30;
            const v = polygon.map((a) => [a[0], a[1]]).slice(0, -1);
            const bottomPoints = v.map((point) => [point[0], point[1] + dirtThickness]);
            const dirtPathData = [
                ...v,
                ...bottomPoints.slice().reverse(), // Use slice() to avoid modifying the original
            ];
            const path = main.append("path");
            path.attr("d", roundedPolygonPath(dirtPathData as any, 20));
            path.attr("fill", "#915A57");
        }
        {
            let dirtThickness = 15;
            const v = polygon.map((a) => [a[0], a[1]]).slice(0, -1);
            const bottomPoints = v.map((point) => [point[0], point[1] + dirtThickness]);
            const dirtPathData = [
                ...v,
                ...bottomPoints.slice().reverse(), // Use slice() to avoid modifying the original
            ];
            const path = main.append("path");
            path.attr("d", roundedPolygonPath(dirtPathData as any, 20));
            path.attr("fill", "#693E48");
            path.attr("stroke", "#693E48");
            path.attr("stroke-width", "5");
        }
        {
            let dirtThickness = 5;
            const v = polygon.map((a) => [a[0], a[1]]).slice(0, -1);
            const bottomPoints = v.map((point) => [point[0], point[1] + dirtThickness]);
            const dirtPathData = [
                ...v,
                ...bottomPoints.slice().reverse(), // Use slice() to avoid modifying the original
            ];
            const path = main.append("path");
            path.attr("d", roundedPolygonPath(dirtPathData as any, 20));
            path.attr("fill", "#73B569");
            path.attr("stroke", "#73B569");
            path.attr("stroke-width", "5");
        }
        {
            const path = main.append("path");
            path.attr("d", roundedPolygonPath(polygon.map((a) => [a[0], a[1]]).slice(0, -1) as any, 20));
            path.attr("fill", "#AEDC73");
            path.attr("stroke", "#AEDC73");
            path.attr("stroke-width", "5");
            // console.log(lineGenerator(polygon.map((a) => [a[0], a[1]])));

            // const hex = main.append("polygon");
            // // hex.attr("points", polygon.map((a) => `${a[0]},${a[1]}`).join(","));
            // // hex.attr("stroke-linejoin", "round");
            // hex.style("stroke", "#402412");
            // hex.style("fill", "#9BC250");
        }
        const hexs = generateHexGrid(polygon.map((a) => [a[0], a[1]]).slice(0, -1) as any, 40, 1.15);
        hexs.forEach((c) => {
            tiles = tiles.map((a) => {
                const d = Math.sqrt((a[1] - c.x) ** 2 + (a[2] - c.y) ** 2);
                if (d < 40) {
                    a[1] = c.x;
                    a[2] = c.y;
                }
                return a;
            });
        });
        hexs.forEach((a) => {
            return;
            const g = main.append("g");
            g.attr("transform", `translate(${a.x},${a.y})`);
            const hex = g.append("polygon");
            hex.attr("transform", `rotate(0)`);
            hex.attr("points", a.path);
            hex.style("stroke", "#0000000F");
            hex.style("stroke-width", "2");
            // hex.style("stroke", "#FFFFFF4F");
            hex.style("fill", "none");
        });
        // svg.selectAll(".hexagon")
        //     .data(hexs)
        //     .enter()
        //     .append("path")
        //     .attr("class", "hexagon")
        //     .attr("d", (d) => d.path);
        appendAllEdge(tiles);
        for (const _tile_ of tiles) {
            const t = mount(Tile, {
                target: html_main.node()!,
                props: {
                    tile: _tile_,
                    onclick: (e: MouseEvent) => {
                        tile = _tile_;
                        position.set([tile[1], tile[2]]);
                        focus = [tile[1], tile[2]];
                        focused();
                    },
                },
            });
            mount_table.add(t);
            // const t = appendTile(main, _tile_)!;
            // t.on("click", () => {
            //     tile = tiles.find((a) => a[0] == _tile_[0])!;
            //     position.set([tile[1], tile[2]]);
            //     focus = [tile[1], tile[2]];
            //     focused();
            // });
            // addTile(tile);
        }
        if (me) {
            setContext("map.me.position", position);
            const player = mount(Player, {
                target: html_main.node()!,
                props: {
                    ...me,
                    context_target: "map.me.position",
                    // position: [tile[1], tile[2]] as [number, number],
                },
            });

            // let i = 1;
            // setInterval(() => {
            //     i += 1;
            //     const tile = tiles.find((a) => a[0] == i)!;
            //     position.set([tile[1], tile[2]]);
            //     focus = [tile[1], tile[2]];
            //     focused();
            //     console.log(i);
            // }, 1000);
            mount_table.add(player);
        }
        // mount(Avatar, {
        //     target: html_main.node()!,
        //     props: {
        //         type: "kob",
        //         class: "rounded size-8 border-2 border-black",
        //     },
        // });
        // const svgString = new XMLSerializer().serializeToString(m.querySelector("svg")!);
        // main.append("image")
        //     .attr("width", "40")
        //     .attr("height", "40")
        //     .style("border-radius","10px")
        //     .attr("href", "data:image/svg+xml;base64," + btoa(svgString.replace("<!---->", "")));
        // m.remove();
        // {
        //     const img = main.append("image");
        //     img.attr("width", "60");
        //     img.attr("height", "60");
        //     img.attr("transform", `translate(${center[0]},${center[1]})`);
        //     img.attr("href", "/assets/tiles/8-foundation_portal.png");
        // }

        // setTimeout(() => {
        //     $active_tiles.push(2);
        //     $active_tiles = $active_tiles;
        // }, 1000);
    });
    onDestroy(() => {
        mount_table.values().forEach((a) => {
            unmount(a);
        });
        mount_table.clear();
    });
</script>

<div bind:this={ref} class="bg-[#58A7C1]"></div>

<style>
    div,
    div > :global(svg) {
        @apply size-full;
    }
    :global(.map-layer-0) {
        @apply absolute top-0 left-0;

        :global(.g > *) {
            @apply absolute;
        }
        :global(.tile img) {
            @apply pointer-events-none;
        }
    }
</style>
