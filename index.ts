import { Game } from './game/game';
import { Grid } from './game/grid';

const grid = new Grid(6, 7);
const game = new Game(grid, 4, 2);

game.play();
