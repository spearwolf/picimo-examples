'use strict';

const {MazeGrid}             = require('./lib/maze_grid');
const {MazeCanvasRenderer}   = require('./lib/maze_canvas_renderer');
const {RecursiveBacktracker} = require('./lib/recursive_backtracker');
const {DistanceGrid}         = require('./lib/distance_grid');

const maze          = new MazeGrid(32, 32);
const mazeBuilder   = new RecursiveBacktracker(maze);
const mazeDistances = new DistanceGrid(maze, 2);
const mazeRenderer  = new MazeCanvasRenderer(maze, ["#111", "#765", "#aaa", "#f30", "#ff3", "#3f3", "#3ff", "#03f"]);

console.groupCollapsed('maze generation');

    mazeBuilder.build();
    mazeDistances.build(maze.centralCell);
    mazeRenderer.setDistanceGrid(mazeDistances, 2, {r:256, g:0, b:32}, {r:230, g:240, b:255});

    window.maze          = maze;
    window.mazeBuilder   = mazeBuilder;
    window.mazeDistances = mazeDistances;
    window.mazeRenderer  = mazeRenderer;

    console.log('distances', mazeDistances);
    console.log('renderer', mazeRenderer);

console.groupEnd();

const Picimo = window.Picimo = require('picimo');

var app = window.app = new Picimo.App({
    alpha     : true,
    showStats : false
});

app.scene.setSize(800, 600, "contain");

console.log('maze width=', maze.width, 'height=', maze.height);

app.scene.appendCanvas([maze.width, maze.height]).on('init', function () {
    mazeRenderer.render(this.ctx);
    window.canvas = this;
});

