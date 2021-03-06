/* global Uint32Array */

export class DistanceGrid {

    constructor(grid, floorValue) {
        this.grid       = grid;
        this.floorValue = floorValue;
        this.isFinished = false;
    }

    start(startCell) {

        this.startCell = startCell;

        let tile = startCell.tile;

        this.distances = new Uint32Array(this.grid.width * this.grid.height);
        this.setDistance(tile, 1);

        this.frontier = [ tile ];
        this.currentDistance = 1;

        this.isFinished = false;
    }

    isVisited(tile) {
        return this.getDistance(tile) > 0;
    }

    setDistance(tile, distance) {
        this.distances[( this.grid.width * tile.y ) + tile.x] = distance;
    }

    getDistance(tile) {
        return this.distances[( this.grid.width * tile.y ) + tile.x];
    }

    getDistanceAt(x, y) {
        return this.distances[( this.grid.width * y ) + x];
    }

    nextStep() {

        //console.debug("distance:", this.currentDistance, "frontier", this.frontier);

        var nextTiles  = [];
        var isVisited  = this.isVisited.bind(this);
        var floorValue = this.floorValue;

        this.frontier.forEach(tile => {
            let neighbors = tile.getNeighbors(this.grid).filter(neighbor => {
                return neighbor.getValue(this.grid) === floorValue && !isVisited(neighbor);
            });
            if (neighbors.length > 0) {
                nextTiles = nextTiles.concat(neighbors);
            }
        });

        if (nextTiles.length > 0) {

            ++this.currentDistance;

            nextTiles.forEach(tile => this.setDistance(tile, this.currentDistance));

            this.frontier = nextTiles;

        } else {

            this.isFinished       = true;
            this.longestPathTile  = this.frontier;
            this.frontier         = null;
            this.maxDistance      = this.currentDistance;

        }
    }

    build(startCell) {
        this.start(startCell);
        while (!this.isFinished) {
            this.nextStep();
        }
    }

}
