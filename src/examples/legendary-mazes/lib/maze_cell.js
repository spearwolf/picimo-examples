
import {sample} from "./rand_utils";
import {MazeTile} from "./maze_tile";


export class MazeCell {

    constructor(grid, row, col) {

        Object.defineProperties(this, {
            'grid' : { value: grid },
            'row'  : { value: row, enumerable: true },
            'col'  : { value: col, enumerable: true },
            'id'   : { value: ( row * col ) + col }
        });
    }

    randomNeighbor() {
        return sample( this.neighbors );
    }

    filterNeighbors(value) {
        let filter = typeof value === 'function' ? value : ( cell => cell.value === value );
        return this.neighbors.filter(filter);
    }

    filterLinkedNeighbors(value) {
        return this.neighbors.filter( cell => this.getInterjacentValue(cell) === value );
    }

    setInterjacentValue(neighbor, val) {
        if (neighbor instanceof MazeCell) {
            if (this.northCell === neighbor) this.northValue = val;
            else if (this.southCell === neighbor) this.southValue = val;
            else if (this.westCell === neighbor) this.westValue = val;
            else if (this.eastCell === neighbor) this.eastValue = val;
        }
    }

    getInterjacentValue(neighbor) {
        if (neighbor instanceof MazeCell) {
            if (this.northCell === neighbor) return this.northValue;
            else if (this.southCell === neighbor) return this.southValue;
            else if (this.westCell === neighbor) return this.westValue;
            else if (this.eastCell === neighbor) return this.eastValue;
        }
    }

    get tile() {
        if (!this._tile) {
            let x = ( this.col << 1 ) + 1;
            let y = ( this.row << 1 ) + 1;
            this._tile = new MazeTile(x, y);
        }
        return this._tile;
    }

    get neighbors() {
        if (!this._neighbors) {

            this._neighbors = [];

            let cell;
            if ((cell = this.northCell)) this._neighbors.push(cell);
            if ((cell = this.southCell)) this._neighbors.push(cell);
            if ((cell = this.westCell)) this._neighbors.push(cell);
            if ((cell = this.eastCell)) this._neighbors.push(cell);
        }
        return this._neighbors;
    }

    get northCell() {
        if (this.row > 0) return this.grid.cell(this.row - 1, this.col);
    }

    get southCell() {
        if (this.row < this.grid.rows - 1) return this.grid.cell(this.row + 1, this.col);
    }

    get eastCell() {
        if (this.col < this.grid.columns - 1) return this.grid.cell(this.row, this.col + 1);
    }

    get westCell() {
        if (this.col > 0) return this.grid.cell(this.row, this.col - 1);
    }

    get value() {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 ) + 1;
        return this.grid.get(x, y);
    }

    set value(val) {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 ) + 1;
        this.grid.set(x, y, val);
    }

    get northValue() {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 );
        return this.grid.get(x, y);
    }

    set northValue(val) {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 );
        this.grid.set(x, y, val);
    }

    get southValue() {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 ) + 2;
        return this.grid.get(x, y);
    }

    set southValue(val) {
        let x = ( this.col << 1 ) + 1;
        let y = ( this.row << 1 ) + 2;
        this.grid.set(x, y, val);
    }

    get westValue() {
        let x = ( this.col << 1 );
        let y = ( this.row << 1 ) + 1;
        return this.grid.get(x, y);
    }

    set westValue(val) {
        let x = ( this.col << 1 );
        let y = ( this.row << 1 ) + 1;
        this.grid.set(x, y, val);
    }

    get eastValue() {
        let x = ( this.col << 1 ) + 2;
        let y = ( this.row << 1 ) + 1;
        return this.grid.get(x, y);
    }

    set eastValue(val) {
        let x = ( this.col << 1 ) + 2;
        let y = ( this.row << 1 ) + 1;
        this.grid.set(x, y, val);
    }

}

//       01234
//     0 +-+-+
//     1 | | |
//     2 +-+-+
//     3 | | |
//     4 +-+-+
