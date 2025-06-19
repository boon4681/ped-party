import type { MAP } from "$lib/components/ped/global/map";
import { Context } from "runed";
import type { Socket } from "socket.io-client";
import type { Writable } from "svelte/store";

export const ROOM_CONTEXT = new Context<Writable<any>>("room_context")
export const PLAYERS_LIST_CONTEXT = new Context<Writable<any[]>>("players_list_context")
export const MAP_CONTEXT = new Context<Writable<MAP>>("map_context")
export const PLAYER_TURN_CONTEXT = new Context<Writable<string>>("player_turn_context")
export const SOCKET = new Context<Writable<Socket>>("socket")
