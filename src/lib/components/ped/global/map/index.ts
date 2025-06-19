export type TILE = [number, number, number, string]
export type MAP = {
    tiles: TILE[];
    links: [number, number][];
}
export { default as Map } from "./map.svelte"