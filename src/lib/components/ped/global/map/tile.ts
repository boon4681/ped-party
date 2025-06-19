import type { TILE } from ".";
import * as d3 from "d3"

export function appendTile(main: any, tile: TILE) {
    const g = main.append("g")
    g.data([tile]);
    g.attr("transform", `translate(${tile[1]},${tile[2]})`);
    const circle = g.append("circle");
    {
        circle.attr("cx", 0);
        circle.attr("cy", 0);
        circle.attr("r", 25);
        circle.attr("fill", "#AEDC73");
        circle.attr("stroke", "#0000006F");
        circle.attr("stroke-width", "2");
    }
    const img_g = g.append("g");
    const img = img_g.append("image");
    img.attr("width", "80");
    img.attr("height", "80");
    img.attr("transform", `translate(-40,-40)`);

    switch (tile[3]) {
        case "empty": {
            // img.attr("href", "/assets/tiles/3-foundation_tundra.png");
            // img.attr("transform", `rotate(90) translate(-40,-40)`);
            // img.attr("href", "/assets/boon-tiles/skull.png");
            circle.attr("r", 18);
            img_g.append("text").text(tile[0]).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
            break;
        }
        case "heal": {
            // img.attr("href", "/assets/tiles/heal.png");
            img.attr("href", "/assets/boon-tiles/heal.png");
            img_g.attr("transform", "scale(0.3)");
            break;
        }
        case "trophy": {
            img.attr("href", "/assets/tiles/trophy.png");
            break;
        }
        case "death": {
            img.attr("href", "/assets/boon-tiles/skull.png");
            img_g.attr("transform", "scale(0.3)");
            // hex.style("fill", "#272626");
            // img.attr("href", "/assets/tiles/dead.png");
            break;
        }
        case "monster": {
            img.attr("href", "/assets/boon-tiles/monster.png");
            img_g.attr("transform", "scale(0.3)");
            // img.attr("href", "/assets/tiles/monster.png");
            break;
        }
        case "dice": {
            img.attr("href", "/assets/boon-tiles/wheel.png");
            img_g.attr("transform", "scale(0.3)");
            break;
        }
        case "chest": {
            // img.attr("href", "/assets/tiles/chest.png");
            img.attr("href", "/assets/boon-tiles/chest.png");
            img_g.attr("transform", "scale(0.3)");
            break;
        }
        case "boss.momo": {
            img.attr("href", "/assets/tiles/momo.png");
            break;
        }
        case "boss.poom": {
            img.attr("href", "/assets/tiles/poom.png");
            break;
        }
        default:
            const text = g.append("text");
            text.text("t:" + tile[3]);
            text.attr("font-size", "0.7em");
    }
    return g
}