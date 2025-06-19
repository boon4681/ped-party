// function addTile(tile: TILE) {
//     const g = main.append("g");
//     g.data([tile]);
//     // g.call(d3.drag().on("start", dragstarted).on("drag", createDragged(g)).on("end", createDragEnd(g)) as any);
//     g.attr("transform", `translate(${tile[1]},${tile[2]})`);
//     const circle = g.append("circle");
//     {
//         circle.attr("cx", 0);
//         circle.attr("cy", 0);
//         circle.attr("r", 25);
//         circle.attr("fill", "#AEDC73");
//         circle.attr("stroke", "#0000006F");
//         circle.attr("stroke-width", "2");
//     }
//     // {
//     //     const hex = g.append("polygon");
//     //     hex.attr("transform", `rotate(0)`);
//     //     hex.attr("points", generateHexagonPath(40));
//     //     // hex.style("stroke", "#9BC250");
//     //     hex.style("stroke", "#0000004F");
//     //     // hex.style("fill", "#9BC250");
//     //     hex.style("fill", "none");
//     // }

//     const img_g = g.append("g");
//     const img = img_g.append("image");
//     img.attr("width", "80");
//     img.attr("height", "80");
//     img.attr("transform", `translate(-40,-40)`);
//     // const text = g.append("text");
//     // text.text("id:" + tile[0]);
//     // text.attr("x", -40);
//     // text.attr("y", -30);
//     // text.attr("font-size", "0.7em");
//     switch (tile[3]) {
//         case "empty": {
//             // img.attr("href", "/assets/tiles/3-foundation_tundra.png");
//             // img.attr("transform", `rotate(90) translate(-40,-40)`);
//             // img.attr("href", "/assets/boon-tiles/skull.png");
//             circle.attr("r", 18);
//             img_g.append("text").text(tile[0]).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
//             return;
//         }
//         case "heal": {
//             // img.attr("href", "/assets/tiles/heal.png");
//             img.attr("href", "/assets/boon-tiles/heal.png");
//             img_g.attr("transform", "scale(0.3)");
//             return;
//         }
//         case "trophy": {
//             img.attr("href", "/assets/tiles/trophy.png");
//             return;
//         }
//         case "death": {
//             img.attr("href", "/assets/boon-tiles/skull.png");
//             img_g.attr("transform", "scale(0.3)");
//             // hex.style("fill", "#272626");
//             // img.attr("href", "/assets/tiles/dead.png");
//             return;
//         }
//         case "monster": {
//             img.attr("href", "/assets/boon-tiles/monster.png");
//             img_g.attr("transform", "scale(0.3)");
//             // img.attr("href", "/assets/tiles/monster.png");
//             return;
//         }
//         case "dice": {
//             img.attr("href", "/assets/boon-tiles/wheel.png");
//             img_g.attr("transform", "scale(0.3)");
//             return;
//         }
//         case "chest": {
//             // img.attr("href", "/assets/tiles/chest.png");
//             img.attr("href", "/assets/boon-tiles/chest.png");
//             img_g.attr("transform", "scale(0.3)");
//             return;
//         }
//         case "boss.momo": {
//             img.attr("href", "/assets/tiles/momo.png");
//             return;
//         }
//         case "boss.poom": {
//             img.attr("href", "/assets/tiles/poom.png");
//             return;
//         }
//         default:
//             const text = g.append("text");
//             text.text("t:" + tile[3]);
//             text.attr("font-size", "0.7em");
//     }
// }