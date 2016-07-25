
export class MazeTile {

    constructor(x, y) {
        Object.defineProperties(this, {
            x: {
                value: x,
                enumerable: true
            },
            y: {
                value: y,
                enumerable: true
            }
        });
    }

    getValue(grid) {
        return grid.get(this.x, this.y);
    }

    setValue(grid, value) {
        return grid.set(this.x, this.y, value);
    }

    getNeighbors(grid) {
        var neighbors = [];

        if (this.y > 0)               neighbors.push(new MazeTile(this.x    , this.y - 1));
        if (this.x < grid.width  - 1) neighbors.push(new MazeTile(this.x + 1, this.y    ));
        if (this.y < grid.height - 1) neighbors.push(new MazeTile(this.x    , this.y + 1));
        if (this.x > 0)               neighbors.push(new MazeTile(this.x - 1, this.y    ));

        return neighbors;
    }
}

