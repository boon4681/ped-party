export function pointInPolygon(point: [number, number], polygon: [number, number][]) {
    const x = point[0], y = point[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }

    return inside;
}

export function getBoundingBox(points: [number, number][]) {
    const xs = points.map(p => p[0]);
    const ys = points.map(p => p[1]);
    return {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys)
    };
}

export function generateHexagonPath(radius: number) {
    const halfWidth = (radius * Math.sqrt(3)) / 2;
    return ` 0,${-radius} ${halfWidth},${-radius / 2} ${halfWidth},${radius / 2} 0,${radius} ${-halfWidth},${radius / 2} ${-halfWidth},${-radius / 2}`;
};

export function generateHexGrid(polygonPoints: [number, number][], hexSize = 10, gridDensity = 10) {
    const bbox = getBoundingBox(polygonPoints);
    const hexagons = [];
    const hexWidth = hexSize * 2;
    const hexHeight = hexSize * Math.sqrt(3);
    const rowSpacing = hexHeight * 0.75 * gridDensity;
    const colSpacing = hexWidth * 0.75 * gridDensity;

    for (let row = 0; row * rowSpacing < bbox.maxY - bbox.minY + hexHeight * 2; row++) {
        const y = bbox.minY - hexHeight + row * rowSpacing;

        const xOffset = (row % 2) * (colSpacing / 2);

        for (let col = 0; col * colSpacing < bbox.maxX - bbox.minX + hexWidth * 2; col++) {
            const x = bbox.minX - hexWidth + col * colSpacing + xOffset;

            const hexCenter = [x, y] as [number, number];
            let isInside = pointInPolygon(hexCenter, polygonPoints);

            if (!isInside) {
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const vx = x + hexSize * Math.cos(angle);
                    const vy = y + hexSize * Math.sin(angle);
                    if (pointInPolygon([vx, vy], polygonPoints)) {
                        isInside = true;
                        break;
                    }
                }
            }

            if (isInside) {
                hexagons.push({
                    x: x,
                    y: y,
                    path: generateHexagonPath(hexSize)
                });
            }
        }
    }

    return hexagons;
}