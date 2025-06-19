import type { MAP } from "$lib/components/ped/global/map";
import { Context } from "runed";
import type { Socket } from "socket.io-client";
import type { Writable } from "svelte/store";

export const PLAYER_CONTEXT = new Context<Writable<any>>("player")
export const MAP_CONTEXT = new Context<Writable<MAP>>("map")
export const PLAYER_TURN_CONTEXT = new Context<Writable<string>>("player_turn")
export const SOCKET = new Context<Writable<Socket>>("socket")