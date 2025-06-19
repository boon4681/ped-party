export function roundedPolygonPath(points: [number, number][], radius: number) {
    if (points.length < 3) return "";

    let pathData = "M";
    const len = points.length;

    for (let i = 0; i < len; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % len];
        const p0 = points[(i - 1 + len) % len];

        // Calculate vectors from current point to adjacent points
        const v1 = [p0[0] - p1[0], p0[1] - p1[1]];
        const v2 = [p2[0] - p1[0], p2[1] - p1[1]];

        // Calculate vector lengths
        const v1_len = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
        const v2_len = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);

        // Handle degenerate cases: zero-length segments
        if (v1_len < 1e-10 || v2_len < 1e-10) {
            if (i === 0) {
                pathData += `${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            }
            pathData += `L${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            continue;
        }

        // Calculate unit vectors
        const unit_v1 = [v1[0] / v1_len, v1[1] / v1_len];
        const unit_v2 = [v2[0] / v2_len, v2[1] / v2_len];

        // Calculate dot product and clamp to prevent NaN from Math.acos
        const dot = unit_v1[0] * unit_v2[0] + unit_v1[1] * unit_v2[1];
        const clamped_dot = Math.max(-1, Math.min(1, dot));
        const angle = Math.acos(clamped_dot);

        // Handle collinear points (angle ≈ 0 or ≈ π)
        const isCollinear = Math.abs(angle) < 1e-6 || Math.abs(angle - Math.PI) < 1e-6;

        if (isCollinear) {
            // Points are collinear, draw straight line
            if (i === 0) {
                pathData += `${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            }
            pathData += `L${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            continue;
        }

        // Calculate the distance from the corner to the arc start/end points
        const halfAngle = angle / 2;
        const tan_half = Math.tan(halfAngle);

        // Prevent division by zero or very small numbers
        if (Math.abs(tan_half) < 1e-10) {
            if (i === 0) {
                pathData += `${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            }
            pathData += `L${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            continue;
        }

        let dist = radius / tan_half;

        // Ensure the arc doesn't exceed half the length of either adjacent segment
        dist = Math.min(dist, v1_len / 2, v2_len / 2);

        // If the calculated distance is too small or invalid, draw straight line
        if (!isFinite(dist) || dist < 1e-10) {
            if (i === 0) {
                pathData += `${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            }
            pathData += `L${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            continue;
        }

        // Calculate arc start and end points
        const arc_p1 = [p1[0] + unit_v1[0] * dist, p1[1] + unit_v1[1] * dist];
        const arc_p2 = [p1[0] + unit_v2[0] * dist, p1[1] + unit_v2[1] * dist];

        // Check if calculated points are valid
        if (!isFinite(arc_p1[0]) || !isFinite(arc_p1[1]) ||
            !isFinite(arc_p2[0]) || !isFinite(arc_p2[1])) {
            if (i === 0) {
                pathData += `${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            }
            pathData += `L${p1[0].toFixed(2)},${p1[1].toFixed(2)} `;
            continue;
        }

        if (i === 0) {
            pathData += `${arc_p1[0].toFixed(2)},${arc_p1[1].toFixed(2)} `;
        }

        // Calculate the actual radius to use (might be smaller than requested)
        const actualRadius = Math.min(radius, dist * tan_half);

        // Determine the correct sweep direction using cross product
        // Cross product of v1 and v2 tells us if we're turning left or right
        const cross = v1[0] * v2[1] - v1[1] * v2[0];
        const sweepFlag = cross > 0 ? 0 : 1; // 0 for counterclockwise, 1 for clockwise

        pathData += `L${arc_p1[0].toFixed(2)},${arc_p1[1].toFixed(2)} A${actualRadius.toFixed(2)},${actualRadius.toFixed(2)} 0 0,${sweepFlag} ${arc_p2[0].toFixed(2)},${arc_p2[1].toFixed(2)} `;
    }

    pathData += "Z";
    return pathData;
}

export function mulberry32(a: number) {
    return function () {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export function appendPlayer() {
}