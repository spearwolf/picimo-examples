
function clamp(val, min, max) {
    if (val > max) {
        return max;
    }
    if (val < min) {
        return min;
    }
    return val;
}

export class MazeCanvasRenderer {

    constructor(grid, colors) {
        this.grid   = grid;
        this.colors = colors;
    }

    setDistanceGrid(distances, floorValue, fromColor, toColor) {
        this.distances  = distances;
        this.floorValue = floorValue;
        this.fromColor  = fromColor;
        this.toColor    = toColor;

        this.distanceColors = [ this.buildColor(fromColor) ];
        let len = distances.maxDistance + 1;

        let color = { r: fromColor.r, g: fromColor.g, b: fromColor.b };
        let delta = { 
            r: ((toColor.r - fromColor.r) / len),
            g: ((toColor.g - fromColor.g) / len),
            b: ((toColor.b - fromColor.b) / len)
        };

        for (let i = 1; i < len; i++) {

            color.r = clamp( color.r + delta.r );
            color.g = clamp( color.g + delta.g );
            color.b = clamp( color.b + delta.b );

            this.distanceColors.push( this.buildColor(color) );
        }

        console.debug('distanceColors', this.distanceColors);
    }

    buildColor(color) {
        return `rgb(${color.r|0},${color.g|0},${color.b|0})`;
    }

    getColor(x, y) {
        let value = this.grid.get(x, y);
        let color;

        if (value === this.floorValue && this.distanceColors) {

            let distance = this.distances.getDistanceAt(x, y);

            if (typeof distance === 'undefined') {
                color = this.colors[this.floorValue];
            } else {
                color = this.distanceColors[distance];
            }

            //console.debug("distance:", distance, "cell:", cell, "color:", color);

        } else {
            color = this.colors[value];
        }

        return color;
    }

    render(ctx) {
        let grid = this.grid;
        let last = null, color, x, y;

        for (y = 0; y < grid.height; y++) {
            for (x = 0; x < grid.width; x++) {

                color = this.getColor(x, y);  //grid.get(x, y);

                if (color !== last) ctx.fillStyle = color;  //this.colors[color];
                last = color;

                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

}
